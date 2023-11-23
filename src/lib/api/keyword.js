//키워드 관련 api
import client from "./client";

// 관리자 카테고리 조회
export const ADcategory = () => client.get("/keyword/admin/categories");

// 관리자 카테고리 삭제
export const ADdeletecategories = (id) =>
  client.delete("/keyword/admin/deletecategories", { data: { id } });

// 관리자 카테고리 추가
export const addCategories = ({ type, name, keyword_id }) =>
  client.post("/keyword/admin/addcategory", { type, name, keyword_id });

// 관리자 카테고리 추가
export const addImages = ({ type, name, image_url, keyword_id }) =>
  client.post("/keyword/admin/addimage", {
    type,
    name,
    image_url,
    keyword_id,
  });
export const getUser = ({ user_id, categories }) =>
  client.post("/keyword/user/saveCategories", {
    user_id,
    categories,
  });

// 유저 선호 카테고리 불러오는 api
export const userCategory = (username) => {
  return client.get(`/keyword/user/updateCategory/${username}`);
};

// 유저 선호 이미지 카테고리
export const userImage = (username) => {
  return client.get(`/keyword/user/updateImage/${username}`);
};

// 전시회 추가할 때 키워드 추가
export const getKeyword = () => {
  return client.get("/keyword/ex/addkeyword");
};
