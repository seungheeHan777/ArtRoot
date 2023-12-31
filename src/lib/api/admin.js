//회원 인증에 필요한 api
import client from "./client";

//모든 유저 정보 가져옴
export const userlist = () => client.get("/admin/users");

//정보 수정
export const update = ({ username, name, email, newPassword }) =>
  client.post("/admin/update", { username, name, email, newPassword });

//회원 탈퇴
export const deleteUser = (username) =>
  client.delete(`/admin/deleteUser/${username}`);

//전시회 조회
export const exhibitionInfo = () => client.get("/admin/exhibitions");

//전시회 추가
export const exhibitionAdd = (data) => client.post("/admin/exhibitionss", data);

// 전시회 수정
export const exhibitionUpdate = (id, updatedData) =>
  client.put(`/admin/exhibitions/${id}`, updatedData);

//전시회 삭제
export const exhibitionDel = (id) => client.delete(`/admin/exhibitions/${id}`);

//전시회 이미지 조회
export const eximages = (id) => client.get(`/admin/eximages/${id}`);

export const CW = (data) => client.post("/admin/cw", data);
