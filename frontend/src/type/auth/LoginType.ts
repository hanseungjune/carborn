import { ButtonHTMLAttributes } from "react";
import { SET_LOGIN_INPUT } from "../../modules/LoginGlobal";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../../modules/takeLoginLogoutModule";

// 로그인 인풋 데이터 타입
export interface loginInputType {
  loginid: string;
  loginpassword: string;
  captcha?: string;
  success?: boolean;
}

// CSS 타입
export interface StyleLoginSignUpBtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
}

// 로그인 props를 정의하는 인터페이스 타입
export interface LoginInputProps {
  setLoginInput: React.Dispatch<React.SetStateAction<loginInputType>>;
  loginInput: loginInputType;
}

export interface IStyleLoginBoxDivProps {
  border?: string;
}

export interface LoginInput {
  loginid: string;
  loginpassword: string;
}

export interface LoginState {
  loginInput: LoginInput;
}

interface SetLoginInputAction {
  type: typeof SET_LOGIN_INPUT;
  payload: LoginInput;
}

export type LoginActionTypes = SetLoginInputAction;

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: LoginInput;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: LoginResponse;
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: Error;
}

export type LoginSubmitActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction;

export interface LoginSubmitState {
  data: LoginResponse | null;
  loading: boolean;
  error: Error | null;
}

export interface LoginResponse {
  status: number;
  accessToken: string;
  userType: number;
}