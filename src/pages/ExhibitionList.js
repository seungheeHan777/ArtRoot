import React, { useState, useEffect } from "react";
import { allList } from "../lib/api/exhibition.js";
import ExhibitionItem from "../ExhibitionItem";
import "./home.css";
import "../muzze/css/responsive.css";
import "../muzze/css/vendor/bootstrap/_bootstrap-grid.css";

const ExhibitionList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [exhibitionsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allList();
        setData(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  // Get current exhibitions
  const indexOfLastExhibition = currentPage * exhibitionsPerPage;
  const indexOfFirstExhibition = indexOfLastExhibition - exhibitionsPerPage;
  const currentExhibitions = data.slice(
    indexOfFirstExhibition,
    indexOfLastExhibition
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section
      className="exhibitionBlock pt-6 pb-6 pt-md-9 pb-md-9 pt-lg-11 pb-lg-13 pt-xl-20 pb-xl-21"
      style={{ width: "100%" }}
    >
      <div className="home-container">
        <header className="topHeadingHead text-center mb-6 mb-lg-9 mb-xl-12">
          <div className="row">
            <div className="col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
              <h1 className="h1Large mb-4">Exhibitions</h1>
              <div className="fontSerif eabDescrText eabDescrTextII">
                <p>
                  Find out what's on at the museum’s: from current and upcoming
                  exhibitions, to guided tours, workshops, children's activities
                  and events.
                </p>
              </div>
            </div>
          </div>
        </header>

        <hr></hr>
        <h1>전시 목록</h1>
        {data.length > 0 ? (
          <div style={{ width: "70%", paddingTop: "50px" }}>
            {currentExhibitions.map((exhibition, index) => (
              <div key={index}>
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
              </div>
            ))}

            {/* Pagination */}
            <div className="pagination">
              {Array.from(
                { length: Math.ceil(data.length / exhibitionsPerPage) },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={currentPage === index + 1 ? "current-page" : ""}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </div>
        ) : (
          <p>데이터를 불러오는 중입니다...</p>
        )}
      </div>
    </section>
  );
};

export default ExhibitionList;
