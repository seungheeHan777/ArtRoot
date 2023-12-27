const express = require("express");
const router = express.Router();
const { PythonShell } = require("python-shell");
const path = require("path");
const fs = require("fs");
const db = require("../db");

router.get("/predicted", async (req, res) => {
  try {
    // 클라이언트에서 이미지 경로를 쿼리 파라미터로 받아옴
    const imagePathsString = req.query.imagePath;
    //const imagePath = JSON.parse(imagePathsString); // 배열로 파싱
    console.log("imagePathsString :", imagePathsString);
    // JSON 문자열을 바로 사용 (파싱 필요 없음)
    const imagePath = imagePathsString.split(",");
    console.log("imagePath: ", imagePath);
    // Python 스크립트를 호출하여 예측 수행
    const result = await callPythonScript(imagePath);

    // 클라이언트에게 결과 전송
    res.json(result);
  } catch (error) {
    console.error("에러:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Python 스크립트를 호출하는 함수
function callPythonScript(imagePath) {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.resolve(
      __dirname,
      "../../../../ai/ai_module2.py"
    );

    // PythonShell 인스턴스 생성
    const pyshell = new PythonShell(pythonScriptPath, { args: [imagePath] });

    // 파이썬 스크립트 실행 완료 시의 처리
    pyshell.end((err, code, signal) => {
      if (err) reject(err);
      console.log("파이썬 스크립트가 코드", code, "로 완료되었습니다.");

      // 파일에서 결과 읽어오기 (동기적으로 처리)
      try {
        // 파일에서 결과 읽어오기
        const resultPath = path.resolve(
          __dirname,
          "../../../../ai/result.json"
        );
        const result = JSON.parse(fs.readFileSync(resultPath, "utf8"));
        console.log("result.json 결과", result);
        resolve(result);
      } catch (error) {
        console.error("파일에서 결과를 읽어오는 중 에러:", error);
        reject(error);
      }
    });
  });
}

// 유저 ai 분석 결과 저장
router.post("/savestyle/user", (req, res) => {
  try {
    const { user_id, styles } = req.body;
    console.log("styles", styles);
    // 사용자가 이미 선택한 카테고리 정보 삭제
    const query1 =
      "DELETE FROM user_style WHERE user_id = (SELECT id FROM user WHERE user_id = ?)";
    db.query(query1, [user_id]);

    // 새로 선택한 카테고리 정보 추가
    const query2 =
      "INSERT INTO user_style (user_id, style_id) VALUES ((SELECT id FROM user WHERE user_id = ?), (SELECT num FROM styles WHERE styles =?))";
    for (const style of styles) {
      db.query(query2, [user_id, style]);
    }
    res
      .status(200)
      .json({ message: "유저 스타일 정보가 성공적으로 저장되었습니다." });
  } catch (error) {
    console.error("유저 스타일 정보 저장 중 에러 발생:", error);
    res
      .status(500)
      .json({ message: "서버 오류로 유저 스타일 정보를 저장할 수 없습니다." });
  }
});
// 전시회 style 추가
router.post("/savestyle/exhibition", (req, res) => {
  try {
    const { ART_NUM, styles } = req.body;
    const query1 = "DELETE FROM exhibition_style WHERE ART_NUM = ?";
    db.query(query1, [ART_NUM]);
    // 새로 선택한 카테고리 정보 추가
    const query2 =
      "INSERT INTO exhibition_style (ART_NUM, style_id) VALUES ((?),(SELECT num FROM styles WHERE styles =?))";
    for (const style of styles) {
      db.query(query2, [ART_NUM, style]);
    }
    res
      .status(200)
      .json({ message: "전시회 스타일 정보가 성공적으로 저장되었습니다." });
  } catch (error) {
    console.error("전시회 스타일 정보 저장 중 에러 발생:", error);
    res.status(500).json({
      message: "서버 오류로 전시회 스타일 정보를 저장할 수 없습니다.",
    });
  }
});

// 유저 전시 추천
router.get("/:username", (req, res) => {
  const username = req.params.username;
  console.log("username: ", username);

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

    // 사용자 ID를 사용하여 사용자의 취향(스타일)을 읽어오기
    const getUserStylesQuery = `
      SELECT style_id
      FROM user_style
      WHERE user_id = ?
    `;

    db.query(getUserStylesQuery, [userId], (err, styleRows) => {
      if (err) {
        console.error("Error getting user styles:", err);
        return res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }

      const styleIds = styleRows.map((row) => row.style_id);

      // 스타일에 해당하는 전시회를 추천하는 함수
      const recommendExhibitionsByStyles = () => {
        const query = `
          SELECT e.*
          FROM exhibition e
          JOIN exhibition_style es ON e.ART_NUM = es.ART_NUM
          WHERE es.style_id IN (?)
        `;
        // null인 값은 필터링하여 유효한 값만 추출
        const validStyleIds = styleIds.filter((id) => id !== null);
        console.log(validStyleIds);
        db.query(query, [validStyleIds], (err, result) => {
          if (err) {
            console.error("Error recommending exhibitions:", err);
            return res
              .status(500)
              .json({ success: false, error: "Internal Server Error" });
          }

          const recommendedExhibitions = result.map((row) => ({
            ART_NUM: row.ART_NUM,
            ART_NAME: row.ART_NAME,
            ART_START: row.ART_START,
            ART_END: row.ART_END,
            ART_PICTURE: row.ART_PICTURE,
            // 다른 필드도 필요한 경우 추가
          }));

          console.log(recommendedExhibitions);
          res.json({ success: true, result: recommendedExhibitions });
        });
      };

      // 호출
      recommendExhibitionsByStyles();
    });
  });
});
module.exports = router;
