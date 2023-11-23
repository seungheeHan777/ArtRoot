const express = require("express");
const router = express.Router();
const db = require("../db");

// 사용자의 취향에 따라 전시회를 추천하는 엔드포인트
router.get("/:username", (req, res) => {
  const username = req.params.username;
  console.log("username : ", username);

  // 먼저 사용자의 ID를 가져오기
  const getUserIdQuery = `
    SELECT id
    FROM user
    WHERE user_id = ?
  `;

  db.query(getUserIdQuery, [username], (err, userRows) => {
    if (err) {
      console.error("Error getting user ID:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }

    const userId = userRows[0].id;

    // 사용자 ID를 사용하여 취향을 읽어오기
    const getUserPreferencesQuery = `
      SELECT category_id
      FROM user_prefer
      WHERE user_id = ?
    `;

    db.query(getUserPreferencesQuery, [userId], (err, preferRows) => {
      if (err) {
        console.error("Error getting user preferences:", err);
        return res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }

      const categoryIds = preferRows.map((row) => row.category_id);

      // 각 카테고리에 해당하는 키워드를 읽어오며 순차적으로 처리
      const categoryKeywords = [];

      const getCategoryKeywords = (categoryId, callback) => {
        const getCategoryKeywordsQuery = `
          SELECT keyword_id
          FROM category
          WHERE category_id = ?
        `;

        db.query(getCategoryKeywordsQuery, [categoryId], (err, keywordRows) => {
          if (err) {
            console.error("Error getting category keywords:", err);
            return callback(err);
          }

          const keywordIds = keywordRows.map((row) => row.keyword_id);
          categoryKeywords.push(keywordIds);

          callback(null);
        });
      };

      // 순차적으로 처리하기 위한 함수
      const processCategoryKeywords = (index) => {
        if (index < categoryIds.length) {
          getCategoryKeywords(categoryIds[index], (err) => {
            if (err) {
              console.error("Error processing category keywords:", err);
              return res
                .status(500)
                .json({ success: false, error: "Internal Server Error" });
            }

            processCategoryKeywords(index + 1);
          });
        } else {
          console.log("categoryKeywords :", categoryKeywords);

          // 여기에서 중복된 키워드를 제거하고 전시회를 추천합니다.
          const uniqueKeywordIds = Array.from(new Set(categoryKeywords.flat()));
          // 키워드에 해당하는 전시회를 추천하는 함수
          const recommendExhibitionsByKeywords = () => {
            const query = `
            SELECT e.*
            FROM exhibition e
            JOIN exhibition_keyword ek ON e.ART_NUM = ek.ART_NUM
            WHERE ek.keyword_id IN (?)
          `;
            // null인 값은 필터링하여 유효한 값만 추출
            const validKeywordIds = uniqueKeywordIds.filter(
              (id) => id !== null
            );
            console.log(validKeywordIds);
            db.query(query, [validKeywordIds], (err, result) => {
              if (err) {
                console.error("Error recommending exhibitions:", err);
                return res
                  .status(500)
                  .json({ success: false, error: "Internal Server Error" });
              }

              const recommendedExhibitions = result.map((row) => ({
                ART_NUM: row.ART_NUM,
                ART_NAME: row.ART_NAME,
                // 다른 필드도 필요한 경우 추가
              }));

              console.log(recommendedExhibitions);
              res.json({ success: true, result });
            });
          };

          // 호출
          recommendExhibitionsByKeywords();
        }
      };

      // 처음 인덱스 0으로 시작
      processCategoryKeywords(0);
    });
  });
});

router.get("/keyword/detail/:id", (req, res) => {
  const art_num = req.params.id; // Retrieve the 'id' parameter from the URL

  const sql1 = "SELECT keyword_id FROM exhibition_keyword where ART_NUM = ?";
  db.query(sql1, [art_num], (err, result) => {
    if (err) {
      console.error("Error getting keyword_id:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No keyword found for the given ART_NUM",
      });
    }
    const keyword_id = result[0].keyword_id;
    const sql2 = "SELECT name,detail FROM keyword WHERE keyword_id = ?";
    db.query(sql2, keyword_id, (err, result) => {
      if (err) {
        console.error("키워드 세부 정보를 가져오는 중 오류 발생:", err);
        return res
          .status(500)
          .json({ success: false, error: "내부 서버 오류" });
      }
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          error: "주어진 키워드 ID에 대한 키워드 세부 정보를 찾을 수 없습니다.",
        });
      }
      const keywordDetail = result[0];
      // 키워드 세부 정보 반환
      res.json({ success: true, keywordDetail });
    });
  });
});
module.exports = router;
