import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { router } from "../routes";
import Drawer from "../Drawer";
import logo from "../../assets/img/qualtia_logo.gif";
import ExitToApp from "@mui/icons-material/ExitToApp";
import Tooltip from "@mui/material/Tooltip";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              // ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ width: 100, mr: "auto" }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ color: "white" }}
              onClick={() => router.navigate("/")}
            >
              INICIO
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
            <Tooltip title="Notificaciones">
              <IconButton
                size="large"
                sx={{ color: "white" }}
                onClick={(f) => f}
              >
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Configuración">
              <IconButton
                size="large"
                sx={{ color: "white" }}
                onClick={(f) => f}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Salir">
              <IconButton
                size="small"
                sx={{ color: "white" }}
                onClick={(f) => f}
              >
                <ExitToApp />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={open} setOpen={setOpen} />
    </>
  );
}
