const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/getMuseumCoordinates", (req, res) => {
  // 미술관 이름을 요청 파라미터에서 받아옴
  const museumName = req.query.name;
  console.log(museumName);
  // 이름이 주어지지 않은 경우 에러 응답
  if (!museumName) {
    return res
      .status(400)
      .json({ error: "미술관 이름이 제공되지 않았습니다." });
  }

  // 미술관 이름을 이용하여 DB에서 좌표 조회
  const query = "SELECT x, y FROM museum WHERE name = ?";

  db.query(query, [museumName], (err, results) => {
    if (err) {
      console.error("DB 조회 오류:", err);
      return res.status(500).json({ error: "서버 오류" });
    }
    console.log(results);
    // 결과가 없는 경우 해당 미술관이 없다고 응답
    if (results.length === 0) {
      return res.status(404).json({ error: "해당 미술관을 찾을 수 없습니다." });
    }

    // 좌표를 응답
    const { x, y } = results[0];
    res.json({ x, y });
  });
});

module.exports = router;
