import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button, Navbar, Nav, Table } from "react-bootstrap";
import MyCalendar from "./calendar.js";
import TasteAnalysisChart from "./TasteAnalysisChart.js";
import Myaccount from "./Myaccount.js";
import "./MyPage.css";
import { mypage, updateOne, myone } from "../lib/api/auth";
import { ratingDel } from "../lib/api/exhibition";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [oneInfo, setOneInfo] = useState(null);
  const [showTasteChart, setShowTasteChart] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [showMyaccountForm, setShowMyaccountForm] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await mypage();
        if (response.status === 200) {
          setUserInfo(response.data);
        } else {
          console.error("사용자 정보를 가져오지 못했습니다.");
        }
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    const fetchOneInfo = async () => {
      try {
        const response = await myone();
        if (response.status === 200) {
          setOneInfo(response.data);
        } else {
          console.error("한줄평 정보를 가져오지 못했습니다.");
        }
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchUserInfo();
    fetchOneInfo();
  }, []);

  const [updatedOne, setUpdatedOne] = useState({
    comment: "",
    stars: "",
  });

  const handleUpdateOne = async (picture) => {
    try {
      const response = await updateOne({
        comment: updatedOne.comment,
        stars: updatedOne.stars,
        picture,
      });

      if (response.status === 200) {
        const updatedResponse = await myone();
        if (updatedResponse.status === 200) {
          setOneInfo(updatedResponse.data);
          console.log("정보가 성공적으로 수정되었습니다.");
        }
      } else {
        console.error("사용자 정보 수정 실패");
      }
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
    }
  };

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

  const toggleVisibility = (target) => {
    setShowTasteChart(false);
    setShowCalendar(false);
    setShowRatingForm(false);
    setShowMyaccountForm(false);

    switch (target) {
      case "TasteChart":
        setShowTasteChart(true);
        break;
      case "Calendar":
        setShowCalendar(true);
        break;
      case "RatingForm":
        setShowRatingForm(true);
        break;
      case "Myaccount":
        setShowMyaccountForm(true);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1 style={{ paddingLeft: "50px", fontWeight: "bold" }}>마이페이지</h1>
      <hr
        style={{
          width: "85%",

          borderColor: "#db908a",
          borderWidth: "2px",
        }}
      ></hr>
      <div
        className="my-page-container"
        style={{ display: "flex", width: "100%" }}
      >
        <Navbar
          bg="light"
          expand="sm"
          style={{
            textAlign: "left",
            flexDirection: "column", // Align Navbar items in a column
            width: "300px", // Adjust the width of the Navbar as needed
            height: "600px",
            marginRight: "50px",
            backgroundColor: "#DC7878",
            color: "#fff",
          }}
        >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto flex-column">
              <Nav.Link
                className="nav-llink"
                onClick={() => toggleVisibility("Myaccount")}
                style={{ color: "#DB908A", fontSize: "30px" }}
              >
                내정보
              </Nav.Link>
              <Nav.Link
                className="nav-llink"
                onClick={() => toggleVisibility("TasteChart")}
                style={{
                  color: "#DB908A",
                  fontSize: "30px",
                  paddingTop: "40px",
                }}
              >
                별점 분포
              </Nav.Link>
              <Nav.Link
                className="nav-llink"
                onClick={() => toggleVisibility("Calendar")}
                style={{
                  color: "#DB908A",
                  fontSize: "30px",
                  paddingTop: "40px",
                }}
              >
                캘린더
              </Nav.Link>
              <Nav.Link
                className="nav-llink"
                onClick={() => toggleVisibility("RatingForm")}
                style={{
                  color: "#DB908A",
                  fontSize: "30px",
                  paddingTop: "40px",
                }}
              >
                내 한줄평
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div
          className="content-container"
          style={{
            paddingTop: "50px",
            width: "100%", // Use the remaining width
          }}
        >
          {showMyaccountForm && (
            <section>
              <Myaccount />
            </section>
          )}
          {showTasteChart && (
            <section>
              <TasteAnalysisChart oneInfo={oneInfo} />
            </section>
          )}
          {showCalendar && (
            <section>
              <MyCalendar />
            </section>
          )}
          {showRatingForm && oneInfo && oneInfo.length > 0 && (
            <div
              style={{
                marginLeft: "100px",
                width: "75%", // Use the remaining width
              }}
            >
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>전시 이미지</th>
                    <th>한줄평</th>
                    <th>별점</th>
                    {/* <th>수정</th> */}
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {oneInfo.map((one, index) => (
                    <tr key={index}>
                      <td style={{ paddingRight: "0" }}>
                        <a href={`exhibitiondetail/${one.artnum}`}>
                          <img
                            src={one.picture ? one.picture : ""}
                            alt="Profile Picture"
                            width="100"
                            height="100"
                          />
                        </a>
                      </td>
                      <td style={{ verticalAlign: "middle" }}>{one.comment}</td>
                      <td style={{ verticalAlign: "middle" }}>{one.stars}</td>
                      {/* <td>
              <Button
                variant="info"
                type="button"
                onClick={() => handleUpdateOne(one.picture)}
                href="/Mypage"
              >
                수정
              </Button>
            </td> */}
                      <td style={{ verticalAlign: "middle" }}>
                        <Button
                          variant="danger"
                          type="button"
                          onClick={() => handleDelete(one.username, one.artnum)}
                          href="/Mypage"
                        >
                          삭제
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
