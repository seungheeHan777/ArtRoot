const express = require("express");
const router = express.Router();
const db = require("../db");
//로그인
router.post("/LogIn", (req, res) => {
  const user_id = req.body.username;
  const user_pw = req.body.password;

  // 데이터베이스에서 사용자 정보 조회
  const sql = "SELECT * FROM user WHERE user_id = ?";
  if (user_id === "admin" && user_pw === "admin") {
    db.query(sql, [user_id], (err, results) => {
      const user = results[0];
      // 비밀번호 비교
      if (user.user_pw === user_pw) {
        // 로그인 성공
        console.log("로그인 성공");
        req.session.username = user.user_id;
        console.log(req.session.username);
        res.status(200).json({
          user: user,
        }); //사용자 정보를 응답에 포함
      } else {
        // 로그인 실패
        console.log("로그인 실패");
        console.log(user_id);
        console.log("비밀번호 오류");
        console.log(user);
      }
    });
  } else {
    db.query(sql, [user_id], (err, results) => {
      if (err) {
        console.log("에러 발생");
        return res.status(500).json({ error: "로그인 실패 : 에러 발생", err });
      }

      // 사용자 정보가 조회되지 않으면 로그인 실패
      if (results.length === 0) {
        console.log("사용자 정보가 없음");
        return res
          .status(401)
          .json({ error: "로그인 실패 : 사용자 정보 조회X" });
      }

      const user = results[0];

      // 비밀번호 비교
      if (user.user_pw === user_pw) {
        // 로그인 성공
        console.log("로그인 성공");
        req.session.username = user.user_id;
        req.session.user_prefer = user.user_prefer; // 유저 카테고리 정보도 전송
        req.session.user_imageprefer = user.user_imageprefer; // 유저 이미지 장르 정보도 전송
        console.log(req.session.username);
        console.log(user); // 유저 아이디를 콘솔에 출력
        res.status(200).json({
          user: user,
          user_prefer: user.user_prefer,
          user_imageprefer: user.user_imageprefer,
        }); //사용자 정보를 응답에 포함
      } else {
        // 로그인 실패
        console.log("로그인 실패");
        console.log(user_id);
        console.log("비밀번호 오류");
        console.log(user);
      }
    });
  }
});

// POST - 회원가입 요청 처리

router.post("/Register", (req, res) => {
  const user_id = req.body.username;
  const user_pw = req.body.password;
  const user_name = req.body.name;
  const user_mail = req.body.email;

  // 필수 필드 누락 확인
  if (!user_id || !user_pw || !user_name || !user_mail) {
    return res.status(400).json({ error: "모든 필드를 입력해야 합니다." });
  }
  const usercheck = "SELECT * FROM user WHERE user_id = ?";
  db.query(usercheck, [user_id], function (err, result) {
    if (err) {
      console.log("회원가입 실패 유저id 체크 실패");
      console.log(err);
      return res.status(500).json({ error: "회원가입 실패" });
    } else if (result.length !== 0) {
      console.log("회원가입 실패 이미 있는 유저");
      return res.status(500).json({ error: "이미 있는 유저" });
    } else {
      const sql =
        "INSERT INTO user (user_id, user_pw, user_name, user_mail) VALUES (?, ?, ?, ?)";

      db.query(
        sql,
        [user_id, user_pw, user_name, user_mail],
        function (err, result) {
          if (err) {
            console.log("회원가입 실패");
            console.log(err);
            return res.status(500).json({ error: "회원가입 실패" });
          } else {
            const user = {
              user_id: user_id,
              user_name: user_name,
              user_mail: user_mail,
            };
            console.log("회원가입 성공");
            res.status(200).json({ user: user });
          }
        }
      );
    }
  });
});

// 로그아웃
router.post("/Logout", (req, res) => {
  // 세션 제거
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "세션 제거 실패" });
    } else {
      // 로그아웃 성공 후 클라이언트에게 리디렉션할 주소 전달
      console.log("로그아웃!!");
      res.status(200).json({ redirectTo: "../pages/Home" });
    }
  });
});

