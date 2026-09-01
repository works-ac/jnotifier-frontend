import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  useTheme,
  Box,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material";
import { Cancel, Edit, Save } from "@mui/icons-material";
import Heading from "./Heading";
import useAppAlert from "../hooks/useAppAlert";
import AppAlert from "./AppAlert";
import ConfirmationDialog from "./ConfirmationDialog";
import { editUserProfile } from "../services/AccountsService";

function EditProfileDialog({ open, onClose, profile, onProfileUpdated }) {
  const theme = useTheme();
  const { alert, showErrorMsg, handleAlertOnClose } = useAppAlert();

  const [formData, setFormData] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open && profile) {
      let formattedDob = "";
      if (profile.dob) {
        let parts = profile.dob.split("/");
        if (parts.length === 3) {
          formattedDob = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      }
      setFormData({
        username: profile.username || "",
        fullname: profile.fullName || "",
        mobile: profile.mobile || "",
        dob: formattedDob,
        gender: profile.gender || "M",
        category: profile.category || "GEN",
        isPwd: profile.isPwd === "true" || profile.isPwd === true,
      });
      handleAlertOnClose();
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setConfirmOpen(false);
    setIsSubmitting(true);
    try {
      await editUserProfile({
        username: formData.username,
        fullname: formData.fullname,
        mobile: formData.mobile,
        dob: formData.dob,
        gender: formData.gender,
        category: formData.category,
        isPwd: formData.isPwd,
      });
      onProfileUpdated();
    } catch (error) {
      showErrorMsg(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => !isSubmitting && onClose()}
        fullWidth
        maxWidth="sm"
        disableEscapeKeyDown
      >
        <DialogTitle
          sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
        >
          <Heading
            Icon={Edit}
            color={theme.palette.primary.main}
            iconColor={theme.palette.warning.main}
            text="Edit Profile"
            mb={0}
            hideAnimation={false}
          />
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <AppAlert
            alert={alert}
            handleAlertOnClose={handleAlertOnClose}
            type={alert?.type}
          />
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <TextField
              label="Username"
              name="username"
              value={formData.username || ""}
              disabled
              fullWidth
            />

            <TextField
              label="Full Name"
              name="fullname"
              value={formData.fullname || ""}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Mobile"
              name="mobile"
              value={formData.mobile || ""}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="D.O.B"
              type="date"
              name="dob"
              value={formData.dob || ""}
              disabled
              fullWidth
              helperText="Date of birth is non-editable."
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Gender"
              name="gender"
              select
              value={formData.gender || "M"}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
              <MenuItem value="T">Transgender</MenuItem>
            </TextField>

            <TextField
              label="Category"
              name="category"
              select
              value={formData.category || "GEN"}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="GEN">General (GEN)</MenuItem>
              <MenuItem value="EWS">EWS</MenuItem>
              <MenuItem value="OBC">OBC</MenuItem>
              <MenuItem value="SC">SC</MenuItem>
              <MenuItem value="ST">ST</MenuItem>
            </TextField>

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isPwd || false}
                  onChange={handleChange}
                  name="isPwd"
                />
              }
              label="Is Physically Disabled?"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            startIcon={<Cancel />}
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={
              isSubmitting ? (
                <CircularProgress color="secondary" size={16} />
              ) : (
                <Edit />
              )
            }
            onClick={handleSubmitClick}
            disabled={isSubmitting}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationDialog
        open={confirmOpen}
        heading="Confirm Update"
        Icon={Edit}
        text="Are you sure you want to update your profile?"
        isLoading={false}
        onSuccess={handleConfirmSubmit}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}

export default React.memo(EditProfileDialog);
