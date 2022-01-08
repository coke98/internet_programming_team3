# 비동기 호출 관련 문제

소방서의 정보의 경우 좌표가 아닌 주소를 반환하기에 Geocoder를 사용해야 했다.

&#x20;

이때 Geocoder를 사용하는 과정에서 비동기호출과 관련된 문제가 발생하였다.

&#x20;

<mark style="background-color:blue;">Geocoder를 소방서마다 호출하여 좌표를 반환받은 후 마커가 생성되고 함수가 끝이 나야 했으나, Geocoder에서 값이 반환되는 와중에 이미 함수가 종료되어버리는 문제가 발생한 것이다.</mark>

&#x20;

결과적으로 일부의 소방서 정보만 지도에 표시되었으며 이를 해결할 방법이 필요했다.

&#x20;

우리 프로젝트에서 선택한 방법은 promise 객체로 geocoder를 호출하고 async-await를 사용하는 것이었다.

```
// promise 객체로 geocoder.addressSearch 함수를 호출
                const addressSearch = address => {
                    return new Promise((resolve, reject) => {
                            geocoder.addressSearch(address, function(result, status) {
                                if (status === kakao.maps.services.Status.OK) {
                                    resolve({"lat": result[0].y, "lng": result[0].x});
                                } else {
                                    reject(status);
                                }
                            });
                    });
                };
                
                // async-await
                (async () => {
                        var markers = [];
                        for(const address of list) {
                            if(address == ""||address == null) continue;
                            const result = await addressSearch(address); // 비동기 함수를 동기 함수처럼 사용하기 위해 await 사용
                            var coordinate = new kakao.maps.LatLng(result.lat, result.lng);
                            var marker = new kakao.maps.Marker({
								map: map,
								position: coordinate,
                                image: FireImage,
                                clickable: true,
							});
                            // 마커에 클릭 이벤트 등록
                            //길찾기 모드에서만 클릭되도록
                            if(mode == 1)
                                kakao.maps.event.addListener(marker, 'click', mouseClickListener(check, i, coordinate, marker));

							// 마커 추가
							markers.push(marker);
							
                        }
                        fireStation_markers = markers;
                        clusterer.addMarkers(markers);
                        vanish_loading();
                })();
                
			});
```

이렇게 작성할 경우 async-await에 의해 비동기 함수인 geocoder가 promise 객체에서 정의된 값을 모두 반환받고 나서야 다음 코드로 넘어갈 수 있게 된다.

&#x20;

즉 비동기 함수를 동기 함수와 비슷하게 사용한다는 것이다.

&#x20;

이후 정상적으로 모든 소방서 마커가 생성되었고, Geocoder가 필요한 다른 API에서도 같은 방법을 사용하게 되었다.

&#x20;

이 문제를 해결하며 비동기호출에 대해 많은 정보를 새롭게 배울 수 있었다.
