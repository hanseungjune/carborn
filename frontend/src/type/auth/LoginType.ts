import { ButtonHTMLAttributes } from "react";
import { SET_INPUT_ERROR, SET_LOGIN_INPUT } from "../../modules/LoginGlobal";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../../modules/takeLoginLogoutModule";
import { LOGOUT } from "../../modules/LoginSubmitGlobal";

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
  inputError: string;
}

interface SetLoginInputAction {
  type: typeof SET_LOGIN_INPUT;
  payload: LoginInput;
}

interface SetInputErrorAction {
  type: typeof SET_INPUT_ERROR;
  payload: string;
}

export type LoginActionTypes = SetLoginInputAction | SetInputErrorAction;

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

export interface LogoutAction {
  type: typeof LOGOUT;
  error: Error;
}

export interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
  error: Error;
}

export type LoginSubmitActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | LogoutSuccessAction;

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
