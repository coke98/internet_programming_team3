// sessionStorage에 경로 정보 저장 (출발지, 도착지, 경유지)
function save_path() {
    sessionStorage.setItem("start", start); // 출발지
    sessionStorage.setItem("end", end); // 도착지
    sessionStorage.setItem("passList", passListString); // 경유지
    sessionStorage.setItem("strnm", strnm.innerText); // 출발지 이름
    sessionStorage.setItem("dstnm", dstnm.innerText); // 도착지 이름
    // 저장된 경로 정보 표시
    var startname = document.getElementById('Session_str');
        startname.innerText = sessionStorage.getItem("strnm");
        console.log(sessionStorage.getItem("strnm"))
    var endname = document.getElementById('Session_dst');
        endname.innerText = sessionStorage.getItem("dstnm");
        console.log(sessionStorage.getItem("dstnm"))
    alert('경로가 저장되었습니다.');
};

// sessionStorage에서 경로 정보 불러오기
function get_path() {
    // string 형식으로 저장된 data를 각 변수에 맞게 변환하여 불러오기
    start_lat = sessionStorage.getItem("start").split(",")[0].split("(")[1];
    start_lng = sessionStorage.getItem("start").split(", ")[1].split(")")[0];
    end_lat = sessionStorage.getItem("end").split(",")[0].split("(")[1];
    end_lng = sessionStorage.getItem("end").split(", ")[1].split(")")[0];
    start = new kakao.maps.LatLng(start_lat, start_lng);
    end = new kakao.maps.LatLng(end_lat, end_lng);
    strnm.innerText = sessionStorage.getItem("strnm");
    dstnm.innerText = sessionStorage.getItem("dstnm");
    passListString = sessionStorage.getItem("passList");
    if(passListString != '') {
        passList = passListString.split(",");
    }
    alert('경로를 불러옵니다.');

    // 불러온 경로 정보를 지도에 표시
    pedestrian_route(start, end, map);
};
