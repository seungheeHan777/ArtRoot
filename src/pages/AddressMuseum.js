import React, { useEffect, useState } from "react";

const AddressMuseum = ({ address }) => {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const loadNaverMapScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_NCP_CLIENT_ID&submodules=geocoder";
      script.async = true;

      script.onload = () => {
        // 스크립트 로딩이 완료되면 함수 호출
        convertAddressToCoord(address);
      };

      script.onerror = () => {
        console.error("네이버 지도 API 스크립트 로딩 중 오류가 발생했습니다.");
      };

      document.head.appendChild(script);
    };

    loadNaverMapScript(); // 스크립트 로딩 함수 호출
  }, [address]);

  const convertAddressToCoord = (address) => {
    const navermaps = window.naver && window.naver.maps;

    if (navermaps && navermaps.Service) {
      navermaps.Service.geocode(
        {
          address,
        },
        (status, response) => {
          if (status === navermaps.Service.Status.ERROR) {
            return alert("주소를 변환할 수 없습니다.");
          }

          const { result } = response;
          const { items } = result;

          if (items.length > 0) {
            const firstItem = items[0];
            const { point } = firstItem;

            // 변환된 좌표 정보
            const { x, y } = point;
            // 좌표를 state에 저장
            setCoordinates({ x, y });
          } else {
            alert("주소를 찾을 수 없습니다.");
          }
        }
      );
    } else {
      console.error("네이버 지도 API가 로드되지 않았거나 사용할 수 없습니다.");
    }
  };

  return (
    <div>
      {/* 변환된 좌표를 출력하는 부분 */}
      {coordinates && (
        <div>
          <p>
            변환된 좌표: {coordinates.y}, {coordinates.x}
          </p>
          {/* 여기에 필요한 다양한 정보를 추가로 출력할 수 있습니다. */}
        </div>
      )}

      {/* 나머지 컴포넌트 코드 */}
    </div>
  );
};

export default AddressMuseum;
