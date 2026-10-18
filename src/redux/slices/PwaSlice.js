import { createSlice } from "@reduxjs/toolkit";

const PWA_INSTALLED_KEY = "pwa_installed";

const getInitialInstalledState = () => {
  try {
    return localStorage.getItem(PWA_INSTALLED_KEY) === "true";
  } catch (e) {
    console.error("Failed to read PWA install status from localStorage", e);
    return false;
  }
};

const initialInstalled = getInitialInstalledState();

const initialState = {
  isInstalled: initialInstalled,
  installFlag: initialInstalled,
};

export const pwaSlice = createSlice({
  name: "pwa",
  initialState,
  reducers: {
    setPwaInstalled: (state, action) => {
      const installed = action.payload !== undefined ? !!action.payload : true;
      state.isInstalled = installed;
      state.installFlag = installed;
      try {
        localStorage.setItem(PWA_INSTALLED_KEY, String(installed));
      } catch (e) {
        console.error("Failed to save PWA install status to localStorage", e);
      }
    },
    setInstallFlag: (state, action) => {
      const installed = action.payload !== undefined ? !!action.payload : true;
      state.isInstalled = installed;
      state.installFlag = installed;
      try {
        localStorage.setItem(PWA_INSTALLED_KEY, String(installed));
      } catch (e) {
        console.error("Failed to save PWA install status to localStorage", e);
      }
    },
    clearPwaInstalled: (state) => {
      state.isInstalled = false;
      state.installFlag = false;
      try {
        localStorage.removeItem(PWA_INSTALLED_KEY);
      } catch (e) {
        console.error("Failed to clear PWA install status from localStorage", e);
      }
    },
  },
});

export const { setPwaInstalled, setInstallFlag, clearPwaInstalled } =
  pwaSlice.actions;
export default pwaSlice.reducer;
