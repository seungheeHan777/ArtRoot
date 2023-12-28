import React, { useState, useEffect } from "react";
import "./detail.css";
import { detail } from "../lib/api/exhibition.js";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { keywordDetail } from "../lib/api/rec.js";
import parse from "html-react-parser";
import NaverMap from "../components/common/NaverMap"; // NaverMap 컴포넌트 import
import { getMuseumCoordinates } from "../lib/api/museum.js";
import { rate } from "../lib/api/exhibition.js";
import { FaStar } from "react-icons/fa";

const createArray = (length) => [...Array(length)];
const Exhibitiondetail = ({ totalStars = 5 }) => {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [exhibitionData, setExhibitionData] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [show, setShow] = useState(false);
  const [exhibitionRate, setExhibitionRate] = useState(null);
  const [museumCoordinates, setMuseumCoordinates] = useState({
    name: "",
    latitude: 0,
    longitude: 0,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to calculate the distribution of star ratings
  const calculateStarDistribution = () => {
    if (!exhibitionRate || exhibitionRate.length === 0) {
      return [];
    }

    const distribution = createArray(totalStars).map((_, i) => ({
      stars: i + 1,
      count: 0,
    }));

    exhibitionRate.forEach((item) => {
      const stars = parseInt(item.ONE_STARS);
      distribution[stars - 1].count += 1;
    });

    return distribution;
  };

  const renderBarChart = () => {
    const starDistribution = calculateStarDistribution();

    // 최대 count 찾기
    const maxCount = Math.max(...starDistribution.map((data) => data.count));

    return (
      <div className="bar-chart-container">
        <div className="bar-chart">
          {starDistribution.map((data, index) => (
            <div className="bar-container">
              <div key={index} className="bar">
                <span className="bar-label">{data.stars}점</span>
                <div
                  className="bar-fill"
                  style={{
                    width: "50px",
                    height: `${
                      maxCount > 0 ? (data.count / maxCount) * 150 : 150
                    }px`, // 최대 높이가 150px로 고정, 데이터가 0인 경우에도 150px로 높이를 유지
                    background: data.count > 0 ? "red" : "transparent", // 데이터가 있는 경우에만 빨간색으로 표시
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await detail({ id });

        setExhibitionData(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        //키워드 배경지식 불러오기
        const res = await keywordDetail(id);
        setKeyword(res.data.keywordDetail);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData2();
  }, []);
  useEffect(() => {
    const fetchData3 = async () => {
      try {
        const response = await rate({ id });

        setExhibitionRate(response.data);
        console.log(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData3();
  }, [id]);
  // exhibitionData가 변경될 때 실행되는 효과
  useEffect(() => {
    const fetchMuseumCoordinates = async () => {
      try {
        // exhibitionData.ART_PLACE가 정의되어 있는지 확인
        if (exhibitionData && exhibitionData.ART_PLACE) {
          const museumResponse = await getMuseumCoordinates(
            exhibitionData.ART_PLACE
          );
          setMuseumCoordinates({
            name: museumResponse.data.name,
            latitude: museumResponse.data.x,
            longitude: museumResponse.data.y,
          });
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchMuseumCoordinates();
  }, [exhibitionData]);

  if (!exhibitionData) {
    return <div>Loading...</div>;
  }

  const Star = ({ selected = false }) => (
    <FaStar color={selected ? "#872323" : "gray"} />
  );

  // const renderStars = (stars) => {
  //   return createArray(totalStars).map((n, i) => (
  //     <Star key={i} selected={i + 0.5 < stars} />
  //   ));
  // };

  const calculateAverageStars = () => {
    if (!exhibitionRate || exhibitionRate.length === 0) {
      return 0; // Default value when no data is available
    }
    const totalStars = exhibitionRate.reduce((acc, item) => {
      const stars = parseInt(item.ONE_STARS); // Convert stars to an integer
      return acc + stars;
    }, 0);

    const averageStars = totalStars / exhibitionRate.length;
    return averageStars.toFixed(1);
  };

  return (
    <div className="contents">
      <div className="product_detail">
        <div className="detailArea">
          <p className="detailArea_title">{exhibitionData.ART_NAME}</p>
          <div className="imgArea">
            <img
              src={exhibitionData.ART_PICTURE}
              className="product_img"
              alt="Exhibition Image"
            />
          </div>

          <div className="infoArea">
            <div className="headingArea">
              <p className="middle_title1">별점 정보</p>
              <div className="stars-section">
                <p className="ss_avg_title">별점 그래프</p>
                <p className="ss_avg_stars">
                  평균{" "}
                  <FaStar style={{ marginLeft: "10px", marginRight: "5px" }} />
                  {calculateAverageStars()} ({exhibitionRate?.length || 0}명)
                </p>
              </div>
              <div>
                <div className="bar-chart-container">{renderBarChart()}</div>
              </div>
            </div>

            <p className="middle_title2">전시 정보</p>

            <div className="detail_area">
              <table>
                <tr className="space">
                  <th className="t_row">
                    <span>일정</span>
                  </th>
                  <td>
                    <span>
                      {exhibitionData.ART_START} ~ {exhibitionData.ART_END}
                    </span>
                  </td>
                </tr>
                <tr className="space">
                  <th>
                    <span className="t_row">시간</span>
                  </th>
                  <td>
                    <span>{exhibitionData.ART_TIME || "정보 없음"}</span>
                  </td>
                </tr>
                <tr className="space">
                  <th>
                    <span className="t_row">가격</span>
                  </th>
                  <td>
                    <span>{exhibitionData.ART_PRICE || "정보 없음"}</span>
                  </td>
                </tr>
                <tr className="space">
                  <th>
                    <span className="t_row">할인여부</span>
                  </th>
                  <td>
                    <span>{exhibitionData.ART_DISCOUNT === 1 ? "X" : "O"}</span>
                  </td>
                </tr>
                <tr className="space">
                  <th>
                    <span className="t_row">전화번호</span>
                  </th>
                  <td>
                    <span>{exhibitionData.ART_CALL || "정보 없음"}</span>
                  </td>
                </tr>
                <tr className="space">
                  <th>
                    <span className="t_row">장소</span>
                  </th>
                  <td>
                    <span onClick={handleShow} className="place-text">
                      {exhibitionData.ART_PLACE}
                    </span>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>미술관 장소</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {/* NaverMap 컴포넌트 사용 */}
                        <span className="modal-text">
                          {museumCoordinates.name}
                        </span>
                        <NaverMap
                          latitude={museumCoordinates.latitude}
                          longitude={museumCoordinates.longitude}
                        />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          닫기
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                </tr>
                <tr className="space">
                  <th>
                    <span className="t_row">사이트</span>
                  </th>
                  <td>
                    <a
                      href={exhibitionData.ART_SITE}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "black" }}
                    >
                      {exhibitionData.ART_SITE
                        ? "홈페이지 바로가기"
                        : "정보 없음"}
                    </a>
                  </td>
                </tr>
                <tr className="space">
                  <th className="t_row">
                    <span>설명</span>
                  </th>
                  <td>
                    <span>{exhibitionData.ART_EXPLAIN || "정보 없음"}</span>
                  </td>
                </tr>
                <tr className="space">
                  <th className="t_row">
                    <span>작가</span>
                  </th>
                  <td>
                    <span>{exhibitionData.ART_ARTIST || "정보 없음"}</span>
                  </td>
                </tr>
              </table>

              <hr />

              <div className="evaluation-container">
                <div className="evaluation-section">
                  <p>※ 정보 수정 요청은 문의사항으로 부탁드립니다.</p>
                  <p>
                    ※ 작가, 전시 담당자가 아닌 경우 요청이 반려될 수 있습니다.
                  </p>
                </div>
                <Button
                  href={`/Rating/${exhibitionData.ART_NUM}`}
                  className="evaluate_button"
                >
                  코멘트 남기기
                </Button>
              </div>
            </div>
          </div>
        </div>

        <p className="middle_title3">작품 정보</p>
        <div>전시 작품 이미지</div>

        <div>
          <p className="middle_title4">배경 정보</p>
          <span>{keyword ? keyword.name : "Loading..."}</span>
          {keyword ? parse(keyword.detail) : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default Exhibitiondetail;
