
var serviceKey_CCTV = "Jo1AQOE7RUfRc1B3Fht8golmSCwwMUfudzPV9355fMjSZwkGh0N3AL2IFLM7ER73nlcOID4V%2FxJK3mOmCDv5YA%3D%3D";
var insttNm_CCTV1 = "부산광역시%20재난현장관리과"
var insttNm_CCTV2 = "부산광역시%20남구청"
// 남구청만 일단 추가했습니다.
// insttNm_CCTV3 = "부산광역시%20금정구청" 같이 새로 변수 만들어서 fetch하면 그 구역 CCTV도 나옵니다.

function getCCTV() {
    fetch("http://api.data.go.kr/openapi/tn_pubr_public_cctv_api?serviceKey=" + serviceKey_CCTV + "&numOfRows=100&type=json&institutionNm=" + insttNm_CCTV1)
        .then((res) => res.json())
        .then((resJson) => {
            var markers = [];
            var items = resJson.response.body.items;
            for (var i = 0; i < items.length; i++) {
                var marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(items[i].latitude, items[i].longitude),
                    map: map,
                });
                markers.push(marker);
            }
            clusterer.addMarkers(markers);
        })

    fetch("http://api.data.go.kr/openapi/tn_pubr_public_cctv_api?serviceKey=" + serviceKey_CCTV + "&numOfRows=100&type=json&institutionNm=" + insttNm_CCTV2)
        .then((res) => res.json())
        .then((resJson) => {
            var markers = [];
            var items = resJson.response.body.items;
            for (var i = 0; i < items.length; i++) {
                var marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(items[i].latitude, items[i].longitude),
                    map: map,
                });
                markers.push(marker);
            }
            clusterer.addMarkers(markers);
        })
}


// 마커 정보창 끄고 닫기 함수
function mouseOverListener(map, marker, infoWindow) {
    return function () {
        infoWindow.open(map, marker);
    };
}
function mouseOutListener(infoWindow) {
    return function () {
        infoWindow.close();
    };
}
