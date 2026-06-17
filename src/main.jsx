import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./router/AppRouter.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import AppTheme from "./app/AppTheme.js";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={AppTheme}>
    <CssBaseline />
    <RouterProvider router={AppRoutes} />
  </ThemeProvider>
);
