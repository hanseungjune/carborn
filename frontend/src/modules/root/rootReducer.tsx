import { combineReducers } from "redux";
import { loginReducer } from "../loginModule";
import { idCheckReducer } from "../idcheckModule";
import { termsofuseReducer } from "../termsOfUseModule";
import { verificationNumberReducer } from "../verificationNumberModule";

// 타입 지정
// export type RootState = ReturnType<typeof rootReducer>

export type RootState = {
  termsofuse: {
    privacy: string;
    website: string;
  };
};

const rootReducer = combineReducers({
  login: loginReducer,
  termsofuse: termsofuseReducer,
  useridcheck: idCheckReducer,
  verificationnum: verificationNumberReducer,
});

export default rootReducer;
