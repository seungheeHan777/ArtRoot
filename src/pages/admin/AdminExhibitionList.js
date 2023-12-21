import React, { useEffect, useState } from "react";
import { exhibitionInfo, exhibitionDel } from "../../lib/api/admin";
import AdminExhibitionItem from "./AdminExhibitionItem";
import { Link } from "react-router-dom";
import "./AdminExhibitionList.css";
const AdminExhibitionList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await exhibitionInfo();
        setData(response.data);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="exhibition-list">
      <div className="header">
        <p>전시 리스트</p>
        <Link to="/ExhibitionAdd" className="customButton">
          전시회 등록
        </Link>
      </div>

      <hr className="customhr" />

      {data.length > 0 ? (
        <AdminExhibitionItem data={data} />
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default AdminExhibitionList;
