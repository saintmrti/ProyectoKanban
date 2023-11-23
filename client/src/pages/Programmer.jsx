import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import SpeedDial from "@mui/material/SpeedDial";
import AddIcon from "@mui/icons-material/Add";

import { fetchRequirementsRequest } from "../slices/requirements";
import { getRequirements } from "../selectors/requirements";
import ProgrammerTable from "../components/Table/ProgrammerTable";
import DynamicTable from "../components/Table/DynamicTable";

export default function Programmer() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const requirements = useSelector(getRequirements);

  const handleOnClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(fetchRequirementsRequest());
  }, [dispatch]);

  return (
    <>
      <Box>
        <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Programador
          </Typography>

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
            <DynamicTable />
          </Paper>
        </Box>
      )}
    </>
  );
}
