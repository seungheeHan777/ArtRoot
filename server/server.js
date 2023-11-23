const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const mysql2 = require("mysql2/promise"); // 추가
const axios = require("axios"); // 추가
const xml2js = require("xml2js"); // 추가
const PORT = 60008;
const con = require("./lib/db.js");
const authRoutes = require("./lib/api/auth.js"); // api/user.js를 불러옵니다.
const exhibitionRoutes = require("./lib/api/exhibition.js"); // api/user.js를 불러옵니다.
const adminRoutes = require("./lib/api/admin.js");
const keywordRoutes = require("./lib/api/keyword.js");
const recRoutes = require("./lib/api/rec.js");
// //db.js 로 이동

//세션
app.use(
  session({
    secret: "ksh202326008?!", // 세션 데이터 암호화에 사용될 키
    resave: false,
    saveUninitialized: true,
  })
);

// 미들웨어 설정
app.use(cors()); // CORS 설정
app.use(bodyParser.json()); // 요청 본문 파싱

//11/2 추가
/*
// API 호출 및 MySQL 연결 설정
const API_URL =
  "http://openapi.seoul.go.kr:8088/764a66547061726d3338484c595154/json/ListExhibitionOfSeoulMOAInfo/1/3/";
const DATABASE_CONFIG = {
  host: "localhost",
  user: "dbid232",
  port: 3306, // DB서버 Port주소
  password: "dbpass232",
  database: "db23208",
  charset: "utf8", // 또는 'utf8mb4'
};

async function fetchAndStoreData() {
  try {
    const apiResponse = await axios.get(API_URL);
    //const dataToSave = apiResponse.data;
    const dataToSave = apiResponse.data.ListExhibitionOfSeoulMOAInfo.row;
    for (const item of dataToSave) {
      // 각 필드에 대한 데이터가 있는지 확인하고 데이터가 없으면 null 또는 기본값을 할당
      const ART_NUM = item.DP_SEQ || null; // 전시별식별번호
      const ART_NAME = item.DP_NAME || null; // 전시명
      const ART_EXPLAIN = item.DP_VIEWPOINT || null; // 전시 설명
      const ART_START = item.DP_START || null; // 전시 시작기간
      const ART_END = item.DP_END || null; // 전시 마감기간
      const ART_TIME = item.DP_VIEWTIME || null; // 전시 관람 시간
      const ART_PLACE = item.DP_PLACE || null; // 전시 장소
      const ART_ADDR = item.DP_HOMEPAGE || null; // 전시 주소
      const ART_PRICE = item.DP_VIEWCHARGE || null; // 전시 가격
      const ART_SITE = item.DP_LNK || null; // 전시 사이트
      const ART_ARTIST = item.DP_ARTIST || null; // 전시 아티스트
      const ART_PREFER = item.DP_ART_PART || null; // 전시 장르
      const ART_BACK = item.DP_INFO || null; //전시 배경 지식
      const ART_PICTURE = item.DP_MAIN_IMG || null;
      //const ART_PICTURE = item.DP_MAIN_IMG ? await getImageBase64(item.DP_MAIN_IMG) : null; // 전시 사진

      //console.log(ART_PICTURE);

      const connection = await mysql2.createConnection(DATABASE_CONFIG);
      await connection.execute(
        "INSERT INTO exhibition (ART_NUM, ART_NAME, ART_PICTURE, ART_EXPLAIN, ART_START, ART_END, ART_TIME, ART_CLOSED, ART_PLACE, ART_ADDR, ART_PRICE, ART_CALL, ART_SITE, ART_ARTIST, ART_PREFER, ART_BACK) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          ART_NUM,
          ART_NAME,
          ART_PICTURE,
          ART_EXPLAIN,
          ART_START,
          ART_END,
          ART_TIME,
          "", // 전시 휴관 요일 - API 데이터에 없으므로 null 또는 ''로 설정(나중에 변경)
          ART_PLACE,
          ART_ADDR,
          ART_PRICE,
          "", // 전시 전화번호 - API 데이터에 없으므로 null 또는 ''로 설정(나중에 변경)
          ART_SITE,
          ART_ARTIST,
          ART_PREFER,
          ART_BACK,
        ]
      );
      await connection.end();
      console.log("데이터 초기화 및 저장 완료");
    }
  } catch (error) {
    console.error("데이터 초기화 중 오류 발생:", error);
  }
}
// 서버 시작 시 데이터 초기화
fetchAndStoreData();
// 여기까지 주석처리
*/
// app.use(express.static(path.join(__dirname, "../build"))); //주소 바꾸기
// app.get("/", (req, res) =>
//   res.sendFile(path.join(__dirname, "../build/index.html"))
// );

app.use("/auth", authRoutes);
app.use("/ex", exhibitionRoutes);
app.use("/admin", adminRoutes);
app.use("/keyword", keywordRoutes);
app.use("/rec", recRoutes);
// 유저 정보 수정

// 관리자 카테고리, 이미지 관리하는 부분

// // 사용자 이미지 장르 업데이트
// app.post("/saveImages", (req, res) => {
//   const images = req.body.images;
//   const user_id = req.session.username; // 세션에서 로그인한 사용자 아이디 가져오기
//   console.log("이미지 장르 : ", images);

//   if (!user_id) {
//     res.status(401).json({ error: "로그인되지 않음" });
//     return;
//   }

//   if (images && images.length > 0) {
//     // 중복된 카테고리를 제거하기 위해 SET으로 변환하고 다시 CSV 문자열로 조합
//     const uniqueImages = Array.from(new Set(images));
//     const user_imageprefer = uniqueImages.join(","); // NULL 값도 처리 가능

//     const updateQuery =
//       "UPDATE user SET user_imageprefer = ? WHERE user_id = ?";
//     const values = [user_imageprefer || null, user_id]; // user_imageprefer 값이 NULL이면 NULL을 저장

//     con.query(updateQuery, values, (err, result) => {
//       if (err) {
//         console.error("이미지 장르 저장 오류: " + err.message);
//         res
//           .status(500)
//           .json({ error: "이미지 장르를 저장하는 중 오류가 발생했습니다." });
//       } else {
//         console.log("이미지 장르가 성공적으로 저장되었습니다.");
//         res.status(200).json({ message: "이미지 장르가 저장되었습니다." });
//       }
//     });
//   } else {
//     // 선택된 이미지 장르가 없을 때도 NULL 값을 저장
//     const updateQuery =
//       "UPDATE user SET user_imageprefer = NULL WHERE user_id = ?";
//     const values = [user_id];

//     con.query(updateQuery, values, (err, result) => {
//       if (err) {
//         console.error("이미지 장르 저장 오류: " + err.message);
//         res
//           .status(500)
//           .json({ error: "이미지 장르를 저장하는 중 오류가 발생했습니다." });
//       } else {
//         console.log("이미지 장르가 성공적으로 저장되었습니다.");
//         res.status(200).json({ message: "이미지 장르가 저장되었습니다." });
//       }
//     });
//   }
// });

// app.get("/*", (req, res) =>
//   res.sendFile(path.join(__dirname, "../build/index.html"))
// );
// 서버 시작
app.listen(PORT, () => {
  console.log(`Server run : http://localhost:${PORT}/`);
});
