import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Close, GetApp } from "@mui/icons-material";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone mode (installed PWA)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      // Prevent default browser banner to display custom install dialog
      e.preventDefault();
      setDeferredPrompt(e);

      // Check if user has dismissed prompt in current session
      const isDismissed = sessionStorage.getItem("pwa_install_dismissed");
      if (!isDismissed) {
        setOpen(true);
      }
    };

    const handleAppInstalled = () => {
      setOpen(false);
      setDeferredPrompt(null);
      sessionStorage.removeItem("pwa_install_dismissed");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }
    // Show the native browser install prompt
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      setOpen(false);
    }
    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("pwa_install_dismissed", "true");
  };

  if (!open || !deferredPrompt) {
    return null;
  }

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      disableEscapeKeyDown
      onClose={(event, reason) => {
        // Block all closing methods (backdrop click, escape key, etc.) except the close button
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
          return;
        }
      }}
      aria-labelledby="pwa-install-dialog-title"
      aria-describedby="pwa-install-dialog-description"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: { xs: 1.5, sm: 2.5 },
            position: "relative",
          },
        },
      }}
    >
      {/* Top right close icon button */}
      <IconButton
        aria-label="Close install prompt"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: { xs: 12, sm: 16 },
          top: { xs: 12, sm: 16 },
          color: (theme) => theme.palette.grey[500],
          zIndex: 1,
        }}
      >
        <Close />
      </IconButton>

      {/* Dialog Title / Header */}
      <DialogTitle id="pwa-install-dialog-title" sx={{ pr: 6, pb: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            component="img"
            src="/logo.png"
            alt="Job Notifier App Icon"
            sx={{
              width: { xs: 52, sm: 64 },
              height: { xs: 52, sm: 64 },
              borderRadius: 2.5,
              objectFit: "cover",
              flexShrink: 0,
              boxShadow: 2,
            }}
          />
          <Box>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: 700 }}
              color="primary"
            >
              Install Job Notifier App
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Application for Government & Private Job Updates
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent id="pwa-install-dialog-description" sx={{ py: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, mb: 1 }}
          color="text.primary"
        >
          Get instant job alerts directly from your home screen.
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1.5, lineHeight: 1.7 }}
        >
          Installing the Job Notifier app provides a faster, full-screen
          experience with instant access to the latest government vacancies,
          Sarkari Naukri updates, examination notices, and private job
          notifications across India.
        </Typography>
      </DialogContent>

      {/* Bottom right install button */}
      <DialogActions sx={{ px: 3, pb: 2, justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<GetApp fontSize="small" />}
          onClick={handleInstallClick}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            px: 3,
            py: 1,
            borderRadius: 2,
            fontSize: "0.95rem",
          }}
        >
          Install
        </Button>
      </DialogActions>
    </Dialog>
  );
}
