import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../modules/user";
import { Link } from "react-router-dom";
import MyCalendar from "./calendar.js";
import TasteAnalysisChart from "./TasteAnalysisChart.js";
import "./MyPage.css"; // mypage css 파일 임포트
import {
  mypage,
  updateMy,
  deleteAccount,
  myone,
  updateOne,
} from "../lib/api/auth";
import { ratingDel } from "../lib/api/exhibition";
// 서버에서 받아오는 데이터를 연동해서 다시 적용하기
const MyPage = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  // 유저 정보 불러오기
  const [userInfo, setUserInfo] = useState(null);
  const [oneInfo, setOneInfo] = useState(null);

  // 마운트 시 한 번 호출하여 사용자 정보를 가져옴
  useEffect(() => {
    // API를 호출하여 사용자 정보 가져오기
    const fetchUserInfo = async () => {
      try {
        const response = await mypage();

        if (response.status === 200) {
          const user = response.data;
          setUserInfo(user);
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
          const one = response.data;
          setOneInfo(one);
          console.log(one);
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

  // 수정할 정보를 저장할 상태 변수 추가
  const [updatedInfo, setUpdatedInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [updatedOne, setUpdatedOne] = useState({
    comment: "",
    stars: "",
  });

  const [showRatingdForm, setRatingForm] = useState(false);

  const toggleChangeRatingForm = () => {
    setRatingForm(!showRatingdForm);
  };

  // 한줄 평 수정
  const handleUpdateOne = async (picture) => {
    console.log("sTart");
    console.log(picture);
    try {
      // updatedInfo에서 빈 값을 제외한 항목만 보냄
      const response = await updateOne({
        comment: updatedOne.comment,
        stars: updatedOne.stars,
        picture,
      });

      if (response.status === 200) {
        // 성공적으로 수정되면 새로운 정보 가져와서 업데이트
        const updatedResponse = await myone();
        if (updatedResponse.status === 200) {
          const one = updatedResponse.data;
          setOneInfo(one);
          console.log("정보가 성공적으로 수정되었습니다.");
        }
      } else {
        console.error("사용자 정보 수정 실패");
      }
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
    }
  };

  //한줄평 삭제
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

  return (
    <div className="my-page-container" style={{ paddingTop: "250px" }}>
      <hr style={{ border: "1px solid silver", width: "100%" }} />

      <section>
        <TasteAnalysisChart oneInfo={oneInfo} />
      </section>
      <hr style={{ border: "1px solid silver", width: "100%" }} />
      <section>
        <h5>캘린더</h5>
        <MyCalendar />
      </section>
      <hr style={{ border: "1px solid silver", width: "100%" }} />
      <Button onClick={toggleChangeRatingForm} className="btn-custom">
        내 한줄평 보기
      </Button>
      {showRatingdForm && oneInfo && oneInfo.length > 0 && (
        <div>
          {oneInfo.map((one, index) => (
            <div key={index}>
              <Form.Group controlId={`comment-${index}`}>
                <br />
                <Form.Label>전시 이미지</Form.Label>
                <br />
                <img
                  src={one.picture ? one.picture : ""} // Replace with the path to your image
                  alt="Profile Picture"
                  width="100"
                  height="100"
                />
                <br />
                <br />
                <Form.Label>한줄평</Form.Label>
                <Form.Control
                  placeholder={one.comment ? one.comment : ""}
                  onChange={(e) =>
                    setUpdatedOne({ ...updatedOne, comment: e.target.value })
                  }
                />
                <Form.Label>별점</Form.Label>
                <Form.Control
                  placeholder={
                    userInfo
                      ? `${one.stars} (1~5점을 입력하시오 숫자만)`
                      : "1~5점을 입력하시오"
                  }
                  onChange={(e) =>
                    setUpdatedOne({ ...updatedOne, stars: e.target.value })
                  }
                />
                <Button
                  variant="info"
                  type="button"
                  onClick={() => handleUpdateOne(one.picture)} // 수정 버튼 클릭 시 정보 수정 함수 호출
                  href="/Mypage"
                >
                  한줄평 정보 수정하기
                </Button>
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleDelete(one.username, one.artnum)}
                  href="/Mypage"
                >
                  한줄평 정보 삭제하기
                </Button>
              </Form.Group>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPage;