// check api 로그인 완료 retrun       수정 11/1
router.get("/check", (req, res) => {
  // 예전
  if (req.session.username) {
    // 세션에 사용자 이름이 존재하면 로그인된 상태
    const user = {
      username: req.session.username, // 현재 로그인한 사용자의 이름 또는 아이디
      user_prefer: req.session.user_prefer, // 사용자의 카테고리 정보를 응답에 추가
      user_imageprefer: req.session.user_imageprefer, // 여기에서 다른 사용자 정보를 필요에 따라 세션에서 읽어올 수 있습니다.
    };
    res.status(200).json(user);
    console.log(user);
  } else {
    // 세션에 사용자 이름이 없으면 로그인되지 않은 상태
    res.status(401).json({ error: "로그인되지 않음" });
  }
});

// 아이디 찾기
router.post("/findID", (req, res) => {
  const user_name = req.body.name;
  const user_mail = req.body.email;

  // 데이터베이스에서 해당 이름과 이메일로 유저 아이디 조회
  const sql = "SELECT user_id FROM user WHERE user_name = ? AND user_mail = ?";
  db.query(sql, [user_name, user_mail], (err, results) => {
    if (err) {
      console.log("에러 발생");
      console.log(err);
      return res.status(500).json({ error: "아이디 찾기 실패" });
    }

    // 사용자 정보가 조회되지 않으면 아이디 찾기 실패
    if (results.length === 0) {
      console.log("사용자 정보가 없음");
      return res.status(404).json({ error: "일치하는 사용자 정보 없음" });
    }

    const user = results[0];

    // 아이디 찾기 성공
    console.log("아이디 찾기 성공:", user.user_id);
    res.status(200).json({ userId: user.user_id }); // 유저 아이디를 응답에 포함
  });
});

// 비밀번호 찾기
router.post("/findPW", (req, res) => {
  const user_id = req.body.username;
  const user_mail = req.body.email;

  // 데이터베이스에서 해당 아이디와 이메일로 유저 비밀번호 조회
  const sql = "SELECT user_pw FROM user WHERE user_id = ? AND user_mail = ?";
  db.query(sql, [user_id, user_mail], (err, results) => {
    if (err) {
      console.log("에러 발생");
      console.log(err);
      return res.status(500).json({ error: "비밀번호 찾기 실패" });
    }

    // 사용자 정보가 조회되지 않으면 비밀번호 찾기 실패
    if (results.length === 0) {
      console.log("사용자 정보가 없음");
      return res.status(404).json({ error: "일치하는 사용자 정보 없음" });
    }

    const user = results[0];
    //const userPW = user.user_pw.toString(); - 필요할 경우 문자열, 숫자 변환용
    // 비밀번호 찾기 성공
    console.log("비밀번호 찾기 성공:", user.user_pw);
    res.status(200).json({ userPW: user.user_pw }); // 유저 비밀번호를 응답에 포함
  });
});

//사용자 정보 조회
router.get("/mypage", (req, res) => {
  if (req.session.username) {
    const username = req.session.username; // 세션에서 사용자 이름 가져오기
    // 데이터베이스에서 사용자 정보 조회
    const sql = "SELECT * FROM user WHERE user_id = ?";
    db.query(sql, [username], (err, results) => {
      if (err) {
        console.log("에러 발생");
        console.log(err);
        return res.status(500).json({ error: "데이터베이스 오류" });
      }
      // 사용자 정보가 조회되지 않으면 오류 응답
      if (results.length === 0) {
        console.log("사용자 정보가 없음");
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다" });
      }

      const user = results[0]; // 데이터베이스에서 조회한 사용자 정보
      console.log(user);
      // 여기에서 필요한 사용자 정보를 클라이언트에게 응답할 수 있습니다.
      const mypage = {
        username: user.user_id,
        name: user.user_name,
        email: user.user_mail,
        // 기타 사용자 정보 추가
      };
      res.status(200).json(mypage); // 사용자 정보 응답
    });
  } else {
    // 세션에 사용자 이름이 없으면 로그인되지 않은 상태
    res.status(401).json({ error: "로그인되지 않음" });
  }
});

