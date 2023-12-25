import client from "./client";

// ai 사용
export const AIuse = (imagePathParam) => {
  return client.get(`ai/predicted?imagePath=${imagePathParam}`);
};
