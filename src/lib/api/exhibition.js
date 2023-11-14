import client from "./client";

// 모든 전시회 출력
export const allList = () => client.get("/ex/allexhibitions");

//각 전시회 id 로 호출
export const detail = ({ id }) => client.get(`/ex/exhibitiondetail/${id}`);

// 전시회 검색
export const search = (query) =>
  client.get(`/ex/ExhibitionSearchList?query=${query}`);

export const rating = (id) => client.get(`/ex/rating/${id}`);

export const submit = (data) => client.post("/ex/submitRating", data);

export const allRating = () => client.get("/ex/all");

// 전시회 추천 -> 일단 랜덤
export const random = () => client.get("/ex/random");

//한줄평 삭제
export const ratingDel = (ONE_USER, ONE_ARTNUM) =>
  client.delete(`/ex/Ratings/${ONE_USER}/${ONE_ARTNUM}`);

//할인 전시회
export const discount = () => client.get("/ex/DiscountExhibitions");
