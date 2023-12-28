import React, { useState, useEffect } from "react";
import { FaStar, FaThumbsUp } from "react-icons/fa";
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
  const [averageRating, setAverageRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCounts, setLikeCounts] = useState(new Array(999).fill(0));
  const [likedItems, setLikedItems] = useState(new Array(999).fill(false));
  const [filter, setFilter] = useState("latest");

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

  useEffect(() => {
    // Logging exhibitionData for debugging
    //console.log('exhibitionData:', exhibitionData);

    // Calculate average rating
    if (exhibitionData && exhibitionData.length > 0) {
      const sumOfRatings = exhibitionData.reduce((acc, record) => {
        console.log("Current Record:", record); // Log the current record for debugging
        return acc + parseInt(record.ONE_STARS, 10);
      }, 0);

      const average = sumOfRatings / exhibitionData.length;
      setAverageRating(average);
    } else {
      setAverageRating(0);
    }
  }, [exhibitionData]);

  const Star = ({ selected = false, onSelect = (f) => f }) => (
    <FaStar color={selected ? "#872323" : "gray"} onClick={onSelect} />
  );

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const toggleLike = (index) => {
    const newLikedItems = [...likedItems];
    newLikedItems[index] = !newLikedItems[index];

    const newLikeCounts = [...likeCounts];
    newLikeCounts[index] += newLikedItems[index] ? 1 : -1;

    setLikedItems(newLikedItems);
    setLikeCounts(newLikeCounts);
  };

  if (!exhibitionData) {
    return <div>Loading...</div>;
  }

  const handleSelectFilter = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const getFilteredData = () => {
    let filteredData = [...exhibitionData];

    switch (filter) {
      case "highRating":
        filteredData = filteredData.sort((a, b) => b.ONE_STARS - a.ONE_STARS);
        break;
      case "lowRating":
        filteredData = filteredData.sort((a, b) => a.ONE_STARS - b.ONE_STARS);
        break;
      // 기본은 최신 순으로 정렬
      default:
        filteredData = filteredData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        break;
    }

    return filteredData;
  };

  const handleSubmitComment = () => {
    const userString = localStorage.getItem("user");
    const userObject = JSON.parse(userString);
    if (!userObject || !userObject.username) {
      window.confirm("로그인 하세요!");
      return;
    }
    const data = {
      user: userObject.username,
      comment: comment,
      star: stars,
      exhibitionId: id,
      date: date,
    };
    console.log(data);
    submit(data)
      .then((response) => {
        if (response.data.message === "이미 평가를 제출했습니다.") {
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
    <div>
      <div>
        <p className="rate_name">{exhibitionData[0].ART_NAME}</p>
      </div>
      <div className="rate_contents">
        <div className="rate_imgArea">
          <img
            src={exhibitionData[0].ART_PICTURE}
            className="rate_product_img"
            alt="전시 이미지"
          />
        </div>

        <div className="rate_other_content">
          <div className="rate_stars_and_date">
            <div className="rate_stars">
              {createArray(totalStars).map((n, i) => (
                <Star
                  key={i}
                  selected={stars > i}
                  onSelect={() => setStars(i + 1)}
                />
              ))}
            </div>
            <div>
              <p className="average_rate">
                {isNaN(averageRating) ? "0.0" : averageRating.toFixed(1)}
              </p>
            </div>
            <div className="rate_date_input">
              <input
                type="text"
                className="input_rate_date"
                style={{ width: "150px" }}
                placeholder="YYYY-MM-DD"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div
              className={`rate_recommend ${isLiked ? "liked" : ""}`}
              onClick={handleLikeClick}
            >
              <FaThumbsUp
                className={`thumbs-up-icon ${isLiked ? "liked" : ""}`}
              />
            </div>
          </div>
          <div className="rate_section_title">
            <p className="rate_middle_title">평가하기</p>
            <p className="rate_middle_people">
              평점(
              {isNaN(averageRating)
                ? exhibitionData.length - 1
                : exhibitionData.length}
              명)
            </p>
            <p className="rate_middle_date">날짜를 입력하세요</p>
            <p className="rate_middle_recomd">추천하기</p>
          </div>
          <hr />
          <div>전시 작품/이미지</div>
          <p className="rate_title2">코멘트</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="comment_input"
          />
          <button
            type="submit"
            onClick={handleSubmitComment}
            className="comment_button"
          >
            완료
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

      <hr />

      <div>
        <div className="other_container">
          <p className="other_title">
            코멘트{" "}
            <span className="ot_highlight">
              {isNaN(averageRating)
                ? exhibitionData.length - 1
                : exhibitionData.length}
              개
            </span>
          </p>
          <select
            id="filter"
            value={filter}
            onChange={(e) => handleSelectFilter(e.target.value)}
            className="rate_filter"
          >
            <option value="latest">최신 순</option>
            <option value="highRating">별점 높은 순</option>
            <option value="lowRating">별점 낮은 순</option>
          </select>
        </div>
        <div className="comment-list">
          {getFilteredData().map((data, index) => (
            <div key={index} className="comment-item">
              <div className="comment-container">
                <div className="user-rating">
                  <p className="rate_title_user">{data.ONE_USER}</p>
                  <p className="rate_title_star">
                    <FaStar className="rts_star" color={"#872323"} />
                    {data.ONE_STARS}
                  </p>
                </div>
                <hr />
                <p className="rate_body_comment">{data.ONE_COMMENT}</p>
                <hr />
                <div className="rate_foot">
                  <FaThumbsUp className="foot_good_icon" />
                  <p className="good_count">{likeCounts[index]}</p>
                  <p
                    className={`foot_good ${likedItems[index] ? "liked" : ""}`}
                    onClick={() => toggleLike(index)}
                  >
                    좋아요
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rating;
