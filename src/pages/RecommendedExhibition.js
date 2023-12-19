import React, { useState, useEffect } from "react";
import ExhibitionItem from "../ExhibitionItem";
import { useSelector } from "react-redux";
import { userRec } from "../lib/api/rec";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./home.css";
const RecommendedExhibition = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [exhibitionsPerPage] = useState(10);
  const [showLoginAlert, setShowLoginAlert] = useState(false); // 모달 표시 상태 관리
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  // const serviceKey = "636f716649676b733637714f775a68"; // 서비스 키
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.username) {
          const response = await userRec(user.username);
          setData(response.data.result);
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

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section
      className="exhibitionBlock pt-6 pb-6 pt-md-9 pb-md-9 pt-lg-11 pb-lg-13 pt-xl-20 pb-xl-21"
      style={{ width: "100%" }}
    >
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
            <h1>{user.username} 님의 추천 전시 목록</h1>
            {data.length > 0 ? (
              <div style={{ width: "70%" }}>
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
                        className={
                          currentPage === index + 1 ? "current-page" : ""
                        }
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
    </section>
  );
};

export default RecommendedExhibition;
