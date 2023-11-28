import { Outlet } from "react-router-dom";
// import List from "@mui/material/List";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ListIcon from "@mui/icons-material/List";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import PieChartIcon from "@mui/icons-material/PieChart";
// import FactCheckIcon from "@mui/icons-material/FactCheck";
import Box from "@mui/material/Box";
import Navigation from "../Navegacion";

// import { DrawerHeader, Drawer } from "../Drawer/materialStyled";
// import { ListItem } from "./ListItem";

const NavProduction = () => {
  return (
    <Box>
      {/* <Drawer variant="permanent" open={false}>
        <DrawerHeader />
        <List>
          <ListItem
            label="Dashboard"
            // selected={path === "dashboard"}
            // onClick={() => goTo(`/sobreconsumo/dashboard`)}
          >
            <DashboardIcon />
          </ListItem>
          <ListItem
            label="Tres generaciones"
            // selected={path === "tres-generaciones"}
            // onClick={() => goTo(`/sobreconsumo/tres-generaciones`)}
          >
            <PieChartIcon />
          </ListItem>
          <ListItem
            label="Módulo Estadístico"
            // selected={path === "modulo-estadistico"}
            // onClick={() => goTo(`/sobreconsumo/modulo-estadistico`)}
          >
            <BarChartIcon />
          </ListItem>
          <ListItem
            label="Productos"
            // selected={path === "productos"}
            // onClick={() => goTo(`/sobreconsumo/productos`)}
          >
            <FactCheckIcon />
          </ListItem>
          <ListItem
            label="Compuestos"
            // selected={path === "compuestos"}
            // onClick={() => goTo(`/sobreconsumo/compuestos`)}
          >
            <ListIcon />
          </ListItem>
        </List>
      </Drawer> */}
      <Navigation />
      <Outlet />
    </Box>
  );
};

export default NavProduction;
