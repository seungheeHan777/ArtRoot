import client from "./client";

// ai 사용
export const AIuse = (imagePathParam) => {
  return client.get(`ai/predicted?imagePath=${imagePathParam}`);
};

// ai결과 user 저장
export const saveuser = ({ user_id, styles }) => {
  return client.post("ai/savestyle/user", { user_id, styles });
};

// ai결과 user 저장
export const saveEx = ({ ART_NUM, styles }) => {
  return client.post("ai/savestyle/exhibition", { ART_NUM, styles });
};
// ai 추천
export const airec = (username) => {
  return client.get(`/ai/${username}`);
};
