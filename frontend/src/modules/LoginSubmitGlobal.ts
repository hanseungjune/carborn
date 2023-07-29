import { call, put, takeLatest } from "redux-saga/effects";
import {
  LoginInput,
  LoginRequestAction,
  LoginResponse,
  LoginSubmitActionTypes,
  LoginSubmitState,
} from "../type/auth/LoginType";
import { SagaIterator } from "redux-saga";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";

export const loginRequest = (payload: LoginInput) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload: LoginResponse) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (error: Error) => ({
  type: LOGIN_FAILURE,
  error,
});

export const logout = () => ({
  type: LOGOUT,
});

const initialState: LoginSubmitState = {
  data: null,
  loading: false,
  error: null,
};

const HTTPS_API = process.env.REACT_APP_API_MAIN_URL;

function* loginSaga(action: LoginRequestAction): SagaIterator {
  try {
    const result: Response = yield call(fetch, `${HTTPS_API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action.payload),
    });
    const data: any = yield call([result, result.json]);
    yield put(loginSuccess(data));
  } catch (error: any) {
    yield put(loginFailure(error));
  }
}

function* logoutSaga(): SagaIterator {
  try {
    localStorage.removeItem("accessToken");
    yield put(logout());
  } catch (error: any) {
    console.log(error);
  }
}

export function* watchLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

export function* watchLogoutSaga() {
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}

export const loginSubmitReducer = (
  state = initialState,
  action: LoginSubmitActionTypes
): LoginSubmitState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        data: null,
        error: null,
      };
    default:
      return state;
  }
};
