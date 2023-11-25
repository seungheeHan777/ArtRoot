import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { ratingDel } from "../../lib/api/exhibition";
import { allRating } from "../../lib/api/exhibition";
import "../home.css";

const createArray = (length) => [...Array(length)];

const AdminRatingList = ({ totalStars = 5 }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  //한줄평 삭제
  const handleDelete = async (ONE_USER, ONE_ARTNUM) => {
    if (window.confirm("정말로 이 한줄평을 삭제하시겠습니까?")) {
      try {
        const response = await ratingDel(ONE_USER, ONE_ARTNUM);
        console.log(ONE_USER, ONE_ARTNUM);
        console.log("한줄평 삭제 성공:", response.data);
      } catch (error) {
        console.error("한줄평 삭제 중 에러 발생:", error);
      }
    }
  };

  //페이지 변경
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // 현재 페이지에 표시할 항목 범위 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const Star = ({ selected = false }) => (
    <FaStar color={selected ? "yellow" : "gray"} />
  );

  const renderStars = (stars) => {
    return createArray(totalStars).map((n, i) => (
      <Star key={i} selected={i < stars} />
    ));
  };

  return (
    <div className="home-container" style={{ paddingTop: "200px" }}>
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
          {currentItems.map((item, index) => (
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
              <td>
                <Button
                  onClick={() => handleDelete(item.ONE_USER, item.ONE_ARTNUM)}
                  href="/AdminRatingList"
                >
                  삭제
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "20px" }}>
        {createArray(Math.ceil(data.length / itemsPerPage)).map((_, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{ margin: "5px" }}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AdminRatingList;
