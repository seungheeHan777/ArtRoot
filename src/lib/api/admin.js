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
export const exhibitionAdd = (data) => client.post("/admin/exhibitions", data);

// 전시회 수정
export const exhibitionUpdate = (id, updatedData) =>
  client.put(`/admin/exhibitions/${id}`, updatedData);

//전시회 삭제
export const exhibitionDel = (id) => client.delete(`/admin/exhibitions/${id}`);

// 카테고리, 이미지 관리 새로 추가한 부분 - 11/09
//카테고리 조회
export const categoryInfo = client.get("/admin/categories");

//카테고리 삭제
export const categoryDel = (names) => client.post("/admin/deletecategories", { data: { names }});

//카테고리 추가
export const categoryAdd = (data) => client.post("/admin/addcategory", data);

//이미지 카테고리 조회
export const imageInfo = client.get("/admin/images");

//이미지 추가
export const imageAdd = (data) => client.post("/admin/addimage", data);

//이미지 삭제
export const imageDel = (imageIds) => client.post("/admin/deleteimages", { data: { imageIds }});

//사용자 취향 페이지 카테고리 조회
export const recommendInfo = client.get("/admin/getcategories");

//사용자 취향 페이지 이미지 카테고리 조회
export const recommendimageInfo = client.get("/admin/getimagecategories");