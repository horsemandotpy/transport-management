import React, { useEffect, useState } from "react";
import LoginHeader from "../../layout/LoginHeader/LoginHeader";
import {
  ButtonLogin,
  ErrorText,
  InputBar,
  InputWrapper,
  LoginFormWrapper,
  TitleLoginWrapper,
} from "./loginStyle";
import { PageTitle } from "../../style/style";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [textEmptyLogin, setTextEmptyLogin] = useState("");
  const [textEmptyPass, setTextEmptyPass] = useState("")
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");

  const postService = async (url: string, body: {
    user: string;
    password: string;

  }) => {
    try {
      const response = await axios.post(url, body);
      if (response) {
        navigate("/goods")
      }
    } catch (e) {
      message.error("Đăng nhập thất bại!")

    }
  };

  const handleSubmit = () => {
    const body = {
      user: username,
      password,
    };
    if (username === "") {
      setTextEmptyLogin("Không được để trống");
    }
    if (password === "") {
      setTextEmptyPass("Không được để trống")
    }
    postService("/api/login", body);
  };

  return (
    <>
      <LoginHeader />
      <LoginFormWrapper onSubmit={(e) => e.preventDefault()}>
        <TitleLoginWrapper>
          <PageTitle>Đăng nhập</PageTitle>
        </TitleLoginWrapper>
        <InputWrapper>
          <label>Tên đăng nhập</label>
          <InputBar
            onBlur={(e) => {
              if ("" === e.target.value) {
                setTextEmptyLogin("Không được để trống");
              } else {
                setTextEmptyLogin("");
              }
            }}
            onChange={(e) => {
              if (e.target.value !== "") {
                setTextEmptyLogin("Không được để trống");
                setUserName(e.target.value);
              }
            }}
          ></InputBar>
          <ErrorText>{textEmptyLogin}</ErrorText>
        </InputWrapper>
        <InputWrapper>
          <label>Mật khẩu</label>
          <InputBar
            type="password"
            onBlur={(e) => {
              if ("" === e.target.value) {
                setTextEmptyPass("Không được để trống");
              } else {
                setTextEmptyPass("");
              }
            }}
            onChange={(e) => {
              if (e.target.value !== "") {
                setTextEmptyPass("");
                setPassWord(e.target.value);
              }
            }}
          ></InputBar>
          <ErrorText>{textEmptyPass}</ErrorText>
        </InputWrapper>
        <ButtonLogin onClick={(e) => handleSubmit(e)}>Login</ButtonLogin>
      </LoginFormWrapper>
    </>
  );
};

export default Login;
