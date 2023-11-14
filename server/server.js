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
// 유저 정보 수정


// 관리자 카테고리, 이미지 관리하는 부분
// 관리자 카테고리 조회
app.get('/admin/categories', (req, res) => {
  const query = 'SELECT * FROM category';

  con.query(query, (err, results) => {
    if (err) {
      console.error('카테고리 데이터를 가져오는 중 오류가 발생했습니다:', err);
      res.status(500).send('서버 오류');
    } else {
      res.json(results);
    }
  });
});

// 관리자 카테고리 삭제
app.post('/admin/deletecategories', (req, res) => {
  const categoryNamesToDelete  = req.body.names; // 클라이언트에서 전달된 카테고리 ID 목록
  console.log("삭제 카테 : ", categoryNamesToDelete);
  // 카테고리 삭제 쿼리를 실행합니다.
  const query = 'DELETE FROM category WHERE category IN (?)';

  con.query(query, [categoryNamesToDelete], (err, results) => {
    if (err) {
      console.error('카테고리 삭제 중 오류가 발생했습니다:', err);
      res.status(500).send('서버 오류');
    } else {
      res.sendStatus(200); // 성공적으로 삭제되면 응답을 보냅니다.
    }
  });
});

// 관리자 카테고리 추가
app.post('/admin/addcategory', (req, res) => {
  const { name } = req.body; // 클라이언트에서 전달된 카테고리 이름
  console.log("추가 카테 : ", name);
  // 카테고리 추가 쿼리를 실행합니다.
  const query = 'INSERT INTO category (category) VALUES (?)';

  con.query(query, [name], (err, results) => {
    if (err) {
      console.error('카테고리 추가 중 오류가 발생했습니다:', err);
      res.status(500).send('서버 오류');
    } else {
      res.sendStatus(200); // 성공적으로 추가되면 응답을 보냅니다.
    }
  });
});

// 관리자 이미지 조회
app.get('/admin/images', (req, res) => {
  const query = 'SELECT image_id, image_url, image_genre FROM image_category';

  con.query(query, (err, results) => {
    if (err) {
      console.error('이미지 데이터를 가져오는 중 오류가 발생했습니다:', err);
      res.status(500).send('서버 오류');
    } else {
      res.json(results);
    }
  });
});

// 관리자 이미지 추가
app.post('/admin/addimage', (req, res) => {
  const { imageUrl, imageGenre } = req.body;

  // 이미지 URL과 이미지 장르를 데이터베이스에 추가하는 쿼리 작성
  const query = 'INSERT INTO image_category (image_url, image_genre) VALUES (?, ?)';

  con.query(query, [imageUrl, imageGenre], (err, results) => {
    if (err) {
      console.error('이미지 추가 중 오류가 발생했습니다:', err);
      res.status(500).send('이미지 추가 오류');
    } else {
      console.log('이미지가 성공적으로 추가되었습니다.');
      res.status(200).send('이미지가 추가되었습니다.');
    }
  });
});

// 관리자 이미지 삭제
app.post('/admin/deleteimages', (req, res) => {
  const imageIdsToDelete = req.body.imageIds;
  console.log("IDs to delete: ", imageIdsToDelete);
  
  // 이미지 삭제 쿼리 작성
  const query = 'DELETE FROM image_category WHERE image_id IN (?)';

  con.query(query, [imageIdsToDelete], (err, results) => {
    if (err) {
      console.error('이미지 삭제 중 오류가 발생했습니다:', err);
      res.status(500).send('이미지 삭제 오류');
    } else {
      console.log('이미지가 성공적으로 삭제되었습니다.');
      res.status(200).send('이미지가 삭제되었습니다.');
    }
  });
});

// 사용자 카테고리 가져오기
app.get('/admin/getcategories', (req, res) => {
  con.query('SELECT category FROM category', (err, results) => {
    if (err) {
      console.error('카테고리 데이터를 불러오는 중 오류가 발생했습니다:', err);
      res.status(500).send('카테고리 데이터 불러오기 오류');
    } else {
      const categories = results.map((row) => row.category);
      res.status(200).json({ categories });
    }
  });
});

