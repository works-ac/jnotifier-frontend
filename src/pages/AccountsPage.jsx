import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import useAccounts from "../hooks/useAccounts";
import useAppCss from "../hooks/useAppCss";
import { useSelector } from "react-redux";
import AppAlert from "../components/AppAlert";
import CircluarProgressLoader from "../components/CircluarProgressLoader";
import { AppConstants } from "../app/AppConstants";
import Login from "../views/Login";
import { Logout, Person, Work, ArrowBack } from "@mui/icons-material";
import ConfirmationDialog from "../components/ConfirmationDialog";
import EditProfileDialog from "../components/EditProfileDialog";
import AppliedJobsList from "../components/AppliedJobsList";
import ProfileView from "../views/ProfileView";
import useSEO from "../hooks/useSEO";

function AccountsPage() {
  useSEO({
    title: "My Account | Job Notifier",
    canonicalPath: "/account",
    noindex: true,
  });

  const [activeTab, setActiveTab] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const theme = useTheme();
  const {
    alert,
    handleAlertOnClose,
    isLoading,
    isProfileLoading,
    profile,
    handleLogout,
    isLoggingOut,
    loadProfile,
  } = useAccounts();
  const { GlobalPaperCss, GlobalAccordianCss } = useAppCss();
  const { userAuthStatus } = useSelector((state) => state.auth);

  if (isLoading)
    return (
      <CircluarProgressLoader
        text="We're checking your authentication status, please wait..."
        takeHeight
      />
    );

  if (
    userAuthStatus &&
    userAuthStatus.trim().toLowerCase() !== AppConstants.USER_AUTH_STATUS
  )
    return <Login />;

  return (
    <Container maxWidth="lg" sx={{ mx: "auto" }}>
      {activeTab === null ? (
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={5}>
            <Card
              variant="elevation"
              elevation={4}
              sx={{
                cursor: "pointer",
                textAlign: "center",
                py: 4,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[8],
                },
                width: "100%",
              }}
              onClick={() => setActiveTab("profile")}
            >
              <CardContent>
                <Person
                  sx={{
                    fontSize: 80,
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                />

                <Typography variant="h5" color="primary" fontWeight="bold">
                  Profile
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Manage your personal details and account settings
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <Card
              variant="elevation"
              elevation={4}
              sx={{
                cursor: "pointer",
                textAlign: "center",
                py: 4,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[8],
                },
              }}
              onClick={() => setActiveTab("applied-jobs")}
            >
              <CardContent>
                <Work
                  sx={{
                    fontSize: 80,
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                />
                <Typography variant="h5" color="primary" fontWeight="bold">
                  Applied Jobs
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  View all the job vacancies you have applied for
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Box>
          <Button
            variant="outlined"
            onClick={() => setActiveTab(null)}
            startIcon={<ArrowBack fontSize="small" />}
            sx={{ mb: 2 }}
          >
            Back to Menu
          </Button>

          <Paper variant="elevation" elevation={4} sx={GlobalPaperCss}>
            {activeTab === "profile" ? (
              <ProfileView
                profile={profile}
                isProfileLoading={isProfileLoading}
                alert={alert}
                handleAlertOnClose={handleAlertOnClose}
                setEditDialogOpen={setEditDialogOpen}
                setLogoutDialogOpen={setLogoutDialogOpen}
                isLoggingOut={isLoggingOut}
              />
            ) : (
              <AppliedJobsList />
            )}
          </Paper>
        </Box>
      )}

      <ConfirmationDialog
        open={logoutDialogOpen}
        heading="Confirm Logout"
        Icon={Logout}
        text="Are you sure you want to logout?"
        isLoading={isLoggingOut}
        onSuccess={() => {
          setLogoutDialogOpen(false);
          handleLogout();
        }}
        onCancel={() => setLogoutDialogOpen(false)}
      />

      <EditProfileDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        profile={profile}
        onProfileUpdated={() => {
          setEditDialogOpen(false);
          loadProfile();
        }}
      />
    </Container>
  );
}

export default React.memo(AccountsPage);
