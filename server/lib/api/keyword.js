const express = require("express");
const wikipedia = require("wikipedia");
const router = express.Router();
const db = require("../db");

// 관리자 키워드 조회
router.get("/admin/keywords", (req, res) => {
  const query = "SELECT * FROM keyword";
  db.query(query, (err, results) => {
    if (err) {
      console.error("카테고리 데이터를 가져오는 중 오류가 발생했습니다:", err);
      res.status(500).send("서버 오류");
    } else {
      res.json(results);
    }
  });
});

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

// exhibition_keyword 데이터 가져오기
router.get("/admin/getExkeyword", (req, res) => {
  const query = `
  SELECT ek.ART_NUM, ek.keyword_id, e.ART_NAME, k.name
  FROM exhibition_keyword AS ek
  JOIN exhibition AS e ON ek.ART_NUM = e.ART_NUM
  JOIN keyword AS k ON ek.keyword_id = k.keyword_id
`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("exhibition_keyword 데이터를 가져오는 중 오류 발생:", err);
      res.status(500).json({ error: "내부 서버 오류" });
    } else {
      res.status(200).json(results);
    }
  });
});
// exhibition_keyword 데이터 추가
router.post("/admin/exhibition_keywords", (req, res) => {
  const { ART_NUM, keyword_id } = req.body;
  console.log(ART_NUM);
  console.log(keyword_id);
  const query =
    "INSERT INTO exhibition_keyword (ART_NUM, keyword_id) VALUES (?, ?)";
  db.query(query, [ART_NUM, keyword_id], (err, results) => {
    if (err) {
      console.error("exhibition_keyword 데이터 추가 중 오류 발생:", err);
      res.status(500).json({ error: "내부 서버 오류" });
    } else {
      res.status(201).json({
        message: "exhibition_keyword 데이터가 성공적으로 추가되었습니다",
      });
    }
  });
});
// exhibition_keyword 데이터 삭제
router.delete("/admin/exhibition_keywords", (req, res) => {
  const { ART_NUM, keyword_id } = req.query; // req.query를 통해 URL 파라미터를 받아옴
  const query =
    "DELETE FROM exhibition_keyword WHERE ART_NUM = ? AND keyword_id = ?";
  db.query(query, [ART_NUM, keyword_id], (err, results) => {
    if (err) {
      console.error("exhibition_keyword 데이터 삭제 중 오류 발생:", err);
      res.status(500).json({ error: "내부 서버 오류" });
    } else {
      res.status(200).json({
        message: "exhibition_keyword 데이터가 성공적으로 삭제되었습니다",
      });
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

// router.get("/search", function (req, res) {
//   const client_id = "Rzqh4xXOyCONHeud9ciK";
//   const client_secret = "_O4gSpW4Qv";
//   //console.log(req.query.query);
//   const api_url =
//     "https://openapi.naver.com/v1/search/encyc?query=" +
//     encodeURI("인상주의") +
//     "&display=1"; // JSON 결과
//   //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // XML 결과
//   const request = require("request");
//   const options = {
//     url: api_url,
//     headers: {
//       "X-Naver-Client-Id": client_id,
//       "X-Naver-Client-Secret": client_secret,
//     },
//   };
//   request.get(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       // JSON 데이터를 JavaScript 객체로 파싱
//       const responseData = JSON.parse(body);

//       // console.log를 사용하여 데이터를 출력
//       console.log("lastBuildDate:", responseData.lastBuildDate);
//       console.log("total:", responseData.total);
//       console.log("start:", responseData.start);
//       console.log("display:", responseData.display);

//       // items 배열을 순회하면서 각 항목의 정보를 출력
//       responseData.items.forEach((item, index) => {
//         console.log(`Item ${index + 1}:`);
//         console.log("  title:", item.title);
//         console.log("  link:", item.link);
//         console.log("  description:", item.description);
//         console.log("  thumbnail:", item.thumbnail);
//       });
//     } else {
//       // 오류가 발생한 경우
//       console.log("Error:", response.statusCode);
//     }
//   });
// });
module.exports = router;
