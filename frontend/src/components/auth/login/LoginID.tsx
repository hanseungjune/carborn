import React, { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { StyledInput, StyleNameLabel } from "../signup/SignUpUserName";
import { LoginInput } from "../../../type/auth/LoginType";

const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface LoginIDType {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  loginInput: LoginInput;
}

const LoginID = ({ handleInputChange, loginInput }: LoginIDType) => {

  return (
    <StyleLoginInputDiv>
      <StyleNameLabel htmlFor="loginid">아이디<span></span></StyleNameLabel>
      <StyledInput
        type="text"
        id="loginid"
        name="loginid"
        autoComplete="off"
        placeholder="ID"
        minLength={5}
        maxLength={20}
        value={loginInput.loginid}
        onChange={handleInputChange}
      />
    </StyleLoginInputDiv>
  );
};

export default LoginID;
