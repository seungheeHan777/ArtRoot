import React, { useEffect } from "react";
import NaverMap from "./NaverMap"; // NaverMap 컴포넌트 import

const Museum = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>미술관</h1>
      <hr />
      <h1>미술관</h1>
      <hr />
      <h1>미술관</h1>
      <hr />
      <h1>미술관</h1>
      <hr />
      <h1>미술관</h1>
      <hr />
      {/* 나머지 내용은 그대로 유지 */}
      이름 : 국립중앙박물관
      <br />
      위치 : 서울 용산구 서빙고로 137 국립중앙박물관
      <br />
      위도는 37.52385131569311, 경도는 126.9801945332582
      <hr />
      {/* NaverMap 컴포넌트 사용 */}
      <NaverMap />
      dfsdfsdfdsf
    </div>
  );
};

export default Museum;
