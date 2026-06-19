import React from "react";
import { Paper, Typography, useTheme } from "@mui/material";
import useAccounts from "../hooks/useAccounts";
import useAppCss from "../hooks/useAppCss";
import { useSelector } from "react-redux";
import AppAlert from "../components/AppAlert";
import CircluarProgressLoader from "../components/CircluarProgressLoader";
import { AppConstants } from "../app/AppConstants";
import Login from "../views/Login";

function AccountsPage() {
  const theme = useTheme();
  const { alert, checkUserAuthStatus, handleAlertOnClose, isLoading } =
    useAccounts();
  const { GlobalPaperCss } = useAppCss();
  const { userAuthStatus } = useSelector((state) => state.auth);

  console.log("hello hui...");

  if (isLoading)
    return (
      <CircluarProgressLoader
        text="We're checking your authentication status, please wait..."
        takeHeight
      />
    );

  if (userAuthStatus?.trim()?.toLowerCase() !== AppConstants.USER_AUTH_STATUS)
    return <Login />;

  return (
    <Paper variant="elevation" elevation={4} sx={GlobalPaperCss}>
      <Typography>User Profile</Typography>

      <AppAlert
        alert={alert}
        handleAlertOnClose={handleAlertOnClose}
        type={alert?.type}
      />
    </Paper>
  );
}

export default React.memo(AccountsPage);
