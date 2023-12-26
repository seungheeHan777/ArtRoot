import styled from "styled-components";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { update, deleteUser } from "../../lib/api/admin";

const UserBlock = styled.tr`
  border: 1px solid #ddd;
  td {
    padding: 8px;
  }

  .thumbnail {
    img {
      display: block;
      width: 60px;
      height: 40px;
      object-fit: cover;
    }
  }
  .contents {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h2 {
      margin: 0;
      a {
        color: black;
      }
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }
  & + & {
    margin-top: 3rem;
  }
`;

const Adminuseritem = (props) => {
  const { user_id, user_name, user_mail, user_pw } = props;
  const [updatedInfo, setUpdatedInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleUpdate = async () => {
    try {
      const response = await update({
        username: user_id,
        name: updatedInfo.name,
        email: updatedInfo.email,
        newPassword: updatedInfo.password,
      });
      console.log(response);
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      console.log(user_id);
      const response = await deleteUser(user_id);
      console.log(response);
      if (response.status === 200) {
        console.log("사용자 탈퇴 성공");
      } else {
        console.error("사용자 탈퇴 실패");
      }
    } catch (error) {
      console.error("사용자 탈퇴 오류:", error);
    }
  };

  return (
    <UserBlock>
      <td>{user_id}</td>
      <td>
        <Form.Control
          placeholder={props ? user_name : ""}
          onChange={(e) =>
            setUpdatedInfo({ ...updatedInfo, name: e.target.value })
          }
        />
      </td>
      <td>
        <Form.Control
          type="email"
          placeholder={props ? user_mail : ""}
          onChange={(e) =>
            setUpdatedInfo({ ...updatedInfo, email: e.target.value })
          }
        />
      </td>
      <td>
        <Form.Control
          placeholder={props ? user_pw : ""}
          onChange={(e) =>
            setUpdatedInfo({ ...updatedInfo, password: e.target.value })
          }
        />
      </td>
      <td>
        <Button
          variant="info"
          type="button"
          onClick={handleUpdate}
          href="/AdminMain"
        >
          수정
        </Button>
      </td>
      <td>
        <Button variant="danger" onClick={handleDeleteUser} href="/AdminMain">
          삭제
        </Button>
      </td>
    </UserBlock>
  );
};

export default Adminuseritem;
