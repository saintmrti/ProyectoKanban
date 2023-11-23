// import { useState } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TimelineIcon from "@mui/icons-material/Timeline";
import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";

import ListExpand from "../ListExpand";
import { DrawerHeader, Drawer } from "./materialStyled";
import { useTheme } from "@mui/material/styles";

export default function DrawerOld({ open, setOpen }) {
  const theme = useTheme();
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Drawer variant="permanent" anchor="left" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Indicadores" />
        </ListItemButton>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListExpand open={open} />
        </ListItem>
        <ListItemButton>
          <ListItemIcon>
            <ViewInArRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Capacidad" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <BusinessRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Operaciones" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
