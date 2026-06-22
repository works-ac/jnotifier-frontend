import React from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import useAccounts from "../hooks/useAccounts";
import useAppCss from "../hooks/useAppCss";
import { useSelector } from "react-redux";
import AppAlert from "../components/AppAlert";
import CircluarProgressLoader from "../components/CircluarProgressLoader";
import { AppConstants } from "../app/AppConstants";
import Login from "../views/Login";
import { Logout } from "@mui/icons-material";

function AccountsPage() {
  const { alert, handleAlertOnClose, isLoading, isProfileLoading, profile } =
    useAccounts();
  const { GlobalPaperCss } = useAppCss();
  const { userAuthStatus } = useSelector((state) => state.auth);

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
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        User Profile
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <AppAlert
        alert={alert}
        handleAlertOnClose={handleAlertOnClose}
        type={alert?.type}
      />

      {isProfileLoading && (
        <CircluarProgressLoader text="We're loading your profile please wait..." />
      )}

      <Box component="div" sx={{ my: 2 }}>
        <TextField
          value={profile?.fullName}
          disabled
          fullWidth
          sx={{ mb: 2 }}
          label="Name"
        />

        <TextField
          value={profile?.email}
          disabled
          fullWidth
          sx={{ mb: 2 }}
          label="Email"
        />

        <TextField
          value={profile?.category}
          disabled
          fullWidth
          sx={{ mb: 2 }}
          label="Category"
        />

        <TextField
          value={profile?.dob}
          disabled
          fullWidth
          sx={{ mb: 2 }}
          label="D.O.B"
        />

        <TextField
          value={profile?.gender}
          disabled
          fullWidth
          sx={{ mb: 2 }}
          label="Gender"
        />
      </Box>

      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          color="error"
          startIcon={<Logout fontSize="small" />}
        >
          Logout
        </Button>
      </Box>
    </Paper>
  );
}

export default React.memo(AccountsPage);
