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
} from "@mui/material";
import React, { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { AppNavData } from "../data/HeaderData";
import { Close } from "@mui/icons-material";
import useHeader from "../hooks/useHeader";

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { appConnectivity, isLoading } = useHeader();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const getConnectivityText = (appConnectivity) => {
    if (appConnectivity === "pong") return "ONLINE";
    return "Offline";
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
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", rowGap: 1 }}>
              <Box component="div" sx={{ maxWidth: "5rem", maxHeight: "5rem" }}>
                <Box
                  component="img"
                  src="/logo.png"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "50%",
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h4"
                  component="span"
                  sx={{ fontWeight: 700, lineHeight: 1.2, mt: 2 }}
                >
                  Job Notifier
                </Typography>

                <Typography
                  variant="caption"
                  color="secondary"
                  sx={{
                    fontWeight: 500,
                    maxWidth: "200px",
                  }}
                >
                  your one-stop solution for government and private job updates
                </Typography>
              </Box>
            </Box>

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
                  >
                    {element.name}
                  </Button>
                ))}
              </Stack>
            )}
          </Toolbar>

          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              Connectivity:{" "}
              {isLoading
                ? "Ensuring Connectivity..."
                : getConnectivityText(appConnectivity)}
            </Typography>
          </Box>
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
