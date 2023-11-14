const express = require("express");
const router = express.Router();
const db = require("../db");

//전시
// API로부터 모든 전시회 정보를 가져와 클라이언트에게 제공
router.get("/allexhibitions", (req, res) => {
  const sql = "SELECT * FROM exhibition"; // exhibition 테이블에서 모든 정보를 가져오는 SQL 쿼리
  db.query(sql, (err, results) => {
    if (err) {
      console.log("에러 발생");
      console.log(err);
      return res.status(500).json({
        error: "데이터베이스에서 전시회 정보를 가져오는 중 에러가 발생했습니다",
      });
    }

    // 결과를 클라이언트에게 응답
    res.status(200).json(results);
    //console.log(results)
  });
});

// 개별 전시회 정보
router.get("/exhibitiondetail/:id", (req, res) => {
  const art_num = req.params.id; // Retrieve the 'id' parameter from the URL

  const sql = "SELECT * FROM exhibition where ART_NUM = ?";

  db.query(sql, [art_num], (err, results) => {
    if (err) {
      console.log("에러 발생");
      console.log(err);
      return res.status(500).json({
        error: "데이터베이스에서 전시회 정보를 가져오는 중 에러가 발생했습니다",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        error: "해당 ID로 전시회 정보를 찾을 수 없습니다",
      });
    }

    // Respond with the first result (assuming only one result is expected)
    res.status(200).json(results[0]);
  });
});

// 전시회 조회 엔드포인트
router.get("/ExhibitionSearchList", (req, res) => {
  const searchTerm = req.query.query;
  console.log("검색어(server):", searchTerm); // 검색어 출력
  const sql = `SELECT ART_PICTURE, ART_NAME, ART_ARTIST, ART_PRICE, ART_PLACE, ART_START, ART_END FROM exhibition WHERE ART_NAME LIKE '%${searchTerm}%'`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log(results);
    res.json({ results });
  });
});

// 전시회 랜덤으로 불러오기 --> 나중에 꼭 추천 으로 변경
router.get("/random", (req, res) => {
  const sql = "SELECT * FROM exhibition ORDER BY RAND() LIMIT 3"; // exhibition 테이블에서 랜덤으로 3개의 정보를 가져오는 SQL 쿼리
  db.query(sql, (err, results) => {
    if (err) {
      console.log("에러 발생");
      console.log(err);
      return res.status(500).json({
        error: "데이터베이스에서 전시회 정보를 가져오는 중 에러가 발생했습니다",
      });
    }

    // 결과를 클라이언트에게 응답
    res.status(200).json(results);
  });
});

// 전시회 평가 기능
// 별점 & 한줄평 id 별로
router.get("/rating/:id", (req, res) => {
  const art_num = req.params.id; // Retrieve the 'id' parameter from the URL
  console.log(art_num);
  const sql = "SELECT ART_PICTURE FROM exhibition where ART_NUM = ?";

  db.query(sql, [art_num], (err, results) => {
    if (err) {
      console.log("에러 발생");
      console.log(err);
      return res.status(500).json({
        error: "데이터베이스에서 전시회 정보를 가져오는 중 에러가 발생했습니다",
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        error: "해당 ID로 전시회 정보를 찾을 수 없습니다",
      });
    }
    // Respond with the first result (assuming only one result is expected)
    console.log(results[0] + "hi");
    res.status(200).json(results[0]);
  });
});

// 별점 평가한거 받는 것
// rating user,comment, start, exhiitionID post하기
router.post("/submitRating", (req, res) => {
  const { user, comment, star, date, exhibitionId } = req.body;

  const checkSql = "SELECT * FROM one WHERE ONE_USER = ? AND ONE_ARTNUM = ?";
  db.query(checkSql, [user, exhibitionId], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Error checking for existing rating:", checkErr);
      return res.status(500).json({
        error: "평가 확인 중 오류 발생",
      });
    }

    if (checkResult.length > 0) {
      // User has already rated this exhibition
      return res.status(400).json({
        message: "이미 평가를 제출했습니다.",
      });
    } else {
      // Insert the data into your "one" database table using an SQL query
      const insertSql =
        "INSERT INTO one (ONE_USER, ONE_COMMENT, ONE_STARS, ONE_PICTURE, ONE_ARTNUM, ONE_DATE) VALUES (?, ?, ?, ?, ?,?)";
      // First, perform a SELECT query to get the 'image' field from the other table based on 'exhibitionId'
      const selectSql = "SELECT ART_PICTURE FROM exhibition WHERE ART_NUM = ?";
      db.query(selectSql, [exhibitionId], (selectErr, selectResult) => {
        if (selectErr) {
          console.error("Error retrieving data from 'exhibition':", selectErr);
          return res.status(500).json({
            error: "exhibition에서 art picture 값 불러오기 실패",
          });
        }

        const ONE_PICTURE = selectResult[0].ART_PICTURE; // Assuming 'selectResult' contains only one row

        // Now, you can use the retrieved 'image' value in your INSERT statement
        db.query(
          insertSql,
          [user, comment, star, ONE_PICTURE, exhibitionId, date],
          (insertErr, insertResult) => {
            if (insertErr) {
              console.error(
                "Error inserting data into 'one' table:",
                insertErr
              );
              return res.status(500).json({
                error: "Error inserting data into the database",
              });
            }

            // Data successfully inserted into the 'one' table
            console.log("Rating submitted successfully.");
            res.status(200).json({ message: "Rating submitted successfully" });
          }
        );
      });
    }
  });
});

//전체 별점
//별점 리스트 불러오기
router.get("/all", (req, res) => {
  const sql = "SELECT * FROM one"; // exhibition 테이블에서 모든 정보를 가져오는 SQL 쿼리
  db.query(sql, (err, results) => {
    if (err) {
      console.log("에러 발생");
      console.log(err);
      return res.status(500).json({
        error: "데이터베이스에서 전시회 정보를 가져오는 중 에러가 발생했습니다",
      });
    }

    // 결과를 클라이언트에게 응답
    res.status(200).json(results);
  });
});

//한줄평 삭제
router.delete("/Ratings/:ONE_USER/:ONE_ARTNUM", (req, res) => {
  const user = req.params.ONE_USER; // URL에서 전시회 ID를 가져옴
  const artnum = req.params.ONE_ARTNUM;

  const sql = "DELETE FROM one WHERE ONE_USER = ? AND ONE_ARTNUM =?"; // 전시회 ID를 기반으로 삭제 쿼리 작성

  db.query(sql, [user, artnum], (err, results) => {
    if (err) {
      console.error("Failed to delete:", err);
      res.status(500).json({ message: "한줄평 삭제 실패" });
    } else {
      console.log("한줄평 삭제 성공");
      res.status(200).json({ message: "한줄평 삭제 성공" });
    }
  });
});

// 할인 전시회 불러오기 - 11/09 추가
router.get("/DiscountExhibitions", (req, res) => {
  const sql = "SELECT * FROM exhibition WHERE ART_DISCOUNT=1";
  db.query(sql, (err, results) => {
    if (err) {
      console.log("에러 발생");
      console.log(err);
      return res.status(500).json({
        error: "데이터베이스에서 전시회 정보를 가져오는 중 에러가 발생했습니다",
      });
    }

    // 결과를 클라이언트에게 응답
    res.status(200).json(results);
  });
});

module.exports = router;
