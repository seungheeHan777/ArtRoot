import React, { useEffect } from "react";

const NaverMap = () => {
  useEffect(() => {
    // 네이버 지도 초기화 함수
    const initMap = () => {
      const map = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(
          37.52385131569311,
          126.9801945332582
        ), // 국립중앙박물관 좌표
        zoom: 16, // 줌 레벨 조절
      });

      // 마커 추가
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          37.52385131569311,
          126.9801945332582
        ),
        map: map,
      });
    };

    // 네이버 지도 스크립트 동적으로 로드
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=zsib49ckhl";
    script.async = true;
    script.onload = initMap;

    document.head.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.head.removeChild(script);
    };
  }, []); // useEffect의 의존성 배열을 빈 배열로 설정하여 한 번만 실행되도록 함

  return (
    <div style={{ textAlign: "center" }}>
      {/* 네이버 지도를 표시할 영역 */}
      <div
        id="map"
        style={{ width: "70%", height: "300px", display: "inline-block" }}
      ></div>
    </div>
  );
};

export default NaverMap;
