import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import BusinessIcon from "@mui/icons-material/Business";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import { router } from "../../routes";
import logo from "../../../assets/img/logo.png";
import { TooltipWrapper } from "../TooltipWrapper";
import { indicadores, operacion, proyectos } from "./catalog";
import { Typography } from "@mui/material";

export default function DrawerContent({ setOpen, open }) {
  const [openItems, setOpenItems] = useState([]);

  const handleCollapse = (index) => {
    const isOpen = openItems.includes(index);
    if (isOpen) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
      setOpen(true);
    }
  };

  const haddleClose = (path) => {
    router.navigate(path);
    setOpen(false);
  };

  return (
    <List>
      <ListItem>
        <Box
          component="img"
          sx={{ width: 100, mr: 1, verticalAlign: "middle" }}
          alt="viakable_logo"
          src={logo}
        />
        <Typography variant="h6" sx={{ verticalAlign: "middle" }}>
          Bienvenido
        </Typography>
      </ListItem>
      <ListItem key="inicio" disablePadding sx={{ display: "block" }}>
        <TooltipWrapper open={open} title="Inicio">
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: "initial",
              px: 2.5,
            }}
            // selected={pathname.split("/")[2] === inicio}
            onClick={() => haddleClose("/")}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </TooltipWrapper>
      </ListItem>
      <ListItem disablePadding sx={{ display: "block" }}>
        <TooltipWrapper open={open} title="Indicadores">
          <ListItemButton
            onClick={() => handleCollapse(0)}
            sx={{
              minHeight: 48,
              justifyContent: "initial",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 3,
                justifyContent: "center",
              }}
            >
              <ContentPasteIcon />
            </ListItemIcon>
            <ListItemText primary="Indicadores" sx={{ opacity: 1 }} />
            {openItems.includes(0) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </TooltipWrapper>
      </ListItem>
      <Collapse in={openItems.includes(0)}>
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <Tooltip title="Kanban" disableHoverListener={open}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                }}
                // selected={pathname.split("/")[2] === "kanban"}
                onClick={() =>
                  (window.location.href =
                    "https://qualtia-kanban.azurewebsites.net/kanban")
                }
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                  }}
                >
                  <Icon fontSize="small" sx={{ height: "30px", width: "30px" }}>
                    timeline
                  </Icon>
                </ListItemIcon>
                <ListItemText primary="Kanban" />
              </ListItemButton>
            </Tooltip>
          </ListItem>
          {indicadores.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Tooltip title={item.name} disableHoverListener={open}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                  }}
                  // selected={pathname.split("/")[2] === item.path}
                  onClick={() => haddleClose(item.link)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                    }}
                  >
                    <Icon
                      fontSize="small"
                      sx={{ height: "30px", width: "30px" }}
                    >
                      {item.icon}
                    </Icon>
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: 1 }} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Collapse>
      <ListItem disablePadding sx={{ display: "block" }}>
        <TooltipWrapper open={open} title="Operación Digital">
          <ListItemButton
            onClick={() => handleCollapse(1)}
            sx={{
              minHeight: 48,
              justifyContent: "initial",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 3,
                justifyContent: "center",
              }}
            >
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Operación Digital" sx={{ opacity: 1 }} />
            {openItems.includes(1) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </TooltipWrapper>
      </ListItem>
      <Collapse in={openItems.includes(1)}>
        <List>
          {operacion.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Tooltip title={item.name} disableHoverListener={open}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                  }}
                  // selected={parseInt(pathname.split("/")[3]) === item.idUEN}
                  onClick={() => haddleClose(item.link)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                    }}
                  >
                    <Icon
                      fontSize="small"
                      sx={{
                        height: "20px",
                        width: "30px",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                      }}
                    >
                      {item.acronimo}
                    </Icon>
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: 1 }} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Collapse>
      <ListItem disablePadding sx={{ display: "block" }}>
        <TooltipWrapper open={open} title="Proyectos">
          <ListItemButton
            onClick={() => handleCollapse(2)}
            sx={{
              minHeight: 48,
              justifyContent: "initial",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 3,
                justifyContent: "center",
              }}
            >
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Proyectos" sx={{ opacity: 1 }} />
            {openItems.includes(2) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </TooltipWrapper>
      </ListItem>
      <Collapse in={openItems.includes(2)}>
        <List>
          {proyectos.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Tooltip title={item.name} disableHoverListener={open}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                  }}
                  onClick={() => haddleClose(item.link)}
                  // selected={pathname.split("/")[1] === item.path}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                    }}
                  >
                    <Icon
                      fontSize="small"
                      sx={{ height: "30px", width: "30px" }}
                    >
                      {item.icon}
                    </Icon>
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: 1 }} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
