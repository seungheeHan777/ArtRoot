import React, { useState, useEffect } from "react";
import { random } from "../lib/api/exhibition";
import ExhibitionItem from "../ExhibitionItem";
import { useSelector } from "react-redux";
import { userRec } from "../lib/api/rec";
import "./home.css";
const RecommendedExhibition = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  // const serviceKey = "636f716649676b733637714f775a68"; // 서비스 키

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버의 새로운 API로 변경
        console.log(user.username);
        const response = await userRec(user.username);
        setData(response.data.result);
      } catch (e) {
        console.error(e);
      }
    };

    // user.username을 useEffect 내부로 이동
    if (user.username) {
      fetchData();
    }
  }, [user.user_id, user.username]); // user.username을 의존성 배열에 추가
  console.log("데이터:", data);
  return (
    <div className="home-container" style={{ paddingTop: "200px" }}>
      <h1>{user.username} 님의 추천 전시회 목록</h1>
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

export default RecommendedExhibition;
