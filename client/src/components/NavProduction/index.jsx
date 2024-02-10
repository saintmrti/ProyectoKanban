import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const NavProduction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box>
      <div className="flex mb-2">
        <Button
          variant="contained"
          onClick={() => navigate("/planeacion/programador")}
          sx={{
            background:
              location.pathname != "/planeacion/programador" && "#74A1CD",
            mr: 1,
          }}
        >
          Programador
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/planeacion/produccion")}
          sx={{
            background:
              location.pathname != "/planeacion/produccion" && "#74A1CD",
            mr: 1,
          }}
        >
          Programa Celda
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/planeacion/historico")}
          sx={{
            background:
              location.pathname != "/planeacion/historico" && "#74A1CD",
          }}
        >
          Historico
        </Button>
      </div>
      <Outlet />
    </Box>
  );
};

export default NavProduction;
