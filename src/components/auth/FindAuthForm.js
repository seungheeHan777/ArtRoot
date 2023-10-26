import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";

/**
 * 아이디 또는 비밀번호 찾기 폼을 보여줍니다.
 */

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  id: "아이디 찾기",
  password: "비밀번호 찾기",
};

/**
 * 에러를 보여줍니다
 */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const FindAuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        {type === "id" && (
          <div>
            <StyledInput
              autoComplete="new-password"
              name="name"
              placeholder="이름"
              onChange={onChange}
              value={form.name}
            />
            <StyledInput
              autoComplete="email"
              name="email"
              placeholder="이메일"
              onChange={onChange}
              value={form.email}
            />
          </div>
        )}
        {type === "password" && (
          <div>
            <br />
            <StyledInput
              name="username"
              placeholder="아이디"
              onChange={onChange}
              value={form.username}
            />
            <StyledInput
              name="email"
              placeholder="이메일"
              type="email"
              onChange={onChange}
              value={form.email}
            />
          </div>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop cyan fullWidth style={{ marginTop: "1rem" }}>
          {text}
        </ButtonWithMarginTop>
      </form>
      <Footer>
        {type === "id" ? (
          <Link to="/FindPW">비밀번호 찾기</Link>
        ) : (
          <Link to="/LogIn">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default FindAuthForm;
