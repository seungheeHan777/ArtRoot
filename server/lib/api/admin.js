const express = require("express");
const router = express.Router();
const db = require("../db");

// 관리자 유저
// API로부터 모든 유저 정보를 가져와 클라이언트에게 제공
router.get("/users", (req, res) => {
  const sql = "SELECT * FROM user"; // user 테이블에서 모든 정보를 가져오는 SQL 쿼리
  db.query(sql, (err, results) => {
    if (err) {
      console.log("에러 발생");
      console.log(err);
      return res.status(500).json({
        error: "데이터베이스에서 유저 정보를 가져오는 중 에러가 발생했습니다",
      });
    }

    // 결과를 클라이언트에게 응답
    res.status(200).json(results);
  });
});

//사용자 정보 수정
router.post("/update", (req, res) => {
  if (req.session.username) {
    const username = req.body.username; // 받은 정보에서 유저 이름 가져오기
    const updateFields = {}; // 변경할 필드를 저장할 빈 객체 생성

    // 클라이언트에서 전송한 변경된 필드가 있는지 확인하고 객체에 추가
    if (req.body.name) {
      updateFields.user_name = req.body.name;
    }
    if (req.body.email) {
      updateFields.user_mail = req.body.email;
    }
    if (req.body.newPassword) {
      updateFields.user_pw = req.body.newPassword;
    }

    if (Object.keys(updateFields).length === 0) {
      // 변경된 필드가 없는 경우
      return res.status(400).json({ message: "변경된 필드가 없습니다." });
    }
    // 데이터베이스에서 사용자 정보 업데이트
    const updateSql = "UPDATE user SET ? WHERE user_id = ?";
    db.query(updateSql, [updateFields, username], (err, result) => {
      if (err) {
        console.error("Failed to update user info:", err);
        res.status(500).json({ message: "Failed to update user info" });
      } else {
        console.log("User info updated successfully");
        res.status(200).json({ message: "User info updated successfully" });
      }
    });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

// 탈퇴 요청 처리
router.delete("/deleteUser/:id", (req, res) => {
  if (req.session.username) {
    const username = req.params.id; // 세션에서 사용자 이름 가져오기
    // 데이터베이스에서 사용자 삭제
    const deleteSql = "DELETE FROM user WHERE user_id = ?";
    db.query(deleteSql, [username], (err, result) => {
      if (err) {
        console.error("Failed to delete user:", err);
        res.status(500).json({ message: "Failed to delete user" });
      } else {
        console.log("User deleted successfully");
        res.status(200).json({ message: "User deleted successfully" });
      }
    });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

// 관리자 전시회 관리 기능
// 전시회 조회
router.get("/exhibitions", (req, res) => {
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

// 전시회 추가
router.post("/exhibitions", (req, res) => {
  const newExhibition = req.body; // 클라이언트에서 전송된 전시회 정보

  const sql = "INSERT INTO exhibition SET ?"; // 전시회 정보를 삽입하는 SQL 쿼리

  db.query(sql, newExhibition, (err, results) => {
    if (err) {
      console.error("Failed to insert new exhibition:", err);
      res.status(500).json({ message: "전시회 추가 실패" });
    } else {
      console.log("전시회 추가 성공");
      res.status(201).json({ message: "전시회 추가 성공" });
    }
  });
});

// 전시회 정보 수정
router.put("/exhibitions/:id", (req, res) => {
  const exhibitionId = req.params.id;
  const updatedExhibition = req.body;
  console.log(updatedExhibition);
  function removeEmptyValues(obj) {
    const result = {};
    for (const key in obj) {
      if (obj[key]) {
        result[key] = obj[key];
      }
    }
    return result;
  }
  const updatedData = removeEmptyValues(updatedExhibition);
  const sql = "UPDATE exhibition SET ? WHERE ART_NUM = ?";
  db.query(sql, [updatedData, exhibitionId], (err, results) => {
    if (err) {
      console.error("Failed to update:", err);
      res.status(500).json({ message: "전시회 업데이트 실패" });
    } else {
      console.log("전시회 조회 수정 성공");
      res.status(200).json({ message: "전시회 조회 수정 성공" });
    }
  });
});

// 전시회 삭제
router.delete("/exhibitions/:id", (req, res) => {
  const exhibitionId = req.params.id; // URL에서 전시회 ID를 가져옴

  const sql = "DELETE FROM exhibition WHERE ART_NUM = ?"; // 전시회 ID를 기반으로 삭제 쿼리 작성

  db.query(sql, [exhibitionId], (err, results) => {
    if (err) {
      console.error("Failed to delete:", err);
      res.status(500).json({ message: "전시회 삭제 실패" });
    } else {
      console.log("전시회 삭제 성공");
      res.status(200).json({ message: "전시회 삭제 성공" });
    }
  });
});

module.exports = router;
