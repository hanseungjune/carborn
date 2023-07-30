import LoginID from "../../components/auth/login/LoginID";
import LoginPassword from "../../components/auth/login/LoginPassword";
import { ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Nav2 from "./../../components/Nav2";
import swal from "sweetalert";
import {
  StyleLink,
  StyleLoginBoxDiv,
  StyleLoginBtn,
  StyleLoginCenterDiv,
  StyleLoginContainer,
  StyleLoginForm,
} from "../../style/auth/LoginStyle";
import { StyleLoginAnotherLink } from "./SearchID";
import { useNavigate } from "react-router";
import { RootState } from "../../modules/root/rootReducer";
import { setInputError, setLoginInput } from "../../modules/LoginGlobal";
import { loginRequest } from "../../modules/LoginSubmitGlobal";

const USER = 0;
const REPAIR = 1;
const INSPECTOR = 2;
const INSURANCE = 3;
export const HTTPS_API = process.env.REACT_APP_API_MAIN_URL;

const LoginPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginInput = useSelector(
    (state: RootState) => state.loginReducer.loginInput
  );
  const accessToken = useSelector(
    (state: RootState) => state.loginSubmitReducer.data?.accessToken
  );
  const status = useSelector(
    (state: RootState) => state.loginSubmitReducer.data?.status
  );
  const userType = useSelector(
    (state: RootState) => state.loginSubmitReducer.data?.userType
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regex = /^[a-z0-9_]+$/;
    if (
      (name === "loginid" || name === "loginpassword") &&
      !regex.test(value) &&
      value !== ""
    ) {
      dispatch(setInputError("한글과 영대문자는 안되요!"));
      dispatch(setLoginInput({ ...loginInput, [name]: "" }));
    } else {
      dispatch(setInputError(""));
      dispatch(setLoginInput({ ...loginInput, [name]: value }));
    }
  };

  const LoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest(loginInput));
  };

  useEffect(() => {
    if (status === 200 && accessToken) {
      switch (userType) {
        case USER:
          navigate("/");
          break;
        case REPAIR:
          navigate("/garage");
          break;
        case INSPECTOR:
          navigate("/inspector");
          break;
        case INSURANCE:
          navigate("/insurance");
          break;
        default:
          navigate("/login");
          break;
      }
    } else if (status === 401) {
      swal(
        "로그인 실패",
        "아이디와 비밀번호 정보가 일치 하지 않습니다.",
        "error"
      );
    }
  }, [status, accessToken, userType, navigate]);

  return (
    <StyleLoginContainer>
      <Nav2 />
      <StyleLoginCenterDiv>
        <StyleLoginBoxDiv>
          <StyleLoginForm onSubmit={LoginSubmit}>
            <LoginID
              handleInputChange={handleInputChange}
              loginInput={loginInput}
            />
            <LoginPassword
              handleInputChange={handleInputChange}
              loginInput={loginInput}
            />
            <StyleLoginBtn
              backgroundColor={
                loginInput.loginid && loginInput.loginpassword
                  ? "#d23131"
                  : "grey"
              }
              disabled={!loginInput.loginid || !loginInput.loginpassword}
              type="submit"
            >
              로그인 하기
            </StyleLoginBtn>
          </StyleLoginForm>
          <StyleLoginAnotherLink>
            <StyleLink to="/getagreement">회원가입</StyleLink> /
            <StyleLink to="/searchid"> 아이디 찾기</StyleLink> /
            <StyleLink to="/passwordresetcheck"> 비밀번호 재설정</StyleLink>
          </StyleLoginAnotherLink>
        </StyleLoginBoxDiv>
      </StyleLoginCenterDiv>
    </StyleLoginContainer>
  );
};

export default LoginPages;
