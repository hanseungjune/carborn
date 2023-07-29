import React, { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { StyledInput, StyleNameLabel } from "../signup/SignUpUserName";
import { LoginInput } from "../../../type/auth/LoginType";
import { useSelector } from "react-redux";
import { loginReducer } from "./../../../modules/LoginGlobal";
import { RootState } from "../../../modules/root/rootReducer";

const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface LoginIDType {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  loginInput: LoginInput;
}

const LoginID = ({ handleInputChange, loginInput }: LoginIDType) => {
  const inputError = useSelector(
    (state: RootState) => state.loginReducer.inputError
  );

  return (
    <StyleLoginInputDiv>
      <StyleNameLabel htmlFor="loginid">
        <span>아이디</span>
        <span style={{ color: "red", fontSize: "10px" }}>{inputError}</span>
      </StyleNameLabel>
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
