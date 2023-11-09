//회원 인증에 필요한 api
import client from "./client";

// 로그인
export const login = ({ username, password }) =>
  client.post("/auth/LogIn", { username, password });
// 회원가입
//post로 백엔드 서버의 /users로 보낸다는 것 ->서버에 따라 이부분을 변경
export const register = ({ username, password, name, email }) =>
  client.post("/auth/Register", { username, password, name, email });

// 로그인 상태 확인
export const check = () => client.get("/auth/check");

// 로그아웃
export const logout = () => client.post("/auth/Logout");

//아이디 찾기
export const findID = ({ name, email }) =>
  client.post("/auth/findID", { name, email });

//비밀번호 찾기
export const findPW = ({ username, email }) =>
  client.post("/auth/findPW", { username, email });

//마이페이지 정보 조회
export const mypage = () => client.get("/auth/mypage");

//정보 수정
export const updateMy = ({ name, email, newPassword }) =>
  client.post("/auth/update", { name, email, newPassword });

//회원 탈퇴
export const deleteAccount = ({ username }) =>
  client.delete("/auth/deleteAccount", { username });

//마이페이지 한줄평 정보 조회
export const myone = () => client.get("/auth/myone");

//마이페이지 한줄평 정보 수정
export const updateOne = ({ comment, stars, picture }) =>
  client.post("/auth/updateOne", { comment, stars, picture });

//qna 전송
export const qna = (formData) => client.post("/auth/question", formData);
