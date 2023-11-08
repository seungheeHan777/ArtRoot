import React, { useState, useEffect } from "react";
import { allRating } from "../lib/api/exhibition";
import { FaStar } from "react-icons/fa";
import "./home.css";

const createArray = (length) => [...Array(length)];

const RatingList = ({ totalStars = 5 }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allRating(); // 데이터베이스에서 전시회 정보를 가져오는 엔드포인트로 변경해야 합니다.
        setData(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  const Star = ({ selected = false }) => (
    <FaStar color={selected ? "yellow" : "gray"} />
  );

  const renderStars = (stars) => {
    return createArray(totalStars).map((n, i) => (
      <Star key={i} selected={i < stars} />
    ));
  };

  return (
    <div className="home-container">
      <h1>평점 테이블</h1>
      <table border="1">
        <thead>
          <tr>
            <th>전시 그림</th>
            <th>한줄평</th>
            <th>사용자</th>
            <th>별점</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <img
                  src={item.ONE_PICTURE}
                  alt="전시 그림"
                  width={150}
                  height={150}
                />
              </td>
              <td>{item.ONE_COMMENT}</td>
              <td>{item.ONE_USER}</td>
              <td>
                {renderStars(item.ONE_STARS)}
                {item.ONE_STARS}점
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RatingList;
