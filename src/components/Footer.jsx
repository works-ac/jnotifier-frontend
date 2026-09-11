import {
  Box,
  Container,
  IconButton,
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

function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    handleTelegramBtnClick,
    handleWhatsAppBtnClick,
    handleEmailBtnClick,
  } = useFooter();
  const appVersion = import.meta.env.VITE_APP_VERSION || "0.0.0";

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.grey["A100"],
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Box
          component="div"
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Box
            component="div"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ fontWeight: 700 }}
            >
              Made in India
            </Typography>

            <Box
              component="img"
              src={IndianFlag}
              alt="Indian Flag"
              width={16}
              height={16}
            ></Box>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ fontWeight: 700 }}
          >
            &copy; 2026 Gaurav Sahitya
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ fontWeight: 700 }}
          >
            All Rights are reserved
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ fontWeight: 700 }}
          >
            v{appVersion}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ fontWeight: 700 }}
        >
          Design developed and maintained by Gaurav Sahitya
        </Typography>

        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppToolTip title="Follow us on WhatsApp" placement="top">
            <IconButton onClick={handleWhatsAppBtnClick}>
              <WhatsAppIcon sx={{ fontSize: "24px" }} />
            </IconButton>
          </AppToolTip>

          <AppToolTip title="Follow us on Telegram" placement="top">
            <IconButton onClick={handleTelegramBtnClick}>
              <TelegramIcon sx={{ fontSize: "24px" }} />
            </IconButton>
          </AppToolTip>

          <AppToolTip title="Send us an email" placement="top">
            <IconButton onClick={handleEmailBtnClick}>
              <Mail sx={{ fontSize: "24px" }} />
            </IconButton>
          </AppToolTip>
        </Box>
      </Container>
    </Box>
  );
}

export default React.memo(Footer);
