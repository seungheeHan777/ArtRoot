import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { ratingDel } from "../../lib/api/exhibition";
import { allRating } from "../../lib/api/exhibition";
import "./AdminExhibitionList.css";
import "../home.css";

const createArray = (length) => [...Array(length)];

const AdminRatingList = ({ totalStars = 5 }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allRating();
        setData(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const Star = ({ selected = false }) => (
    <FaStar color={selected ? "#872323" : "gray"} />
  );

  const renderStars = (stars) => {
    return createArray(totalStars).map((n, i) => (
      <Star key={i} selected={i < stars} />
    ));
  };

  return (
    <div className="home-container">
      <h1
        style={{
          fontSize: "25px",
          color: "#872323",
          fontWeight: "bold",
        }}
      >
        평점 테이블
      </h1>
      <hr className="customhr" />
      <table className="custom-table">
        <thead style={{ fontSize: "25px" }}>
          <tr>
            <th>전시 그림</th>
            <th>한줄평</th>
            <th>사용자</th>
            <th>별점</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>
                <img
                  src={item.ONE_PICTURE}
                  alt="전시 그림"
                  width={200}
                  height={200}
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
                  variant="danger"
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
            style={{
              margin: "5px",
              backgroundColor: "#DB908A",
              color: "white",
            }}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AdminRatingList;
