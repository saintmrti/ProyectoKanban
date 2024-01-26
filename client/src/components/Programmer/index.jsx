import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SpeedDial from "@mui/material/SpeedDial";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import moment from "moment-timezone";

import {
  fetchRequirementRequest,
  insertRequirementRequest,
} from "../../slices/requirement";
import { fetchSlicedRequest } from "../../slices/sliced";
import { getRequirement } from "../../selectors/requirement";
import ProgrammerTable from "./ProgrammerTable";
import AlertDialog from "./Dialog/AlertDialog";
import CloseIcon from "@mui/icons-material/Close";
import WeeklyInventory from "./WeeklyInventory";
import { FileUploader } from "./FileUploader";
import { Spinner } from "../Spinner";
// import _ from "lodash";

const Programmer = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [realPlan, setRealPlan] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const requirements = useSelector(getRequirement);
  const { data: sliced } = useSelector((state) => state.sliced);
  const { isFetching, didError } = useSelector((state) => state.requirement);

  const handleOnClick = () => {
    setOpen(!open);
  };

  const handleUpload = () => {
    const f = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      f.append("files", selectedFiles[i]);
    }
    dispatch(insertRequirementRequest(f));
    setSelectedFiles([]);
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    setDate(value);
    dispatch(fetchRequirementRequest({ date: value }));
    dispatch(fetchSlicedRequest({ date: value }));
  };

  useEffect(() => {
    dispatch(fetchRequirementRequest({ date }));
    dispatch(fetchSlicedRequest({ date }));
  }, [dispatch]);

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : didError ? (
        <h1>Error</h1>
      ) : (
        <>
          {!open ? (
            <Box
              sx={{ position: "fixed", mt: 3, right: "1rem", top: "6.5rem" }}
            >
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
          {Object.keys(requirements).length > 0 ? (
            <ProgrammerTable
              sliced={sliced}
              date={date}
              setRealPlan={setRealPlan}
              setDate={setDate}
              list={requirements}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
            />
          ) : (
            <Box sx={{ height: "calc(100vh - 163px)" }}>
              <Paper
                sx={{ width: "100%", height: "100%", overflow: "hidden", p: 2 }}
              >
                <div className="flex justify-between w-full">
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Programador
                  </Typography>
                  <div className="ml-auto flex items-center">
                    <TextField
                      id="date"
                      label="Fecha"
                      type="date"
                      size="small"
                      value={date}
                      onChange={handleDateChange}
                      sx={{ width: "15rem" }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center w-full h-4/5">
                  <FileUploader
                    onUpload={handleUpload}
                    setSelectedFiles={setSelectedFiles}
                    selectedFiles={selectedFiles}
                  />
                </div>
              </Paper>
            </Box>
          )}
          <AlertDialog
            date={date}
            openDialog={openDialog}
            setOpen={setOpenDialog}
            open={openDialog}
            realPlan={realPlan}
            setRealPlan={setRealPlan}
          />
        </>
      )}
    </>
  );
};

export default Programmer;
