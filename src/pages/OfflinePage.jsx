import { Button, Container, Paper, useTheme } from "@mui/material";
import React, { useCallback } from "react";
import useAppCss from "../hooks/useAppCss";
import ResponsiveImage from "../components/core/ResponsiveImage";
import OfflineImage from "../assets/offline.jpg";
import FlexBox from "../components/styled/FlexBox";
import { Home, WifiOff } from "@mui/icons-material";
import Heading from "../components/Heading";
import useSEO from "../hooks/useSEO";

function OfflinePage() {
  useSEO({
    title: "Offline | Job Notifier",
    canonicalPath: "/offline",
    noindex: true,
  });

  const theme = useTheme();
  const { GlobalPaperCss } = useAppCss();

  const handleGoHomeBtnClick = useCallback(function (e) {
    e.preventDefault();
    globalThis.location.href = "/";
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mx: "auto", my: 2 }}>
      <Paper variant="elevation" elevation={2} sx={GlobalPaperCss}>
        <Heading
          Icon={WifiOff}
          color={theme.palette.error.main}
          iconColor={theme.palette.error.main}
          text="YOU ARE OFFLINE"
        />

        <ResponsiveImage
          alt="Offline"
          src={OfflineImage}
          aspectRatio="1/1"
          caption="We're unable to connect to the server at this time. Please try again later."
        />

        <FlexBox
          sx={{ my: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<Home fontSize="small" />}
            onClick={handleGoHomeBtnClick}
            type="button"
          >
            Go Home
          </Button>
        </FlexBox>
      </Paper>
    </Container>
  );
}

export default React.memo(OfflinePage);
