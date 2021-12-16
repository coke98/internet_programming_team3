
// 경로 및 장소 검색과 관련된 스크립트를 작성하였습니다.

// 검색된 장소들의 마커를 저장
var markers = [];

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch( keyword, placesSearchCB); 
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    // 검색결과를 호출
    for ( var i=0; i<places.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i), 
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 페이지에서 좌표를 표시할 Element를 가져옵니다.
        var placenm = document.getElementById("placenm");
        var coordinateX = document.getElementById("coordinateX");
        var coordinateY = document.getElementById("coordinateY");



        // 검색결과 항목에 mouseover 했을때
        // 해당 장소의 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, title) {
            itemEl.onmouseover =  function () {
                displayInfowindow(marker, title);
                var coord = marker.getPosition();
                var coordX = coord.getLng();
                var coordY = coord.getLat();
                placenm.innerText = title;
                console.log(title);
                coordinateX.innerText = coordX;
                coordinateY.innerText = coordY;
            };

            itemEl.onmouseout =  function () {
                infowindow.close();
                placenm.innerText = '장소 명'
            };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
    //
}
    

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
                 
      itemStr += '  <span class="tel">' + places.phone  + '</span>'
                + "<button type='button' class='searchbutton' onclick='coordtostr()'>출발지로</button>"
                + "<button type='button' class='searchbutton' onclick='coordtodst()'>도착지로</button>"
                + '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}

// 출발지를 버튼으로 입력받습니다.
function coordtostr() {
    var startnm = document.getElementById('placenm')
    var startX = document.getElementById('coordinateX')
    var startY = document.getElementById('coordinateY')
    strnm.innerText = "출발지 : " + startnm.innerText
    strX.innerText = startX.innerText
    strY.innerText = startY.innerText
    console.log(startnm)
    console.log(startX)
    console.log(startY)
};

// 도착지를 버튼으로 입력받습니다.
function coordtodst() {
    var endnm = document.getElementById('placenm')
    var endX = document.getElementById('coordinateX')
    var endY = document.getElementById('coordinateY')
    dstnm.innerText = "도착지 : " + endnm.innerText
    dstX.innerText = endX.innerText
    dstY.innerText = endY.innerText
    console.log(endnm)
    console.log(endX)
    console.log(endY)
};

//현재 위치를 경로의 출발지 혹은 도착지로 설정합니다.
function current_locationToPath(flag) {
    //현재 위치 표시와 동시에 좌표 받아오기 
    var latlng = current_location();
    
    //flag == true면 출발지로 설정
    if(flag){
        strnm.innerText = "출발지 : 현재 위치";
        strX.innerText = latlng.La;
        strY.innerText = latlng.Ma;
    }
    else {
        dstnm.innerText = "도착지 : 현재 위치";
        dstX.innerText = latlng.La;
        dstY.innerText = latlng.Ma;
    }
}

// 길찾기 시작
function letpede() {
    //키워드 검색으로 찾은 마커 지우기
    removeMarker();

    start = new kakao.maps.LatLng(strY.innerText, strX.innerText)
    end = new kakao.maps.LatLng(dstY.innerText, dstX.innerText);
    map = map;
    pedestrian_route(start, end, map);
};
