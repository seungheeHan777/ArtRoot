import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeField, initializeForm, register } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { check } from "../../modules/user";
import { useNavigate } from "react-router-dom";
const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "register",
        key: name,
        value,
      })
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm, name, email } = form;
    // 하나라도 비어있다면
    if ([username, password, passwordConfirm, name, email].includes("")) {
      setError("빈 칸을 모두 입력하세요.");
      return;
    }
    if (password !== passwordConfirm) {
      //비밀번호 와 비번 확인이 다르면 오류처리
      setError("비밀번호가 일치하지 않습니다.");
      changeField({ form: "register", key: "password", value: "" });
      changeField({ form: "register", key: "passwordConfirm", value: "" });
      return;
    }
    dispatch(register({ username, password, name, email })); //디스패치로 액션을 리듀스로 이동
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm("register"));
  }, [dispatch]);
  const navigate = useNavigate();
  //회원가입 성공/실패 처리
  useEffect(() => {
    //결과를 얻을 때 특정 작업을 하기 위해 useEffect 사용
    // auth or authError 에 따라 다른 작업 실행
    if (authError) {
      // 계정명이 이미 존재할 때
      if (authError.response.status === 409) {
        setError("이미 존재하는 계정명입니다.");
        return;
      }
      // 기타 이유
      setError("회원가입 실패");
      return;
    }

    if (auth) {
      console.log("회원가입 성공");
      console.log(auth);
      navigate("/");
    }
  }, [auth, authError, dispatch]);
  // user 값이 잘 설정되었는지 확인
  // withRouter가 삭제됨. navigate로 확인

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default RegisterForm;
