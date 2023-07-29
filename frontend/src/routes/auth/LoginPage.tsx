import LoginID from "../../components/auth/login/LoginID";
import LoginPassword from "../../components/auth/login/LoginPassword";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../modules/takeLoginLogoutModule";
import {
  companyModifyPasswordReset,
  userModifyPasswordReset,
} from "../../modules/modifyPasswordModule";
import { IsCanSignUpReset } from "../../modules/signUpModule";
import Nav2 from "./../../components/Nav2";
import swal from "sweetalert";
import { loginFailureReset } from "./../../modules/takeLoginLogoutModule";
import {
  StyleLink,
  StyleLoginBoxDiv,
  StyleLoginBtn,
  StyleLoginCenterDiv,
  StyleLoginContainer,
  StyleLoginForm,
} from "../../style/auth/LoginStyle";
import { StyleLoginAnotherLink } from "./SearchID";
import { useNavigate } from "react-router";
import { RootState } from "../../modules/root/rootReducer";
import { setLoginInput } from "../../modules/LoginGlobal";
import { useAPI } from "../../hooks/useAPI";
import { loginRequest } from "../../modules/LoginSubmitGlobal";

const USER = 0;
const REPAIR = 1;
const INSPECTOR = 2;
const INSURANCE = 3;
export const HTTPS_API = process.env.REACT_APP_API_MAIN_URL;

const LoginPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginInput = useSelector(
    (state: RootState) => state.loginReducer.loginInput
  );
  const loginSuccess = useSelector((state: RootState) => state.loginSubmitReducer)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setLoginInput({ ...loginInput, [name]: value }));
  };

  const LoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest(loginInput));
  };

  // useEffect(() => {
  //   // 실패하면 이거
  //   if (success !== true) {
  //     if (success === false) {
  //       swal(
  //         "로그인 문제",
  //         "아이디 또는 비밀번호가 맞지 않습니다.",
  //         "error"
  //       ).then(() => {
  //         dispatch(loginFailureReset());
  //         navigate("/login");
  //       });
  //     }
  //     // 성공하면 이거
  //   } else {
  //     switch (accountType) {
  //       case USER:
  //         navigate("/");
  //         break;
  //       case REPAIR:
  //         navigate("/garage");
  //         break;
  //       case INSPECTOR:
  //         navigate("/inspector");
  //         break;
  //       case INSURANCE:
  //         navigate("/insurance");
  //         break;
  //       default:
  //         navigate("/login");
  //         break;
  //     }
  //   }
  // }, [success, navigate, error]);

  // useEffect(() => {
  //   if (signUpSuccess === true) {
  //     swal("회원가입 성공", "회원가입에 성공했습니다.", "success");
  //   }
  // }, [signUpSuccess]);

  return (
    <StyleLoginContainer>
      <Nav2 />
      <StyleLoginCenterDiv>
        <StyleLoginBoxDiv>
          <StyleLoginForm onSubmit={LoginSubmit}>
            <input
              name="loginid"
              value={loginInput.loginid}
              onChange={handleInputChange}
              autoComplete="off"
            />
            {/* <LoginID setLoginInput={setLoginInput} loginInput={loginInput} /> */}
            <input
              name="loginpassword"
              type="password"
              value={loginInput.loginpassword}
              onChange={handleInputChange}
            />
            {/* <LoginPassword
              setLoginInput={setLoginInput}
              loginInput={loginInput}
            /> */}
            <StyleLoginBtn
              // backgroundColor={captchaValue ? "#d23131" : "grey"}
              // disabled={!captchaValue}
              type="submit"
            >
              로그인 하기
            </StyleLoginBtn>
          </StyleLoginForm>
          <StyleLoginAnotherLink>
            <StyleLink to="/getagreement">회원가입</StyleLink> /
            <StyleLink to="/searchid"> 아이디 찾기</StyleLink> /
            <StyleLink to="/passwordresetcheck"> 비밀번호 재설정</StyleLink>
          </StyleLoginAnotherLink>
        </StyleLoginBoxDiv>
      </StyleLoginCenterDiv>
    </StyleLoginContainer>
  );
};

export default LoginPages;
