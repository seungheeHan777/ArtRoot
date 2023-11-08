import React, { useEffect, useState } from "react";
import { exhibitionInfo, exhibitionDel } from "../../lib/api/admin";
import AdminExhibitionItem from "./AdminExhibitionItem";
import { Button } from "react-bootstrap";
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
    <div>
      <h1>전시회 목록</h1>
      <Button href="/ExhibitionAdd">전시회 추가</Button>
      {data.length > 0 ? (
        <div>
          <ul>
            {data.map((exhibition, index) => (
              <li key={index}>
                <AdminExhibitionItem
                  ART_NUM={exhibition.ART_NUM}
                  ART_NAME={exhibition.ART_NAME}
                  ART_PICTURE={exhibition.ART_PICTURE}
                  ART_EXPLAIN={exhibition.ART_EXPLAIN}
                  ART_START={exhibition.ART_START}
                  ART_END={exhibition.ART_END}
                  ART_TIME={exhibition.ART_TIME}
                  ART_CLOSED={exhibition.ART_CLOSED}
                  ART_PLACE={exhibition.ART_PLACE}
                  ART_ADDR={exhibition.ART_ADDR}
                  ART_PRICE={exhibition.ART_PRICE}
                  ART_CALL={exhibition.ART_CALL}
                  ART_SITE={exhibition.ART_SITE}
                  ART_ARTIST={exhibition.ART_ARTIST}
                  ART_PREFER={exhibition.ART_PREFER}
                  ART_BACK={exhibition.ART_BACK}
                />
                <Button>삭제</Button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default AdminExhibitionList;
