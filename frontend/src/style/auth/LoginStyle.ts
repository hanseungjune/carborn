import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { IStyleLoginBoxDivProps, StyleLoginSignUpBtnProps } from "../../type/auth/LoginType";

export const StyleLoginContainer = styled.div`
  width: 100vw;
  background-color: white;
`;

export const StyleLoginCenterDiv = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export const StyleLink = styled(Link)`
  color: #d23131;
  font-size: 0.75rem;
  font-weight: 900;
  text-decoration: none;
  margin: 0 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;



export const StyleLoginBoxDiv = styled.div<IStyleLoginBoxDivProps>`
  width: 30vw;
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #ffffff;
  border: 2px solid ${(props) => props.border};
  border-radius: 5px;
`;

export const StyleLoginForm = styled.form`
  margin-top: 3rem;
  width: 17vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyleLoginBtn = styled.button<StyleLoginSignUpBtnProps>`
  width: 15.5vw;
  height: 2.5rem;
  margin-bottom: 1rem;
  margin-left: 0.1rem;
  color: black;
  border-radius: 5px;
  font-weight: 900;
  font-size: 1rem;
  /* box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.3); */

  &:active {
    box-shadow: none;
  }

  &:hover {
    opacity: 0.8;
  }

  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
`;

export const StyleLoginAnotherLink = styled.div`
  text-decoration: none;
  margin-bottom: 5rem;
`;



