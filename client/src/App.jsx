import { ThemeProvider } from "@mui/material/styles";
import Highcharts from "highcharts";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import moment from "moment";

import NavBar from "./components/NavBar";
import { DrawerHeader } from "./components/Drawer/materialStyled";
import { Root } from "./components/routes";
import { getTheme } from "./utilities/getTheme";

Highcharts.setOptions({
  time: {
    timezone: "America/Mexico_City",
    useUTC: false,
    moment,
  },
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={getTheme("light")}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <NavBar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              bgcolor: "bgcolor",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <DrawerHeader />
            <Root />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;
