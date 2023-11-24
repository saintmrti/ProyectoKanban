import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import { fetchRequirementsRequest } from "../../slices/requirements";
import { getRequirements } from "../../selectors/requirements";
import ProgrammerTable from "./ProgrammerTable";
import AlertDialog from "../Dialog/AlertDialog";
import CloseIcon from "@mui/icons-material/Close";
import InventoryTable from "./InventoryTable";

const dataInicial = [
  { SKU: "11060", "KG PLAN": 3000, "Break MIN": 2600, "Comida MIN": 0 },
  { SKU: "X050B", "KG PLAN": 5400, "Break MIN": 30, "Comida MIN": 30 },
  { SKU: "X210", "KG PLAN": 5000, "Break MIN": 0, "Comida MIN": 0 },
  { SKU: "10155", "KG PLAN": 5580, "Break MIN": 30, "Comida MIN": 0 },
  { SKU: "X450", "KG PLAN": 870, "Break MIN": 0, "Comida MIN": 30 },
];

const Programmer = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOnClick = () => {
    setOpen(!open);
  };

  const requirements = useSelector(getRequirements);

  useEffect(() => {
    dispatch(fetchRequirementsRequest());
  }, [dispatch]);

  return (
    <>
      <Box>
        <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
          <div className="flex justify-between items-baseline w-full">
            <Typography variant="h6" sx={{ mb: 2 }}>
              Programador
            </Typography>
            <IconButton>
              <AlertDialog dataInicial={dataInicial} />
            </IconButton>
          </div>
          <ProgrammerTable list={requirements} />
        </Paper>
      </Box>
      <Box sx={{ position: "fixed", mt: 3, right: "1rem", bottom: "1rem" }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 3, right: 3 }}
          icon={<AddIcon onClick={handleOnClick} />}
        ></SpeedDial>
      </Box>
      {open && (
        <Box
          sx={{
            position: "fixed",
            mt: 3,
            right: "0.1rem",
            top: "1rem",
            zIndex: 100,
          }}
        >
          <Paper
            sx={{
              width: "320px",
              padding: "10px",
              height: "calc(100vh - 10px)",
            }}
          >
            <CloseIcon
              fontSize="medium"
              sx={{ marginTop: "12%" }}
              onClick={() => setOpen(!open)}
            />
            <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
              Inventario Semanal
            </Typography>
            <InventoryTable />
          </Paper>
          {/*Componente Modal*/}
        </Box>
      )}
    </>
  );
};

export default Programmer;
