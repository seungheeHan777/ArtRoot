import client from "./client";

// 미술관 좌표 출력
export const getMuseumCoordinates = (museumName) => {
  return client.get("/museum/getMuseumCoordinates", {
    params: { name: museumName },
  });
};
