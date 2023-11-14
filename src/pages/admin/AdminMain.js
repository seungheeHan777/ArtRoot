import React from "react";
import { Button } from "react-bootstrap";

const AdminMain = () => {
  return (
    <div>
      <h1>관리자 메인 페이지</h1>
      <Button href="/AdminPage">유저 관리</Button>
      <Button href="/AdminExhibitionList">전시회 관리</Button>
      <Button href="/AdminRatingList">한줄평 관리</Button>
      <Button href="/AdminRecommend">전시회 추천 관리</Button>
    </div>
  );
};

export default AdminMain;