//사용자 정보 수정
router.post("/update", (req, res) => {
  if (req.session.username) {
    const username = req.session.username; // 세션에서 사용자 이름 가져오기
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
router.delete("/deleteAccount", (req, res) => {
  if (req.session.username) {
    const username = req.session.username; // 세션에서 사용자 이름 가져오기

    // 데이터베이스에서 사용자 삭제
    const deleteSql = "DELETE FROM user WHERE user_id = ?";
    db.query(deleteSql, [username], (err, result) => {
      if (err) {
        console.error("Failed to delete user:", err);
        res.status(500).json({ message: "Failed to delete user" });
      } else {
        console.log("User deleted successfully");
        req.session.destroy(); // 세션 파기
        res.status(200).json({ message: "User deleted successfully" });
      }
    });
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

// 유저 sessin으로 처리
//한줄평 정보 조회
router.get("/myone", (req, res) => {
  if (req.session.username) {
    const username = req.session.username; // 세션에서 사용자 이름 가져오기
    // 데이터베이스에서 사용자 정보 조회
    const sql = "SELECT * FROM one WHERE ONE_USER = ?";
    db.query(sql, [username], (err, results) => {
      if (err) {
        console.log("에러 발생");
        console.log(err);
        return res.status(500).json({ error: "데이터베이스 오류" });
      }
      // 사용자 정보가 조회되지 않으면 오류 응답

      if (results.length === 0) {
        console.log("사용자 정보가 없음");
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다" });
      }

      const oneList = results.map((one) => ({
        username: one.ONE_USER,
        artnum: one.ONE_ARTNUM,
        comment: one.ONE_COMMENT,
        stars: one.ONE_STARS,
        picture: one.ONE_PICTURE,
        date: one.ONE_DATE,
        // 기타 한줄평 정보 추가
      }));
      console.log(oneList);
      res.status(200).json(oneList); // 사용자 정보 응답
    });
  } else {
    // 세션에 사용자 이름이 없으면 로그인되지 않은 상태
    res.status(401).json({ error: "로그인되지 않음" });
  }
});

//한줄평 정보 수정
router.post("/updateOne", (req, res) => {
  if (req.session.username) {
    const username = req.session.username; // 세션에서 사용자 이름 가져오기

    const updateFields = {}; // 변경할 필드를 저장할 빈 객체 생성

    // 클라이언트에서 전송한 변경된 필드가 있는지 확인하고 객체에 추가
    if (req.body.comment) {
      updateFields.ONE_COMMENT = req.body.comment;
    }
    if (req.body.stars) {
      updateFields.ONE_STARS = req.body.stars;
    }
    if (req.body.picture) {
      updateFields.ONE_PICTURE = req.body.picture;
    }

    if (Object.keys(updateFields).length === 0) {
      // 변경된 필드가 없는 경우
      return res.status(400).json({ message: "변경된 필드가 없습니다." });
    }
    // 데이터베이스에서 사용자 정보 업데이트
    const updateSql = "UPDATE one SET ? WHERE ONE_USER = ?  AND ONE_PICTURE=?";
    db.query(
      updateSql,
      [updateFields, username, updateFields.ONE_PICTURE],
      (err, result) => {
        if (err) {
          console.error("Failed to update user info:", err);
          res.status(500).json({ message: "Failed to update user info" });
        } else {
          console.log("User info updated successfully");
          res.status(200).json({ message: "User info updated successfully" });
        }
      }
    );
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});

// 문의사항
router.post("/question", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO qna (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("데이터 입력 실패:", err);
      res.status(500).json({ message: "데이터 입력 실패" });
    } else {
      console.log("데이터 입력 성공");
      res.status(200).json({ message: "데이터 입력 성공" });
    }
  });
});

module.exports = router;
