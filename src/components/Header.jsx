import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { AppNavData } from "../data/HeaderData";
import { Close } from "@mui/icons-material";
import useHeader from "../hooks/useHeader";
import FlexBox from "./styled/FlexBox";

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { appConnectivity, isLoading } = useHeader();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const getConnectivityText = (appConnectivity) => {
    if (appConnectivity?.toLowerCase() === "pong") return "ONLINE";
    return "OFFLINE";
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid",
          borderColor: "divider",
          color: "text.primary",
          overflow: "visible",
        }}
      >
        {!isLoading && (
          <Tooltip
            title={
              getConnectivityText(appConnectivity) === "ONLINE"
                ? "The server is healthy and up and running."
                : "Server Offline"
            }
            placement="left"
            arrow
          >
            <Box
              sx={{
                position: "absolute",
                top: { xs: 6, sm: 8 },
                right: { xs: 8, sm: 12 },
                width: { xs: 8, sm: 10, md: 12 },
                height: { xs: 8, sm: 10, md: 12 },
                borderRadius: "50%",
                bgcolor:
                  getConnectivityText(appConnectivity) === "ONLINE"
                    ? "#22c55e"
                    : "#ef4444",
                boxShadow:
                  getConnectivityText(appConnectivity) === "ONLINE"
                    ? "0 0 0 0 rgba(34, 197, 94, 0.7)"
                    : "none",
                animation:
                  getConnectivityText(appConnectivity) === "ONLINE"
                    ? "ping 1.4s ease-in-out infinite"
                    : "none",
                "@keyframes ping": {
                  "0%": {
                    boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.7)",
                  },
                  "70%": {
                    boxShadow: "0 0 0 6px rgba(34, 197, 94, 0)",
                  },
                  "100%": {
                    boxShadow: "0 0 0 0 rgba(34, 197, 94, 0)",
                  },
                },
                cursor: "pointer",
                zIndex: 10,
              }}
            />
          </Tooltip>
        )}

        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Box
              component="img"
              src="/logo.png"
              alt="Job Notifier Logo"
              sx={{
                width: { xs: "5rem", sm: "7rem", md: "7rem" },
                height: { xs: "5rem", sm: "7rem", md: "7rem" },
                objectFit: "cover",
                imageRendering: "auto",
                display: "block",
                background: "none",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => (window.location.href = "/")}
            />

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                {mobileOpen ? <Close /> : <DragHandleIcon />}
              </IconButton>
            ) : (
              <Stack direction="row" spacing={1}>
                {AppNavData.map((element) => (
                  <Button
                    component={RouterLink}
                    to={element.href}
                    end
                    color={element.color}
                    key={element.id}
                    sx={{
                      "&.active": {
                        bgcolor: "warning.main",
                        color: "white",
                      },
                    }}
                    startIcon={<element.icon fontSize="small" />}
                  >
                    {element.name}
                  </Button>
                ))}
              </Stack>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          <Toolbar sx={{ my: 2 }} />
          {/* <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", py: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Job Notifier
            </Typography>
          </Box> */}

          <List>
            {AppNavData.map((element) => (
              <ListItem key={element.id} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={element.href}
                  end
                  sx={{
                    textAlign: "center",
                    "&.active": {
                      bgcolor: "warning.main",
                      color: "white",
                    },
                  }}
                >
                  <ListItemText primary={element.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
}

export default React.memo(Header);
