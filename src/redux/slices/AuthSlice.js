import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, userAuthStatus: null, signupReply: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuthUser: (state) => {
      state.user = null;
    },
    setUserAuthStatus: (state, action) => {
      state.userAuthStatus = action.payload.authStatus;
    },
    clearAuthStatus: (state) => {
      state.userAuthStatus = null;
    },
    clearAll: (state) => {
      state.user = null;
      state.userAuthStatus = null;
      state.signupReply = null;
    },
    setSignupReply: (state, action) => {
      state.signupReply = action.payload;
    },
    clearSignupReply: (state) => {
      state.signupReply = null;
    },
  },
});

export const {
  setAuthUser,
  clearAuthUser,
  clearAll,
  clearAuthStatus,
  setUserAuthStatus,
  clearSignupReply,
  setSignupReply,
} = authSlice.actions;
export default authSlice.reducer;
