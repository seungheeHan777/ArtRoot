import React, { useState, useEffect } from "react";
import ExhibitionItem from "./ExhibitionItem";
import { useSelector } from "react-redux";
import { userRec } from "../lib/api/rec";
import { airec } from "../lib/api/ai";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./home.css";
import "./ExhibitionList.css";
import {
  format,
  isBefore,
  isAfter,
  isWithinInterval,
  parseISO,
} from "date-fns";

const RecommendedExhibition = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [exhibitionsPerPage] = useState(12);
  const [showLoginAlert, setShowLoginAlert] = useState(false); // 모달 표시 상태 관리
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  // const serviceKey = "636f716649676b733637714f775a68"; // 서비스 키
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.username) {
          const response = await airec(user.username);
          setData(response.data.result);
          console.log(response.data.result);
        } else {
          // 모달을 표시하는 상태 설정
          setShowLoginAlert(true);
        }
      } catch (e) {
        // API 호출 실패에 대한 에러 핸들링
        console.error("데이터를 불러오는 중에 오류가 발생했습니다:", e);
      }
    };

    fetchData();
  }, [user]);

  const closeLoginAlert = () => {
    // 모달을 숨기는 상태 설정
    setShowLoginAlert(false);
    navigate("/Login"); // 페이지 이동
  };

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

  return (
    <div className="page-container">
      <div className="home-container">
        {user ? ( // user 객체가 존재하는 경우
          <>
            <header className="topHeadingHead text-center mb-6 mb-lg-9 mb-xl-12">
              <div className="row">
                <div className="col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
                  <h1 className="h1Large mb-4">Exhibitions</h1>
                  <div className="fontSerif eabDescrText eabDescrTextII">
                    <p>
                      Find out what's on at the museum’s: from current and
                      upcoming exhibitions, to guided tours, workshops,
                      children's activities and events.
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
                    className={`date-dropdown ${
                      showDateDropdown ? "active" : ""
                    }`}
                  >
                    <div onClick={() => handlDateSelect("")}>전체</div>
                    <div onClick={() => handlDateSelect("전시 중")}>
                      전시 중
                    </div>
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

            <h1>{user.username} 님의 추천 전시 목록</h1>
            {data.length > 0 ? (
              //style={{ width: "70%" }}
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
              {Array.from(
                { length: Math.ceil(data.length / exhibitionsPerPage) },
                (_, index) => (
                  <button key={index} onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </>
        ) : (
          // 사용자가 로그인하지 않은 경우 모달 표시
          showLoginAlert && (
            <div>
              <Modal show={showLoginAlert} onHide={closeLoginAlert}>
                <Modal.Header closeButton>
                  <Modal.Title>로그인 에러</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>로그인이 필요합니다.</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeLoginAlert}>
                    닫기
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RecommendedExhibition;
