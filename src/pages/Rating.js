import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { rating, submit } from "../lib/api/exhibition";
import { useParams, useNavigate } from "react-router-dom";
import "./Rating.css";

const createArray = (length) => [...Array(length)];

const Rating = ({ totalStars = 5 }) => {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const navigate = useNavigate();

  const [exhibitionData, setExhibitionData] = useState(null);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await rating(id);
        setExhibitionData(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [id]);

  const Star = ({ selected = false, onSelect = (f) => f }) => (
    <FaStar color={selected ? "gold" : "gray"} onClick={onSelect} />
  );

  if (!exhibitionData) {
    return <div>Loading...</div>;
  }

  const handleSubmitComment = () => {
    const userString = localStorage.getItem("user");
    const userObject = JSON.parse(userString);
    const data = {
      user: userObject.username,
      comment: comment,
      star: stars,
      exhibitionId: id,
      date: date,
    };
    submit(data)
      .then((response) => {
        if (response.data.message === "완료") {
          // 이미 평가를 제출한 경우
          window.confirm("이미 평가한 전시입니다.");
        } else {
          // 평가가 성공적으로 제출된 경우
          setShowModal(true); // 모달 표시
          setComment("");
          setDate("");
          setStars(0); // 별점 초기화
          setTimeout(() => {
            setShowModal(false); // 2초 후 모달을 닫습니다.
            navigate("/"); // 홈으로 이동
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("평가 제출 중 오류 발생:", error);
      });
  };
  return (
    <div className="rate_contents" style={{ paddingTop: "200px" }}>
      <div className="rate_imgArea">
        <img
          src={exhibitionData.ART_PICTURE}
          className="rate_product_img"
          alt="전시 이미지"
        />
      </div>
      <div className="rate_other_content">
        <p className="rate_title1">관람평</p>
        <div className="rate_stars">
          <p>평점</p>
          {createArray(totalStars).map((n, i) => (
            <Star
              key={i}
              selected={stars > i}
              onSelect={() => setStars(i + 1)}
            />
          ))}
        </div>
        <div className="rate_date_input">
          <p>날짜</p>
          <input
            type="text"
            style={{ width: "150px" }}
            placeholder="YYYY-MM-DD"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <hr style={{ border: "1px solid", width: "100%" }} />
        <p className="rate_title2">코멘트</p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleSubmitComment}
          className="comment_button"
        >
          제출
        </button>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <p>평가가 성공적으로 제출되었습니다.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rating;
