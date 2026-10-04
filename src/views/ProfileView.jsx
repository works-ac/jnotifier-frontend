import React from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AlternateEmail,
  Cake,
  Category,
  Edit,
  ExpandMore,
  Logout,
  Male,
  Person,
  Phone,
} from "@mui/icons-material";
import AppAlert from "../components/AppAlert";
import CircluarProgressLoader from "../components/CircluarProgressLoader";
import Heading from "../components/Heading";
import Notes from "../components/Notes";
import { getInitials } from "../helpers";
import { AppConstants } from "../app/AppConstants";
import useAppCss from "../hooks/useAppCss";

function ProfileView({
  profile,
  isProfileLoading,
  alert,
  handleAlertOnClose,
  setEditDialogOpen,
  setLogoutDialogOpen,
  isLoggingOut
}) {
  const theme = useTheme();
  const { GlobalAccordianCss } = useAppCss();

  return (
    <>
      <Heading
        Icon={Person}
        color={theme.palette.primary.main}
        iconColor={theme.palette.warning.main}
        text="User Profile"
        mb={0}
      />
      <Divider sx={{ my: 2 }} />
      <AppAlert alert={alert} handleAlertOnClose={handleAlertOnClose} type={alert?.type} />
      {isProfileLoading && (
        <CircluarProgressLoader text="We're loading your profile please wait..." />
      )}
      {!isProfileLoading && profile && (
        <>
          <Box component="div" sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <Avatar sx={{ backgroundColor: theme.palette.warning.main, p: 5, my: 2, fontWeight: 700, fontSize: "2rem" }}>
                {getInitials(profile.fullName)}
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                {profile?.fullName?.toWellFormed()?.toUpperCase() ?? ""}
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Accordion sx={GlobalAccordianCss}>
              <AccordionSummary aria-controls="basic-info-content" id="basic-info-header" expandIcon={<ExpandMore fontSize="small" />}>
                <Typography variant="h6" sx={{ textTransform: "uppercase", fontWeight: 700, color: theme.palette.primary.A700 }}>
                  Basic Info
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField value={profile?.username} disabled fullWidth sx={{ mb: 2 }} label="Username" slotProps={{ input: { startAdornment: <InputAdornment><Person fontSize="small" color="secondary" sx={{ mr: 1 }} /></InputAdornment> } }} />
                <TextField value={profile?.email} disabled fullWidth sx={{ mb: 2 }} label="Email" slotProps={{ input: { startAdornment: <InputAdornment><AlternateEmail fontSize="small" color="secondary" sx={{ mr: 1 }} /></InputAdornment> } }} />
                <TextField value={profile?.mobile || "Not Available"} disabled fullWidth sx={{ mb: 2 }} label="Mobile" slotProps={{ input: { startAdornment: <InputAdornment><Phone fontSize="small" color="secondary" sx={{ mr: 1 }} /></InputAdornment> } }} />
                <TextField value={profile?.category} disabled fullWidth sx={{ mb: 2 }} label="Category" slotProps={{ input: { startAdornment: <InputAdornment><Category fontSize="small" color="secondary" sx={{ mr: 1 }} /></InputAdornment> } }} />
                <TextField value={profile?.dob} disabled fullWidth sx={{ mb: 2 }} label="D.O.B" slotProps={{ input: { startAdornment: <InputAdornment><Cake fontSize="small" color="secondary" sx={{ mr: 1 }} /></InputAdornment> } }} />
                <TextField value={profile?.gender === "M" ? "Male" : "Female"} disabled fullWidth sx={{ mb: 2 }} label="Gender" slotProps={{ input: { startAdornment: <InputAdornment><Male fontSize="small" color="secondary" sx={{ mr: 1 }} /></InputAdornment> } }} />
              </AccordionDetails>
            </Accordion>
            <Accordion sx={GlobalAccordianCss}>
              <AccordionSummary aria-controls="disability-info-content" id="disability-info-header" expandIcon={<ExpandMore fontSize="small" />}>
                <Typography variant="h6" sx={{ textTransform: "uppercase", fontWeight: 700, color: theme.palette.primary.A700 }}>
                  Disability Info
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {profile.isPwd === "false" && (
                  <Typography variant="body1" color="secondary" sx={{ textAlign: "justify" }}>
                    {AppConstants.NON_DISABLE_TEXT}
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
          <Notes note="Candidates having more than 40% disability are considered to be physically challenged people." noteColor={theme.palette.secondary.main} />
          <Notes note="Sensitive information like passwords etc are not displayed here due to security reasons." noteColor={theme.palette.secondary.main} />
          <Notes note="Date of birth is non-editable." noteColor={theme.palette.secondary.main} />
          <Box component="div" sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1 }}>
            <Button variant="contained" color="success" startIcon={<Edit fontSize="small" />} onClick={() => setEditDialogOpen(true)}>Edit</Button>
            <Button variant="outlined" color="error" startIcon={<Logout fontSize="small" />} disabled={isLoggingOut} onClick={() => setLogoutDialogOpen(true)}>Logout</Button>
          </Box>
        </>
      )}
    </>
  );
}

ProfileView.propTypes = {
  profile: PropTypes.object,
  isProfileLoading: PropTypes.bool.isRequired,
  alert: PropTypes.object,
  handleAlertOnClose: PropTypes.func.isRequired,
  setEditDialogOpen: PropTypes.func.isRequired,
  setLogoutDialogOpen: PropTypes.func.isRequired,
  isLoggingOut: PropTypes.bool.isRequired,
};

export default React.memo(ProfileView);
