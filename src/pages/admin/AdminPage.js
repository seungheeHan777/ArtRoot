import React, { useState, useEffect } from "react";
import { userlist } from "../../lib/api/admin";
import Adminuseritem from "./Adminuseritem";

const AdminPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userlist(); // 데이터베이스에서 전시회 정보를 가져오는 엔드포인트로 변경해야 합니다.
        setData(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="home-container">
      <h1>관리자 - 유저 목록</h1>
      {data.length > 0 ? (
        <div>
          <ul>
            {data.map((user, index) => (
              <li key={index}>
                <Adminuseritem
                  user_id={user.user_id}
                  user_name={user.user_name}
                  user_mail={user.user_mail}
                  user_pw={user.user_pw}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default AdminPage;
