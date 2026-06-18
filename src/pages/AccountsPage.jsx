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
} from "@mui/material";
import { AccountCircle, Create, Login } from "@mui/icons-material";

function AccountsPage() {
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
          sx={{ my: 2, fontWeight: 700, textTransform: "uppercase" }}
        >
          Job Notifier SSO
        </Typography>

        <TextField
          label="Your username"
          placeholder="manish6099"
          fullWidth
          helperText="Please enter your username here."
          sx={{ mb: 2 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle fontSize="large" />
                </InputAdornment>
              ),
            },
          }}
          autoFocus
        />

        <TextField
          label="Your password"
          placeholder="Ex:- password@123"
          fullWidth
          helperText="Please enter your password here."
          sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
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
          <Typography variant="caption">Forgot your password?</Typography>
        </Box>

        <Button
          variant="contained"
          color="success"
          startIcon={<Login />}
          sx={{ mb: 2 }}
        >
          Login
        </Button>

        <Box sx={{ width: "100%", my: 2 }}>
          <Divider>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontWeight: 500 }}
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
          <Button variant="contained" color="success" startIcon={<Create />}>
            Register yourself
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default React.memo(AccountsPage);
