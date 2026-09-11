import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PWAInstallPrompt from "../components/PWAInstallPrompt";
import OpenInAppBanner from "../components/OpenInAppBanner";

export default function AppLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <OpenInAppBanner />
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="xl" sx={{ mx: "auto" }}>
          <Outlet />
        </Container>
      </Box>

      <Footer />

      <PWAInstallPrompt />
    </Box>
  );
}
