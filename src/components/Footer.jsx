import {
  Box,
  IconButton,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import IndianFlag from "../assets/ind-flag.svg";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import useFooter from "../hooks/useFooter";
import AppToolTip from "./core/AppToolTip";
import { Mail } from "@mui/icons-material";
import { AppVariables } from "../app/AppVariables";

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    handleTelegramBtnClick,
    handleWhatsAppBtnClick,
    handleEmailBtnClick,
  } = useFooter();
  const appVersion = AppVariables.APP_VERSION;
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        p: 1.5,
        backgroundColor: (theme) => theme.palette.grey["A100"],
        borderTop: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: isMobile ? "center" : "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box component="div">
          <Typography
            variant="caption"
            sx={{ textAlign: "center", fontWeight: 700 }}
          >
            &copy; {currentYear} Gaurav Sahitya || All rights reserved || v
            {appVersion}
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          sx={{ fontSize: "12px", fontWeight: 700 }}
        >
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </Stack>
      </Stack>

      <Stack direction="row" sx={{ justifyContent: "center" }} spacing={1}>
        <Typography variant="caption" sx={{ fontWeight: 700 }}>
          Made with love in
        </Typography>

        <Box
          component="img"
          src={IndianFlag}
          alt="Indian Flag"
          sx={{ width: 20, height: 20 }}
        />
      </Stack>

      <Stack direction="row" sx={{ justifyContent: "center" }} spacing={1}>
        <AppToolTip title="Follow on WhatsApp">
          <IconButton onClick={handleWhatsAppBtnClick} size="small">
            <WhatsAppIcon fontSize="small" />
          </IconButton>
        </AppToolTip>

        <AppToolTip title="Follow on Telegram">
          <IconButton onClick={handleTelegramBtnClick} size="small">
            <TelegramIcon fontSize="small" />
          </IconButton>
        </AppToolTip>

        <AppToolTip title="Contact via Email">
          <IconButton onClick={handleEmailBtnClick} size="small">
            <Mail fontSize="small" />
          </IconButton>
        </AppToolTip>
      </Stack>
    </Box>
  );
}

export default React.memo(Footer);
