import "./index.css";
import "react-toastify/ReactToastify.css";

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./router/AppRouter.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import AppTheme from "./app/AppTheme.js";
import { Provider } from "react-redux";
import AppStore from "./redux/index.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={AppStore}>
        <ThemeProvider theme={AppTheme}>
          <CssBaseline />
          <RouterProvider router={AppRoutes} />
        </ThemeProvider>
      </Provider>
    </LocalizationProvider>

    <ToastContainer />
  </>,
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch((error) => {
        console.error("PWA Service Worker registration failed:", error);
      });
  });
}

// PWA Link Capturing: handles links clicked from external apps like WhatsApp
if ("launchQueue" in window) {
  window.launchQueue.setConsumer((launchParams) => {
    if (launchParams.targetURL) {
      const url = new URL(launchParams.targetURL);
      const targetPath = url.pathname + url.search + url.hash;
      const currentPath =
        window.location.pathname +
        window.location.search +
        window.location.hash;
      if (currentPath !== targetPath) {
        AppRoutes.navigate(targetPath);
      }
    }
  });
}


