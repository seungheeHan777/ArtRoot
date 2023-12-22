const express = require("express");
const router = express.Router();
const { PythonShell } = require("python-shell");

router.get("/test", async (req, res) => {
  try {
    // Python 스크립트를 호출하여 예측 수행
    await callPythonScript();

    // 파일에서 결과 읽어오기
    const result = require("C:/Users/ASUS/Downloads/result.json");

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
    const pythonScriptPath = "C:/Users/ASUS/Downloads/ai_module.py";

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

module.exports = router;
