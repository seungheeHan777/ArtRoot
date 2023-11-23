import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeField, initializeForm, login } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { check } from "../../modules/user";

const LoginForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    //auth가 로그인 실패 성공, user 가 정보
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "login",
        key: name,
        value,
      })
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm("login"));
  }, [dispatch]);
  // useEffect로 로그인할 때 성공 실패 여부 확인
  useEffect(() => {
    if (authError) {
      console.log("오류 발생");
      console.log(authError);
      setError("로그인 실패");
      return;
    }
    if (auth) {
      console.log("로그인 성공");
      dispatch(check());
      /*
      const { username } = form;
      console.log(username);
      dispatch(check(username));
      */
    }
  }, [auth, authError, dispatch]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      // 로그인 성공 시 사용자 역할에 따라 페이지 이동
      if (user.username === "admin") {
        console.log("관리자");
        navigate("/");
        try {
          localStorage.setItem("user", JSON.stringify(user));
        } catch (e) {
          console.log("localStorage is not working");
        }
      } else {
        navigate("/");
        try {
          localStorage.setItem("user", JSON.stringify(user));
        } catch (e) {
          console.log("localStorage is not working");
        }
      }
    }
  }, [history, user]);
  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;
