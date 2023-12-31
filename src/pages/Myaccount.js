import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../modules/user";
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

  // 수정 버튼 클릭 시 호출되는 함수

  const handleUpdate = async () => {
    if (!passwordsMatch) {
      // 비밀번호와 확인 비밀번호가 일치하지 않을 경우 처리
      alert("비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // updatedInfo에서 빈 값을 제외한 항목만 보냄
      const response = await updateMy({
        name: updatedInfo.name,
        email: updatedInfo.email,
        newPassword: updatedInfo.password,
      });

      if (response.status === 200) {
        // 성공적으로 수정되면 새로운 정보 가져와서 업데이트
        const updatedResponse = await mypage();
        if (updatedResponse.status === 200) {
          const user = updatedResponse.data;
          setUserInfo(user);
          console.log("정보가 성공적으로 수정되었습니다.");
        }
      } else {
        console.error("사용자 정보 수정 실패");
      }
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
    }
  };
  // 비밀번호 바꾸기를 누르면 실행되는 함수
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showRatingdForm, setRatingForm] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true); // 새 비밀번호와 확인 비밀번호가 일치하는지 여부

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setUpdatedInfo({ ...updatedInfo, password: newPassword });
  };
  const handlePasswordConfirmChange = (e) => {
    const newPasswordConfirm = e.target.value;
    // 새 비밀번호와 확인 비밀번호 비교
    if (updatedInfo.password === newPasswordConfirm) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };
  const toggleChangePasswordForm = () => {
    setShowChangePasswordForm(!showChangePasswordForm);
  };
  const toggleChangeRatingForm = () => {
    setRatingForm(!showRatingdForm);
  };

  // 탈퇴 기능
  // 탈퇴 시 작동되는 modal
  const [show, setShow] = useState(false);
  //setShow가 false면 안보이고, true면 보임
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteAccount = async () => {
    try {
      // 서버로 DELETE 요청을 보내서 사용자 탈퇴를 처리합니다.
      const response = await deleteAccount({ username: userInfo.username });

      if (response.status === 200) {
        // 로그아웃 등 추가 작업 수행
        dispatch(logout());
        console.log("사용자 탈퇴 성공");
      } else {
        console.error("사용자 탈퇴 실패");
      }
    } catch (error) {
      console.error("사용자 탈퇴 오류:", error);
    }
    // 모달 닫기
    handleClose();
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
    <div
      className="my-page-container"
      style={{ border: "1px solid silver", width: "50%" }}
    >
      <h5>개인 정보 수정</h5>
      <hr style={{ border: "1px solid silver", width: "100%" }} />
      <Form className="my-page-form">
        <div className="row mb-3 align-items-center">
          <div className="col-md-3">
            <Form.Label className="mb-0">이름</Form.Label>
          </div>
          <div className="col-md-9">
            <Form.Control
              placeholder={userInfo ? userInfo.name : ""}
              onChange={(e) =>
                setUpdatedInfo({ ...updatedInfo, name: e.target.value })
              }
            />
          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <div className="col-md-3">
            <Form.Label className="mb-0">Email</Form.Label>
          </div>
          <div className="col-md-9">
            <Form.Control
              type="email"
              placeholder={userInfo ? userInfo.email : ""}
              onChange={(e) =>
                setUpdatedInfo({ ...updatedInfo, email: e.target.value })
              }
            />
          </div>
        </div>
        {showChangePasswordForm && (
          <div>
            <div className="row mb-3 align-items-center">
              <div className="col-md-3">
                <Form.Label>새 비밀번호</Form.Label>
              </div>
              <div className="col-md-9">
                <Form.Control
                  type="password"
                  name="newpassword"
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-md-3">
                <Form.Label>비밀번호 확인</Form.Label>
              </div>
              <div className="col-md-9">
                <Form.Control
                  type="password"
                  name="newpasswordConfirm"
                  onChange={handlePasswordConfirmChange}
                />
              </div>
            </div>
          </div>
        )}
        {passwordsMatch ? null : (
          <p style={{ color: "red" }}>
            비밀번호와 확인 비밀번호가 일치하지 않습니다.
          </p>
        )}
        <br />
        <div className="row mb-3">
          <hr style={{ border: "1px solid silver", width: "100%" }} />
          <div className="col-md-4">
            <Button
              onClick={toggleChangePasswordForm}
              type="button"
              className="btn btn-change-password"
            >
              비밀번호 변경
            </Button>
          </div>
          <div className="col-md-3">
            <Button
              variant="info"
              type="button"
              onClick={handleUpdate}
              href="/Myaccount"
              className="btn btn-update-info"
            >
              정보 수정
            </Button>
          </div>
          <div className="col-md-3">
            <Button
              onClick={onLogout}
              href="/"
              type="submit"
              className="btn btn-logout"
            >
              로그아웃
            </Button>
          </div>
          <div className="col-md-2">
            <Button onClick={handleShow} variant="danger" type="submit">
              탈퇴
            </Button>
          </div>
        </div>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>탈퇴하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말로 탈퇴하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button
            variant="danger"
            href="/Goodbye"
            onClick={handleDeleteAccount}
          >
            탈퇴하기
          </Button>
        </Modal.Footer>
      </Modal>

      <hr style={{ border: "1px solid silver", width: "100%" }} />
    </div>
  );
};

export default MyPage;
