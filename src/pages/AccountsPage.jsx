import React from "react";
import Captcha from "../components/Captcha";
import {
  Box,
  Button,
  Container,
  Divider,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AccountCircle,
  Create,
  Login,
  Password,
  Security,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import useLogin from "../hooks/useLogin";
import Notes from "../components/Notes";
import useAppCss from "../hooks/useAppCss";

function AccountsPage() {
  const theme = useTheme();
  const { isPwdVisible, togglePwdVisibility, textfieldType } = useLogin();
  const { RequiredFieldCss } = useAppCss();

  return (
    <Container maxWidth="md" sx={{ mx: "auto" }}>
      <Paper
        variant="elevation"
        elevation={4}
        sx={(theme) => ({
          padding: { xs: "1.5rem", md: "2.5rem" },
          borderRadius: "16px",
          width: "100%",
          border: `1px solid ${theme.palette.secondary["50"]}`,
        })}
      >
        <Typography
          variant="h2"
          sx={{
            my: 2,
            mb: 4,
            fontWeight: 700,
            textTransform: "uppercase",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          }}
          color="primary"
        >
          Job Notifier SSO
        </Typography>

        <TextField
          label="Your username"
          placeholder="manish6099"
          fullWidth
          helperText="Please enter your username here."
          sx={{ mb: 2, ...RequiredFieldCss }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle fontSize="large" color="primary" />
              </InputAdornment>
            ),
          }}
          required
          type="text"
          autoFocus
        />

        <TextField
          label="Your password"
          placeholder="Ex:- password@123"
          fullWidth
          helperText="Please enter your password here."
          sx={{ mb: 2, ...RequiredFieldCss }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Password fontSize="large" color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" onClick={togglePwdVisibility}>
                {isPwdVisible ? (
                  <VisibilityOff fontSize="large" color="success" />
                ) : (
                  <Visibility fontSize="large" color="success" />
                )}
              </InputAdornment>
            ),
          }}
          required
          type={textfieldType}
        />

        <Box
          component="div"
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Captcha />

          <TextField
            label="Your Captcha"
            placeholder="Ex:- edh26w"
            fullWidth
            helperText="Please enter your captcha text here."
            sx={{ mb: 2, ...RequiredFieldCss }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Security fontSize="large" color="primary" />
                </InputAdornment>
              ),
            }}
            required
            type="text"
          />
        </Box>

        <Box
          component="div"
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="text" startIcon={<Password fontSize="large" />}>
            Forgot your password?
          </Button>
        </Box>

        <Button
          variant="contained"
          color="success"
          startIcon={<Login />}
          sx={{ mb: 2 }}
        >
          Login
        </Button>

        <Notes
          note="All fields marked with asterisk (*) are mandatory to fill."
          noteColor={theme.palette.secondary.main}
        />

        <Box sx={{ width: "100%", my: 2 }}>
          <Divider>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontWeight: 700 }}
            >
              OR
            </Typography>
          </Divider>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            startIcon={<Create />}
            href="/register"
          >
            Register yourself
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default React.memo(AccountsPage);
