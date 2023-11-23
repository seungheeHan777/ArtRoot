const express = require("express");
const router = express.Router();
const db = require("../db");
// 사용자 ID로부터 사용자의 취향을 읽어오는 함수
async function getUserPreferences(username) {
  // 먼저 사용자의 ID를 가져오기
  const getUserIdQuery = `
        SELECT id
        FROM user
        WHERE user_id = ?
      `;

  const userId = await new Promise((resolve, reject) => {
    db.query(getUserIdQuery, [username], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      console.log("results 결과", results[0].id);
      resolve(results[0].id);
    });
  });

  // 사용자 ID를 사용하여 취향을 읽어오기
  const getUserPreferencesQuery = `
          SELECT category_id
          FROM user_prefer
          WHERE user_id = ?
        `;

  const category_id = await new Promise((resolve, reject) => {
    db.query(getUserPreferencesQuery, [userId], (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      const ids = results.map((row) => row.category_id);
      resolve(ids);
    });
  });

  // 이제 userId 및 category_id를 사용할 수 있습니다.
  console.log("유저 아이디", userId);
  console.log("카테고리 아이디", category_id);
  // category_id를 반환합니다.
  return category_id;
}

// 카테고리에 해당하는 키워드를 읽어오는 함수
async function getCategoryKeywords(categoryId) {
  const query = `
      SELECT keyword_id
      FROM category
      WHERE category_id = ?
    `;
  console.log("카테고리 id :", categoryId);
  db.query(query, [categoryId], (err, result) => {
    if (err) {
      reject(err);
      return;
    }
    console.log(result);
    return result;
  });
  //return result.rows.map((row) => row.keyword_id);
}

// // 키워드에 해당하는 전시회를 추천하는 함수
// async function recommendExhibitionsByKeywords(keywordIds) {
//   const query = `
//       SELECT e.*
//       FROM exhibition e
//       JOIN exhibition_keyword ek ON e.exhibition_id = ek.exhibition_id
//       WHERE ek.keyword_id = ANY($1)
//     `;
//   const values = [keywordIds];

//   try {
//     const result = await db.query(query, values);
//     return result.rows;
//   } catch (error) {
//     console.error("Error recommending exhibitions:", error);
//     throw error;
//   }
// }

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
          console.log(uniqueKeywordIds);
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
            db.query(query, validKeywordIds, (err, result) => {
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

module.exports = router;
