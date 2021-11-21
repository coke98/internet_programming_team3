// 사이드바 on, off
function menu_wrap_on() {
    var menu_wrap = document.getElementById("menu_wrap");
    menu_wrap.style.display = "block";
}
function menu_wrap_off() {
    var menu_wrap = document.getElementById("menu_wrap");
    menu_wrap.style.display = "none";
}

// 지도 확대, 축소
function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}
function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}

// 현재 위치 불러오기
function current_location() {
    // 기존 현재위치 마커 지우기
    if (current_location_marker != null) {
        map.removeOverlayMapObject(current_location_marker);
    }
    // 현재 위치 불러오기
    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var latlng = new kakao.maps.LatLng(lat, lng);
        var marker = new kakao.maps.Marker({
            position: latlng,
        });
        marker.setMap(map);
        current_location_marker = marker;
        map.setCenter(latlng);
    });
}

// 사이렌 소리 toggle
function siren() {
    var siren = document.getElementById("siren");
    if (siren.paused) {
        siren.currentTime = 0;
        siren.play();
    } else {
        siren.pause();
    }
}