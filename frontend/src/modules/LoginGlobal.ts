import { LoginActionTypes, LoginInput, LoginState } from "../type/auth/LoginType";

export const SET_LOGIN_INPUT = "SET_LOGIN_INPUT";

export const setLoginInput = (loginInput: LoginInput) => ({
  type: SET_LOGIN_INPUT,
  payload: loginInput,
});

const initialState : LoginState = {
  loginInput: {
    loginid: "",
    loginpassword: "",
  },
};

export const loginReducer = (state = initialState, action: LoginActionTypes): LoginState=> {
  switch (action.type) {
    case SET_LOGIN_INPUT:
      return {
        ...state,
        loginInput: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
