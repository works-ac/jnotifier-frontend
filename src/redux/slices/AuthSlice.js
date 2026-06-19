import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, userAuthStatus: null };

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
      state = { user: null, userAuthStatus: null };
    },
  },
});

export const {
  setAuthUser,
  clearAuthUser,
  clearAll,
  clearAuthStatus,
  setUserAuthStatus,
} = authSlice.actions;
export default authSlice.reducer;
