import React, { useState, useEffect } from "react";
import { allRating } from "../lib/api/exhibition";
import { FaStar } from "react-icons/fa";
import "./home.css";

const createArray = (length) => [...Array(length)];

const RatingList = ({ totalStars = 5 }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allRating();
        // Sort the data based on ONE_DATE in descending order (most recent first)
        const sortedData = response.data.sort(
          (a, b) => new Date(b.ONE_DATE) - new Date(a.ONE_DATE)
        );
        setData(sortedData);
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

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
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
    <div style={{ paddingTop: "200px", minHeight: "100vh" }}>
      <section className="eveProgBlock pt-5 pb-5 pt-md-9 pb-md-10 pt-lg-13 pb-lg-14 pt-xl-21 pb-xl-22">
        <div className="container">
          <header className="topHeadingHead text-center mb-7 mb-md-10">
            <div className="row">
              <div className="col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
                <h1 className="h1Large mb-4">Rating</h1>
                <div className="fontSerif eabDescrText eabDescrTextII">
                  <p>다양한 사람들의 평점을 구경해보세요.</p>
                </div>
              </div>
            </div>
          </header>
          <div className="row makeItMasonery mx-xl-n4">
            {data.slice(startIndex, endIndex).map((item, index) => (
              <div
                key={index}
                className="col-12 col-md-6 col-lg-4 px-xl-4 mimItem"
              >
                <article className="newsColumn text-gray777 mb-8 mb-lg-14 mb-xl-18 mx-auto">
                  <div
                    className="imgHolder"
                    style={{ paddingBottom: "40px", paddingTop: "60px" }}
                  >
                    <a href={`exhibitiondetail/${item.ONE_ARTNUM}`}>
                      <img
                        src={item.ONE_PICTURE}
                        className="img-fluid"
                        alt="전시 그림"
                        width={365}
                        height={280}
                      />
                    </a>
                  </div>
                  <div className="descrWrap bg-white position-relative mt-n16 pt-7 pr-3 pr-md-6">
                    <time
                      dateTime={item.ONE_DATE}
                      className="ncTimeStamp d-block text-gray777 mb-4"
                    >
                      작성일 : {item.ONE_DATE}
                    </time>
                    <h2 className="mb-5">
                      <p>{item.ONE_COMMENT}</p>
                    </h2>
                    <p className="mb-8">작성자 : {item.ONE_USER}</p>
                    <div className="mb-6">
                      {renderStars(item.ONE_STARS)} {item.ONE_STARS}점
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {renderPaginationButtons()}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RatingList;
