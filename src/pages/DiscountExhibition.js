import React, { useState, useEffect } from "react";
import axios from "axios";
import ExhibitionItem from "../ExhibitionItem";
import "./home.css";
const DiscountExhibition = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/ex/DiscountExhibitions"); // 데이터베이스에서 전시회 정보를 가져오는 엔드포인트로 변경해야 합니다.

        setData(response.data);
        console.log("sk:", response.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="home-container">
      <h1>할인 전시회 목록</h1>
      {data.length > 0 ? (
        <div>
          <ul>
            {data.map((exhibition, index) => (
              <li key={index}>
                <ExhibitionItem
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

export default DiscountExhibition;
