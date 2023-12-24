const express = require("express");
const router = express.Router();
const { PythonShell } = require("python-shell");
const path = require("path");
const fs = require("fs");
router.get("/test", async (req, res) => {
  try {
    // Python 스크립트를 호출하여 예측 수행
    await callPythonScript();

    // 파일에서 결과 읽어오기
    const result = require("../../../../ai/result.json");

    // 클라이언트에게 결과 전송
    res.json(result);
  } catch (error) {
    console.error("에러:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
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
    const result = await callPythonScript2(imagePath);

    // 클라이언트에게 결과 전송
    res.json(result);
  } catch (error) {
    console.error("에러:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Python 스크립트를 호출하는 함수
function callPythonScript() {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.resolve(
      __dirname,
      "../../../../ai/ai_module.py"
    );
    console.log(" : ", pythonScriptPath);
    // PythonShell 인스턴스 생성
    const pyshell = new PythonShell(pythonScriptPath);

    // 파이썬 스크립트 실행 완료 시의 처리
    pyshell.end((err, code, signal) => {
      if (err) reject(err);
      console.log("파이썬 스크립트가 코드", code, "로 완료되었습니다.");
      resolve();
    });
  });
}
// Python 스크립트를 호출하는 함수
function callPythonScript2(imagePath) {
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
module.exports = router;
