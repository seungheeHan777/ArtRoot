import client from "./client";

// ai 사용
export const AIuse = (imagePathParam) => {
  return client.get(`ai/predicted?imagePath=${imagePathParam}`);
};

// ai결과 user 저장
export const saveuser = ({ user_id, styles }) => {
  return client.post("ai/savestyle/user", { user_id, styles });
};
