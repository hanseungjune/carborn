import {
  LoginActionTypes,
  LoginInput,
  LoginState,
} from "../type/auth/LoginType";

export const SET_LOGIN_INPUT = "SET_LOGIN_INPUT";
export const SET_INPUT_ERROR = "SET_INPUT_ERROR";

export const setLoginInput = (loginInput: LoginInput) => ({
  type: SET_LOGIN_INPUT,
  payload: loginInput,
});

export const setInputError = (error: string) => ({
  type: SET_INPUT_ERROR,
  payload: error,
});

const initialState: LoginState = {
  loginInput: {
    loginid: "",
    loginpassword: "",
  },
  inputError: "",
};

export const loginReducer = (
  state = initialState,
  action: LoginActionTypes
): LoginState => {
  switch (action.type) {
    case SET_LOGIN_INPUT:
      return {
        ...state,
        loginInput: action.payload,
      };
    case SET_INPUT_ERROR:
      return {
        ...state,
        inputError: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
