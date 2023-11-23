//키워드 관련 api
import client from "./client";

export const userRec = (username) => {
  return client.get(`/rec/${username}`);
};

export const keywordDetail = (id) => {
  return client.get(`/rec/keyword/detail/${id}`);
};
