import React, { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { StyledInput, StyleNameLabel } from "../signup/SignUpUserName";
import { LoginInput } from "../../../type/auth/LoginType";

const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface LoginPasswordType {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  loginInput: LoginInput;
}

const LoginPassword = ({ handleInputChange, loginInput }: LoginPasswordType) => {

  return (
    <StyleLoginInputDiv>
      <StyleNameLabel htmlFor="loginpassword">비밀번호</StyleNameLabel>
      <StyledInput
        type="password"
        id="loginpassword"
        name="loginpassword"
        autoComplete="off"
        placeholder="Password"
        onChange={handleInputChange}
        value={loginInput.loginpassword}
      />
    </StyleLoginInputDiv>
  );
};

export default LoginPassword;
