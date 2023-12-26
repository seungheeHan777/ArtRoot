// AdminPage.js
import React, { useState, useEffect } from "react";
import { userlist } from "../../lib/api/admin";
import Adminuseritem from "./Adminuseritem";
import "./AdminExhibitionList.css";

const AdminPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userlist();
        setData(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1
        style={{
          fontSize: "25px",
          color: "#872323",
          fontWeight: "bold",
        }}
      >
        유저 목록
      </h1>
      <hr className="customhr" />
      {data.length > 0 ? (
        <table className="user-table" style={{ paddingLeft: "100px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <Adminuseritem
                key={index}
                user_id={user.user_id}
                user_name={user.user_name}
                user_mail={user.user_mail}
                user_pw={user.user_pw}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default AdminPage;
