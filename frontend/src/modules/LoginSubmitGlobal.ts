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

const initialState: LoginSubmitState = {
  data: null,
  loading: false,
  error: null,
};

const HTTPS_API = process.env.REACT_APP_API_MAIN_URL;

function* loginSaga(action: LoginRequestAction): SagaIterator {
  console.log(action);
  console.log(HTTPS_API);
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

export function* watchLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
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
    default:
      return state;
  }
};
