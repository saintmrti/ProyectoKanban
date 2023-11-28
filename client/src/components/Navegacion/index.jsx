// import BottomNavigation from "@mui/material/BottomNavigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useNavigate, useLocation } from "react-router-dom";
//import { Link } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ width: 257, height: "35px", mb: 2 }} elevation={3}>
      {/*<BottomNavigationAction
        label="Programador"
        value="Programador" sx={{height:'30px', background: location.pathname === '/planeacion/programador' && '#E5E7E9'}}/>
        
      <BottomNavigationAction
        label="Produccion"
        value="Programador" sx={{height:'30px', background: location.pathname === '/planeacion/produccion' && '#E5E7E9'}}/>*/}
      <Stack direction="row" spacing={1}>
        {/* <Link to={"/planeacion/programador"}> */}
        <Button
          href="#text-buttons"
          variant="contained"
          onClick={() => navigate("/planeacion/programador")}
          sx={{
            background:
              location.pathname != "/planeacion/programador" && "#74A1CD",
          }}
        >
          Programador
        </Button>
        {/* </Link> */}
        {/* <Link to={"/planeacion/produccion"}> */}
        <Button
          href="#text-buttons"
          variant="contained"
          onClick={() => navigate("/planeacion/produccion")}
          sx={{
            background:
              location.pathname != "/planeacion/produccion" && "#74A1CD",
          }}
        >
          Produccion
        </Button>
        {/* </Link> */}
      </Stack>
    </Box>
  );
}
