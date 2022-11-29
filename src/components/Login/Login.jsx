import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

import S from "./styled";
import { GET_NAME } from "../../reducer/nameSlice";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //아이디
  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };

  //비밀번호
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  // 로그인
  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        url: "/api/auth",
        data: {
          id: id,
          pw: password,
        },
      });
      console.log(res);

      const cookie = new Cookies();
      cookie.set("accessToken", res.data.accessToken);
      cookie.set("refreshToken", res.data.refreshToken);

      const decode = jwt_decode(res.data.accessToken);

      // redux에 nickname 저장
      dispatch(GET_NAME(decode.nickname));
      navigate("/");
    } catch (error) {
      const err = error.response.data;
      console.log(err);
      alert("아이디, 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>Login</S.Title>
        <S.Form onSubmit={login}>
          <S.Input
            type="text"
            value={id}
            onChange={onIdHandler}
            placeholder="아이디"
          />
          <S.Input
            type="password"
            value={password}
            onChange={onPasswordHandler}
            placeholder="비밀번호"
          />
          <S.BtnList>
            <S.LoginButton type="submit" onClick={login}>
              Login
            </S.LoginButton>
            <S.RegisterButton
              type="button"
              onClick={() => navigate("/register")}
            >
              회원가입
            </S.RegisterButton>
          </S.BtnList>
        </S.Form>
        <S.snsTitle>간편 Login</S.snsTitle>
        <S.BtnList>
          <S.snsLogin>Google</S.snsLogin>
          <S.snsLogin>KaKao</S.snsLogin>
        </S.BtnList>
      </S.Wrapper>
    </S.Container>
  );
};

export default Login;