// 사용자 이미지 카테고리 가져오기
app.get('/admin/getimagecategories', (req, res) => {
  con.query('SELECT image_id, image_url, image_genre FROM image_category', (err, results) => {
    if (err) {
      console.error('이미지 카테고리 데이터를 불러오는 중 오류가 발생했습니다:', err);
      res.status(500).send('이미지 카테고리 데이터 불러오기 오류');
    } else {
      const imageCategories = results.map((row) => ({
        image_id: row.image_id,
        image_url: row.image_url,
        image_genre: row.image_genre,
      }));
      res.status(200).json({ imageCategories });
    }
  });
});


// 사용자 카테고리 업데이트
app.post("/saveCategories", (req, res) => {
  const categories = req.body.categories;
  const user_id = req.session.username; // 세션에서 로그인한 사용자 아이디 가져오기
  console.log("카테고리 : ", categories);

  if (!user_id) {
    res.status(401).json({ error: "로그인되지 않음" });
    return;
  }

  if (categories && categories.length > 0) {
    // 중복된 카테고리를 제거하기 위해 SET으로 변환하고 다시 CSV 문자열로 조합
    const uniqueCategories = Array.from(new Set(categories));
    const user_prefer = uniqueCategories.join(','); // NULL 값도 처리 가능

    const updateQuery = "UPDATE user SET user_prefer = ? WHERE user_id = ?";
    const values = [user_prefer || null, user_id]; // user_prefer 값이 NULL이면 NULL을 저장

    con.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error("카테고리 저장 오류: " + err.message);
        res.status(500).json({ error: "카테고리를 저장하는 중 오류가 발생했습니다." });
      } else {
        console.log("카테고리가 성공적으로 저장되었습니다.");
        res.status(200).json({ message: "카테고리가 저장되었습니다." });
      }
    });
  } else {
    // 선택된 카테고리가 없을 때도 NULL 값을 저장
    const updateQuery = "UPDATE user SET user_prefer = NULL WHERE user_id = ?";
    const values = [user_id];

    con.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error("카테고리 저장 오류: " + err.message);
        res.status(500).json({ error: "카테고리를 저장하는 중 오류가 발생했습니다." });
      } else {
        console.log("카테고리가 성공적으로 저장되었습니다.");
        res.status(200).json({ message: "카테고리가 저장되었습니다." });
      }
    });
  }
});

// 사용자 이미지 장르 업데이트
app.post("/saveImages", (req, res) => {
  const images = req.body.images;
  const user_id = req.session.username; // 세션에서 로그인한 사용자 아이디 가져오기
  console.log("이미지 장르 : ", images);

  if (!user_id) {
    res.status(401).json({ error: "로그인되지 않음" });
    return;
  }

  if (images && images.length > 0) {
    // 중복된 카테고리를 제거하기 위해 SET으로 변환하고 다시 CSV 문자열로 조합
    const uniqueImages = Array.from(new Set(images));
    const user_imageprefer = uniqueImages.join(','); // NULL 값도 처리 가능

    const updateQuery = "UPDATE user SET user_imageprefer = ? WHERE user_id = ?";
    const values = [user_imageprefer || null, user_id]; // user_imageprefer 값이 NULL이면 NULL을 저장

    con.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error("이미지 장르 저장 오류: " + err.message);
        res.status(500).json({ error: "이미지 장르를 저장하는 중 오류가 발생했습니다." });
      } else {
        console.log("이미지 장르가 성공적으로 저장되었습니다.");
        res.status(200).json({ message: "이미지 장르가 저장되었습니다." });
      }
    });
  } else {
    // 선택된 이미지 장르가 없을 때도 NULL 값을 저장
    const updateQuery = "UPDATE user SET user_imageprefer = NULL WHERE user_id = ?";
    const values = [user_id];

    con.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error("이미지 장르 저장 오류: " + err.message);
        res.status(500).json({ error: "이미지 장르를 저장하는 중 오류가 발생했습니다." });
      } else {
        console.log("이미지 장르가 성공적으로 저장되었습니다.");
        res.status(200).json({ message: "이미지 장르가 저장되었습니다." });
      }
    });
  }
});


// app.get("/*", (req, res) =>
//   res.sendFile(path.join(__dirname, "../build/index.html"))
// );
// 서버 시작
app.listen(PORT, () => {
  console.log(`Server run : http://localhost:${PORT}/`);
});
