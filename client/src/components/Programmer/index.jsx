import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
// import SpeedDial from "@mui/material/SpeedDial";
// import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { fetchRequirementRequest } from "../../slices/requirement";
import {
  invDocumentsRequest,
  // reqDocumentsRequest,
  // wipDocumentsRequest,
  // weekDocumentsRequest,
  changeDocuments,
} from "../../slices/documents";
import { fetchSlicedRequest } from "../../slices/sliced";
import { getRequirement } from "../../selectors/requirement";
import ProgrammerTable from "./ProgrammerTable";
import AlertDialog from "./Dialog/AlertDialog";
import AlertDelete from "./AlertDelete";
// import CloseIcon from "@mui/icons-material/Close";
// import WeeklyInventory from "./WeeklyInventory";
import { FileUploader } from "./FileUploader";
import { changeDate } from "../../slices/date";
import { Spinner } from "../Spinner";
// import _ from "lodash";

const Programmer = () => {
  const dispatch = useDispatch();
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [realPlan, setRealPlan] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const requirements = useSelector(getRequirement);
  const { data: sliced } = useSelector((state) => state.sliced);
  const { date } = useSelector((state) => state.date);
  const { isFetching, didError, isFetchingInsert, didErrorInsert } =
    useSelector((state) => state.requirement);

  const handleChangeDate = (newDate) => {
    dispatch(changeDate(newDate));
  };

  const handleUpload = async () => {
    const f = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      f.append("files", selectedFiles[i]);
    }
    f.append("fecha", date);
    setDeleteBtn(true);
    dispatch(invDocumentsRequest(f));
    // dispatch(reqDocumentsRequest(f));
    // dispatch(wipDocumentsRequest(f));
    // dispatch(weekDocumentsRequest(f));
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    handleChangeDate(value);
    dispatch(fetchRequirementRequest({ date: value }));
    dispatch(fetchSlicedRequest({ date: value }));
  };

  useEffect(() => {
    dispatch(fetchRequirementRequest({ date }));
    dispatch(fetchSlicedRequest({ date }));
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(requirements).length > 0) {
      dispatch(changeDocuments(false));
    }
  }, [requirements, dispatch]);

  return (
    <>
      {isFetching || isFetchingInsert ? (
        <Spinner />
      ) : didError || didErrorInsert ? (
        <h1>Error</h1>
      ) : (
        <>
          {/* {!open ? (
            <Box
              sx={{ position: "fixed", mt: 3, right: "1rem", top: "6.5rem" }}
            >
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: "absolute", bottom: 3, right: 3 }}
                icon={<AddIcon onClick={handleOnClick} />}
              ></SpeedDial>
            </Box>
            // <div></div>
          ) : (
            <>
              <CloseIcon
                sx={{ position: "absolute", top: 84, right: 20 }}
                fontSize="medium"
                onClick={() => setOpen(!open)}
              />
              <WeeklyInventory />
            </>
          )} */}
          {Object.keys(requirements).length > 0 ? (
            <ProgrammerTable
              sliced={sliced?.pedido}
              date={date}
              realPlan={realPlan}
              setRealPlan={setRealPlan}
              handleChangeDate={handleChangeDate}
              list={requirements}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              openDelete={openDelete}
              setOpenDelete={setOpenDelete}
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
                  <TextField
                    id="date"
                    label="Fecha"
                    type="date"
                    size="small"
                    value={date}
                    onChange={handleDateChange}
                    sx={{ width: "15rem", ml: "auto" }}
                  />
                </div>
                <FileUploader
                  onUpload={handleUpload}
                  setSelectedFiles={setSelectedFiles}
                  selectedFiles={selectedFiles}
                  date={date}
                  setDeleteBtn={setDeleteBtn}
                  deleteBtn={deleteBtn}
                />
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
          <AlertDelete date={date} open={openDelete} setOpen={setOpenDelete} />
        </>
      )}
    </>
  );
};

export default Programmer;
