import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { Close, OpenInNew } from "@mui/icons-material";

export default function OpenInAppBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem("open_in_app_banner_dismissed") === "true";
    } catch {
      return false;
    }
  });

  const isInstalled = useSelector((state) => state.pwa?.isInstalled);

  if (dismissed) {
    return null;
  }

  const isStandalone =
    typeof window !== "undefined" &&
    (window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true);

  if (isStandalone) {
    return null;
  }

  const isWhatsApp =
    typeof navigator !== "undefined" && /WhatsApp/i.test(navigator.userAgent);
  const hasReferrer =
    typeof document !== "undefined" &&
    document.referrer &&
    document.referrer.toLowerCase().includes("whatsapp");

  const shouldShow = isInstalled || isWhatsApp || hasReferrer;

  if (!shouldShow) {
    return null;
  }

  const handleClose = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("open_in_app_banner_dismissed", "true");
    } catch (e) {
      console.error("Failed to set dismissal in sessionStorage", e);
    }
  };

  const handleOpenApp = () => {
    const currentUrl = window.location.href;
    // On Android, navigating to the URL triggers the OS / Chrome PWA link handler
    window.location.href = currentUrl;
  };

  return (
    <Box
      sx={{
        backgroundColor: "primary.dark",
        color: "primary.contrastText",
        px: { xs: 1.5, sm: 2 },
        py: 0.75,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
        zIndex: 1100,
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ overflow: "hidden" }}>
        <Box
          component="img"
          src="/logo.png"
          alt="Job Notifier Logo"
          sx={{ width: 28, height: 28, borderRadius: 1, objectFit: "cover" }}
        />
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Have the Job Notifier app installed?
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          variant="contained"
          color="secondary"
          size="small"
          endIcon={<OpenInNew sx={{ fontSize: 16 }} />}
          onClick={handleOpenApp}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            px: 1.5,
            py: 0.25,
            borderRadius: 1.5,
            fontSize: "0.8rem",
            whiteSpace: "nowrap",
          }}
        >
          Open in App
        </Button>

        <IconButton
          size="small"
          onClick={handleClose}
          sx={{ color: "white", p: 0.5 }}
          aria-label="Dismiss banner"
        >
          <Close sx={{ fontSize: 18 }} />
        </IconButton>
      </Stack>
    </Box>
  );
}
