import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import AddIcon from "@mui/icons-material/Add";

import { fetchRequirementRequest } from "../../slices/requirement";
import { fetchSlicedRequest } from "../../slices/sliced";
import { getRequirement } from "../../selectors/requirement";
import ProgrammerTable from "./ProgrammerTable";
import AlertDialog from "./Dialog/AlertDialog";
import CloseIcon from "@mui/icons-material/Close";
import WeeklyInventory from "./WeeklyInventory";

const Programmer = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [realPlan, setRealPlan] = useState(null);
  const [date, setDate] = useState("2023-12-01");

  const handleOnClick = () => {
    setOpen(!open);
  };

  const requirements = useSelector(getRequirement);
  const { data: sliced } = useSelector((state) => state.sliced);

  useEffect(() => {
    dispatch(fetchRequirementRequest({ date }));
    dispatch(fetchSlicedRequest({ date }));
  }, [dispatch]);

  return (
    <>
      {!open ? (
        <Box sx={{ position: "fixed", mt: 3, right: "1rem", top: "6.5rem" }}>
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
      <AlertDialog
        date={date}
        openDialog={openDialog}
        setOpen={setOpenDialog}
        open={openDialog}
        realPlan={realPlan}
        setRealPlan={setRealPlan}
      />
      <ProgrammerTable
        sliced={sliced}
        date={date}
        setDate={setDate}
        list={requirements}
        setRealPlan={setRealPlan}
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
      />
    </>
  );
};

export default Programmer;
