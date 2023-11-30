import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import AddIcon from "@mui/icons-material/Add";

import { fetchRequirementRequest } from "../../slices/requirement";
import { getRequirement } from "../../selectors/requirement";
import ProgrammerTable from "./ProgrammerTable";
import AlertDialog from "../Dialog/AlertDialog";
import CloseIcon from "@mui/icons-material/Close";
import WeeklyInventory from "./WeeklyInventory";

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
  const [openDialog, setOpenDialog] = useState(false);
  const [realPlan, setRealPlan] = useState(null);

  // const { data: sliced } = useSelector((state) => state.sliced);

  const handleOnClick = () => {
    setOpen(!open);
  };

  const { list: requirements, filteredByFamily1 } = useSelector(getRequirement);

  useEffect(() => {
    dispatch(fetchRequirementRequest());
  }, [dispatch]);

  return (
    <>
      {!open ? (
        <Box sx={{ position: "fixed", mt: 3, right: "1rem", top: "7rem" }}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 3, right: 3 }}
            icon={<AddIcon onClick={handleOnClick} />}
          ></SpeedDial>
        </Box>
      ) : (
        <>
          <CloseIcon
            sx={{ position: "absolute", top: 84, right: 20 }}
            fontSize="medium"
            onClick={() => setOpen(!open)}
          />
          <WeeklyInventory />
        </>
      )}
      {console.log(filteredByFamily1)}
      <AlertDialog
        dataInicial={dataInicial}
        openDialog={openDialog}
        setOpen={setOpenDialog}
        open={openDialog}
        realPlan={realPlan}
      />
      <ProgrammerTable
        list={requirements}
        setRealPlan={setRealPlan}
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
      />
      {/* {open && (
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
        </Box>
      )} */}
    </>
  );
};

export default Programmer;
