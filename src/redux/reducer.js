import { combineReducers } from "redux";
import AuthSlice from "./slices/AuthSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
});

export default rootReducer;
