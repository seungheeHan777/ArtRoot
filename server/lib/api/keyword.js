const express = require("express");
const router = express.Router();
const db = require("../db");

// 관리자 카테고리 조회
router.get("/admin/categories", (req, res) => {
  const query =
    'SELECT name,type,category_id, CASE WHEN type = "image" THEN image_url END AS image_url FROM category';

  db.query(query, (err, results) => {
    if (err) {
      console.error("카테고리 데이터를 가져오는 중 오류가 발생했습니다:", err);
      res.status(500).send("서버 오류");
    } else {
      res.json(results);
    }
  });
});

// 관리자 카테고리 삭제
router.delete("/admin/deletecategories", (req, res) => {
  const categoryNamesToDelete = req.body.id; // 클라이언트에서 전달된 카테고리 ID 목록
  console.log("삭제 카테 : ", categoryNamesToDelete);
  // 카테고리 삭제 쿼리를 실행합니다.
  const query = "DELETE FROM category WHERE  category_id IN (?)";

  db.query(query, [categoryNamesToDelete], (err, results) => {
    if (err) {
      console.error("카테고리 삭제 중 오류가 발생했습니다:", err);
      res.status(500).send("서버 오류");
    } else {
      res.sendStatus(200); // 성공적으로 삭제되면 응답을 보냅니다.
    }
  });
});

// 관리자 카테고리 추가
router.post("/admin/addcategory", (req, res) => {
  const { type, name, keyword_id } = req.body; // 클라이언트에서 전달된 카테고리 정보
  console.log("추가 카테 : ", name);

  // 카테고리 추가 쿼리를 실행합니다.
  const query =
    "INSERT INTO category (type, name, keyword_id) VALUES (?, ?, ?)";

  db.query(query, [type, name, keyword_id], (err, results) => {
    if (err) {
      console.error("카테고리 추가 중 오류가 발생했습니다:", err);
      res.status(500).send("서버 오류");
    } else {
      res.sendStatus(200); // 성공적으로 추가되면 응답을 보냅니다.
    }
  });
});
// 관리자 이미지 추가
router.post("/admin/addimage", (req, res) => {
  const { type, name, image_url, keyword_id } = req.body; // 클라이언트에서 전달된 이미지 정보
  console.log("추가 이미지 정보 : ", name, image_url, keyword_id);

  // 이미지 추가 쿼리를 실행합니다.
  const query =
    "INSERT INTO category (type, name, image_url, keyword_id) VALUES (?, ?, ?, ?)";

  db.query(query, [type, name, image_url, keyword_id], (err, results) => {
    if (err) {
      console.error("이미지 추가 중 오류가 발생했습니다:", err);
      res.status(500).send("서버 오류");
    } else {
      res.sendStatus(200); // 성공적으로 추가되면 응답을 보냅니다.
    }
  });
});

router.post("/user/saveCategories", (req, res) => {
  try {
    const { user_id, categories } = req.body;
    // 사용자가 이미 선택한 카테고리 정보 삭제
    const query1 =
      "DELETE FROM user_prefer WHERE user_id = (SELECT id FROM user WHERE user_id = ?)";
    db.query(query1, [user_id]);

    // 새로 선택한 카테고리 정보 추가
    const query2 =
      "INSERT INTO user_prefer (user_id, category_id) VALUES ((SELECT id FROM user WHERE user_id = ?), ?)";
    for (const category_id of categories) {
      db.query(query2, [user_id, category_id]);
    }
    res
      .status(200)
      .json({ message: "카테고리 정보가 성공적으로 저장되었습니다." });
  } catch (error) {
    console.error("카테고리 정보 저장 중 에러 발생:", error);
    res
      .status(500)
      .json({ message: "서버 오류로 카테고리 정보를 저장할 수 없습니다." });
  }
});
router.get("/user/updateCategory/:username", (req, res) => {
  const { username } = req.params;
  console.log(req.params);
  // MySQL 쿼리 실행
  const query = `
   SELECT category_id
   FROM user_prefer
   WHERE user_id = (SELECT id FROM user WHERE user_id = ?);
 `;
  db.query(query, [username], (error, results) => {
    if (error) {
      console.error("MySQL 쿼리 오류:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
});

// 유저 선호 이미지 불러오기
router.get("/user/updateImage/:username", (req, res) => {
  const { username } = req.params;

  // MySQL 쿼리 실행
  const query = `
   SELECT category_id
   FROM user_prefer
   WHERE user_id = (SELECT id FROM user WHERE user_id = ?);
  `;

  db.query(query, [username], (error, results) => {
    if (error) {
      console.error("MySQL 쿼리 오류:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // 이미지 ID 반환
    res.json({ image_id: results.length > 0 ? results[0].image_id : null });
  });
});

// 전시회 관련 키워드 추가할 때
router.get("/ex/addkeyword", (req, res) => {
  try {
    const query = "SELECT keyword_id, name FROM keyword";
    db.query(query, (err, results) => {
      if (err) {
        console.log("에러 발생");
        console.log(err);
        return res.status(500).json({
          error:
            "데이터베이스에서 전시회 정보를 가져오는 중 에러가 발생했습니다",
        });
      }

      res.status(200).json({ success: true, keywords: results });
    });
  } catch (error) {
    console.error("키워드 불러오기 중 오류:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/search", function (req, res) {
  const client_id = "Rzqh4xXOyCONHeud9ciK";
  const client_secret = "_O4gSpW4Qv";
  //console.log(req.query.query);
  const api_url =
    "https://openapi.naver.com/v1/search/encyc?query=" +
    encodeURI("인상주의") +
    "&display=1"; // JSON 결과
  //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // XML 결과
  const request = require("request");
  const options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
      console.log(response.body["items"]);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});
module.exports = router;
