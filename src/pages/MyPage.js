import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../modules/user";
import { Link } from "react-router-dom";
import {
  mypage,
  updateMy,
  deleteAccount,
  myone,
  updateOne,
} from "../lib/api/auth";
import { ratingDel } from "../lib/api/exhibition";

const MyPage = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  const [userInfo, setUserInfo] = useState(null);
  const [oneInfo, setOneInfo] = useState(null);

  useEffect(() => {
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

  const [updatedInfo, setUpdatedInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [updatedOne, setUpdatedOne] = useState({
    comment: "",
    stars: "",
  });

  const handleUpdate = async () => {
    if (!passwordsMatch) {
      alert("비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await updateMy({
        name: updatedInfo.name,
        email: updatedInfo.email,
        newPassword: updatedInfo.password,
      });

      if (response.status === 200) {
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

  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showRatingdForm, setRatingForm] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setUpdatedInfo({ ...updatedInfo, password: newPassword });
  };

  const handlePasswordConfirmChange = (e) => {
    const newPasswordConfirm = e.target.value;
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteAccount({ username: userInfo.username });

      if (response.status === 200) {
        dispatch(logout());
        console.log("사용자 탈퇴 성공");
      } else {
        console.error("사용자 탈퇴 실패");
      }
    } catch (error) {
      console.error("사용자 탈퇴 오류:", error);
    }

    handleClose();
  };

  const handleUpdateOne = async (picture) => {
    console.log("Start");
    console.log(picture);
    try {
      const response = await updateOne({
        comment: updatedOne.comment,
        stars: updatedOne.stars,
        picture,
      });

      if (response.status === 200) {
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
    <div>
      {userInfo ? (
        <div>
          <h1>마이페이지</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>이름</Form.Label>
              <Form.Control
                placeholder={userInfo ? userInfo.name : ""}
                onChange={(e) =>
                  setUpdatedInfo({ ...updatedInfo, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={userInfo ? userInfo.email : ""}
                onChange={(e) =>
                  setUpdatedInfo({ ...updatedInfo, email: e.target.value })
                }
              />
            </Form.Group>

            {showChangePasswordForm && (
              <Form.Group controlId="formGridPassword">
                <Form.Label>새 비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  name="newpassword"
                  onChange={handlePasswordChange}
                />
                <Form.Label>새 비밀번호 확인</Form.Label>
                <Form.Control
                  type="password"
                  name="newpasswordConfirm"
                  onChange={handlePasswordConfirmChange}
                />
              </Form.Group>
            )}

            {passwordsMatch ? null : (
              <p style={{ color: "red" }}>
                비밀번호와 확인 비밀번호가 일치하지 않습니다.
              </p>
            )}

            <br />
            <Button onClick={toggleChangePasswordForm} type="button">
              비밀번호 바꾸기
            </Button>
            <br />
            <br />
            <Button
              variant="info"
              type="button"
              onClick={handleUpdate}
              href="/Mypage"
            >
              정보 수정하기
            </Button>
          </Form>
          <br />
          <Button onClick={onLogout} href="/" type="submit">
            로그아웃
          </Button>
          <Button onClick={handleShow} variant="danger" type="submit">
            탈퇴하기
          </Button>
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
          <br></br>
          <br />
          <Button onClick={toggleChangeRatingForm}>내 한줄평 보기</Button>
          <Link to="/Calendar">
            <Button variant="info">달력으로 이동</Button>
          </Link>
          {showRatingdForm && oneInfo && oneInfo.length > 0 && (
            <div>
              {oneInfo.map((one, index) => (
                <div key={index}>
                  <Form.Group controlId={`comment-${index}`}>
                    <br />
                    <Form.Label>전시 이미지</Form.Label>
                    <br />
                    <img
                      src={one.picture ? one.picture : ""}
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
                        setUpdatedOne({
                          ...updatedOne,
                          comment: e.target.value,
                        })
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
                        setUpdatedOne({
                          ...updatedOne,
                          stars: e.target.value,
                        })
                      }
                    />
                    <Button
                      variant="info"
                      type="button"
                      onClick={() => handleUpdateOne(one.picture)}
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
      ) : (
        <div>{window.alert("로그인을 먼저하세요.")}</div>
      )}
    </div>
  );
};

export default MyPage;
