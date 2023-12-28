import React, { useState, useEffect } from "react";
import { allList } from "../lib/api/exhibition.js";
import ExhibitionItem from "./ExhibitionItem";
import "./hhome.css";
import "../muzze/css/responsive.css";
import "../muzze/css/vendor/bootstrap/_bootstrap-grid.css";
import "./ExhibitionList.css";
import {
  format,
  isBefore,
  isAfter,
  isWithinInterval,
  parseISO,
} from "date-fns";

const ExhibitionList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [exhibitionsPerPage] = useState(12);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

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

  const handleRegionLabelClick = () => {
    setShowRegionDropdown(!showRegionDropdown);
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setShowRegionDropdown(false);
    setCurrentPage(1);
  };

  const handleDateLabelClick = () => {
    setShowDateDropdown(!showDateDropdown);
  };

  const handlDateSelect = (dateRange) => {
    setSelectedDateRange(dateRange);
    setShowDateDropdown(false);
    setCurrentPage(1);
  };

  const currentDate = format(new Date(), "yyyy-MM-dd");

  const isExhibitionActive = (exhibition) => {
    const exhibitionStartDate = parseISO(exhibition.ART_START);
    const exhibitionEndDate = parseISO(exhibition.ART_END);
    console.log(exhibitionEndDate);

    if (selectedDateRange === "전시 중") {
      // Check if the current date is within the exhibition interval
      return isWithinInterval(parseISO(currentDate), {
        start: exhibitionStartDate,
        end: exhibitionEndDate,
      });
    } else if (selectedDateRange === "과거 전시") {
      // Check if the exhibition has already ended
      return isAfter(parseISO(currentDate), exhibitionEndDate);
    } else if (selectedDateRange === "전시 예정") {
      // Check if the exhibition is scheduled to start in the future
      return isAfter(exhibitionStartDate, parseISO(currentDate));
    }

    // If no date range is selected, consider it as "전체"
    return true;
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageButtonRange = 5; // You can adjust this value
  const totalPages = Math.ceil(data.length / exhibitionsPerPage);
  const startPage =
    currentPage <= Math.floor(pageButtonRange / 2)
      ? 1
      : Math.min(
          Math.max(currentPage - Math.floor(pageButtonRange / 2), 1),
          totalPages - pageButtonRange + 1
        );
  const endPage = Math.min(startPage + pageButtonRange - 1, totalPages);

  return (
    <div className="page-container">
      <div className="home-container">
        <header className="topHeadingHead text-center mb-6 mb-lg-9 mb-xl-12">
          <div className="row">
            <div className="col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
              <h1 className="h1Large mb-4">Exhibitions</h1>
              <div className="fontSerif eabDescrText eabDescrTextII">
                <p>
                  여기, 예술의 다양성이 만나는 곳, artroot입니다. 우리는 예술을
                  사랑하는 이들에게 새로운 창작물과 미술 작품을 소개하고, 다양한
                  전시 및 행사 정보를 제공합니다. 예술의 뿌리를 탐험하고, 문화의
                  아름다움에 빠져보세요.
                </p>
              </div>
            </div>
          </div>
        </header>

        <hr></hr>

        <div className="filter_container">
          <label className="region-label">지역</label>
          <div className="region-dropdown-container">
            <span
              //className={`region-dropdown-label ${showRegionDropdown ? 'active' : ''}`}
              className="region-dropdown-label"
              onClick={handleRegionLabelClick}
            >
              {selectedRegion || "전체"}
            </span>
            {showRegionDropdown && (
              <div
                className={`region-dropdown ${
                  showRegionDropdown ? "active" : ""
                }`}
              >
                <div onClick={() => handleRegionSelect("")}>전체</div>
                <div onClick={() => handleRegionSelect("서울")}>서울</div>
                <div onClick={() => handleRegionSelect("부산")}>부산</div>
              </div>
            )}
          </div>

          <label className="date-label">기간</label>
          <div className="date-dropdown-container">
            <span
              className="date-dropdown-label"
              onClick={handleDateLabelClick}
            >
              {selectedDateRange || "전체"}
            </span>
            {showDateDropdown && (
              <div
                className={`date-dropdown ${showDateDropdown ? "active" : ""}`}
              >
                <div onClick={() => handlDateSelect("")}>전체</div>
                <div onClick={() => handlDateSelect("전시 중")}>전시 중</div>
                <div onClick={() => handlDateSelect("과거 전시")}>
                  과거 전시
                </div>
                <div onClick={() => handlDateSelect("전시 예정")}>
                  전시 예정
                </div>
              </div>
            )}
          </div>
        </div>

        {data.length > 0 ? (
          <div className="exhibition-container">
            {currentExhibitions
              .filter((exhibition) => {
                if (selectedRegion) {
                  const cleanedExhibitionRegion =
                    exhibition.ART_PLACE.trim().toLowerCase();
                  const cleanedSelectedRegion = selectedRegion
                    .trim()
                    .toLowerCase();
                  const isMatchingRegion = cleanedExhibitionRegion.includes(
                    cleanedSelectedRegion
                  );
                  return isMatchingRegion;
                }
                return true;
              })
              .filter((exhibition) => {
                return isExhibitionActive(exhibition);
              })
              .map((exhibition, index) => (
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
          </div>
        ) : (
          <p>데이터를 불러오는 중입니다...</p>
        )}
        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <button
              key={startPage + index}
              onClick={() => paginate(startPage + index)}
              style={{ marginRight: "10px" }}
            >
              {startPage + index}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExhibitionList;
