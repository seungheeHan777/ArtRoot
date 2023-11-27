mysql = require("mysql");
// MySQL 연결 설정
const db = mysql.createConnection({
  host: "localhost", // DB서버 IP주소
  user: "root", // DB접속 아이디
  password: "1111", // DB암호
  database: "db23208", //사용할 DB명
});

//  학교 서버
// const db = mysql.createConnection({
//   host: "localhost", // DB서버 IP주소
//   port: 3306, // DB서버 Port주소
//   user: "dbid232", // DB접속 아이디
//   password: "dbpass232", // DB암호
//   database: "db23208", //사용할 DB명
// });

module.exports = db;
