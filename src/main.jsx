import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./router/AppRouter.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import AppTheme from "./app/AppTheme.js";
import { Provider } from "react-redux";
import AppStore from "./redux/index.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

createRoot(document.getElementById("root")).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Provider store={AppStore}>
      <ThemeProvider theme={AppTheme}>
        <CssBaseline />
        <RouterProvider router={AppRoutes} />
      </ThemeProvider>
    </Provider>
  </LocalizationProvider>,
);
