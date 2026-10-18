import { combineReducers } from "redux";
import AuthSlice from "./slices/AuthSlice";
import CaptchaSlice from "./slices/CaptchaSlice";
import PwaSlice from "./slices/PwaSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  captcha: CaptchaSlice,
  pwa: PwaSlice,
});

export default rootReducer;
