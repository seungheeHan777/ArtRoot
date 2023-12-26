import React, { useState, useEffect } from "react";
import { allRating } from "../lib/api/exhibition";
import { FaStar } from "react-icons/fa";
import "./hhome.css";
import "./RatingList.css";

const createArray = (length) => [...Array(length)];

const RatingList = ({ totalStars = 5 }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allRating();
        let sortedData = [];

        if (sortBy === "starsHigh") {
          sortedData = response.data.sort((a, b) => b.ONE_STARS - a.ONE_STARS);
        } else if (sortBy === "starsLow") {
          sortedData = response.data.sort((a, b) => a.ONE_STARS - b.ONE_STARS);
        } else {
          // Default sorting by date
          sortedData = response.data.sort(
            (a, b) => new Date(b.ONE_DATE) - new Date(a.ONE_DATE)
          );
        }

        setData(sortedData);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [sortBy]);

  const Star = ({ selected = false }) => (
    <FaStar color={selected ? "#872323" : "gray"} />
  );

  const renderStars = (stars) => {
    return createArray(totalStars).map((n, i) => (
      <Star key={i} selected={i < stars} />
    ));
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return createArray(totalPages).map((_, index) => (
      <button
        key={index}
        onClick={() => handleClick(index + 1)}
        style={{ margin: "0 5px" }}
      >
        {index + 1}
      </button>
    ));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  return (
    <div>
      <div className="container">
        <header className="topHeadingHead text-center mb-7 mb-md-10">
          <div className="row">
            <div className="col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
              <div className="fontSerif eabDescrText eabDescrTextII">
                <p>다양한 사람들의 평점을 구경해보세요.</p>
              </div>
            </div>
          </div>
        </header>

        <div>
          <label className="rate_list_sort">
            정렬
            <select
              onChange={(e) => handleSortChange(e.target.value)}
              className="rate_sort"
            >
              <option value="date">최신 순</option>
              <option value="starsHigh">별점 높은 순</option>
              <option value="starsLow">별점 낮은 순</option>
            </select>
          </label>
        </div>

        <div className="rating_list">
          {data.slice(startIndex, endIndex).map((item, index) => (
            <div key={index}>
              <article className="rating_list_box">
                <div className="imgHolder">
                  <a href={`exhibitiondetail/${item.ONE_ARTNUM}`}>
                    <img
                      src={item.ONE_PICTURE}
                      className="img-fluid"
                      alt="전시 그림"
                    />
                  </a>
                </div>
                <div>
                  <time dateTime={item.ONE_DATE} className="rate_user_date">
                    <span>{item.ONE_USER}</span>
                    <span>{item.ONE_DATE}</span>
                  </time>
                  <hr className="rate_line" />
                  <p className="rate_comment">{item.ONE_COMMENT}</p>
                  <div className="rate_star">{renderStars(item.ONE_STARS)}</div>
                </div>
              </article>
            </div>
          ))}
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >
          {renderPaginationButtons()}
        </div>
      </div>
    </div>
  );
};

export default RatingList;
