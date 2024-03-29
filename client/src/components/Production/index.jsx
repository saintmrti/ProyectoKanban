import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
// import SpeedDial from "@mui/material/SpeedDial";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
// import RackTable from "./RackTable";

import ProductionForm from "./ProductionForm";
import ProductionTable from "./ProductionTable";
import AlertSuccess from "./AlertSuccess";
import { Spinner } from "../Spinner";
import { changeDate } from "../../slices/date";
import { fetchCapacityRequest } from "../../slices/capacity";
import {
  fetchProductionRequest,
  updateProductionRequest,
  deleteProductionRequest,
} from "../../slices/production";
import { getProduction } from "../../selectors/produccion";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Production = () => {
  const dispatch = useDispatch();
  const [openProd, setOpenProd] = useState(false);
  // const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [product, setProduct] = useState(null);
  // const [procesoIndex, setProcesoIndex] = useState(0);
  const [planProd, setPlanProd] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);

  const production = useSelector(getProduction);
  const { isFetching, didError } = useSelector((state) => state.production);
  const { date } = useSelector((state) => state.date);

  const handleDeleteProd = (idProd) => {
    dispatch(deleteProductionRequest({ idProd }));
  };

  const handleOnCloseProd = () => {
    setOpenProd(false);
    setProduct(null);
  };

  // const handleNext = () => {
  //   if (procesoIndex < planProd[0].procesos.length - 4) {
  //     setProcesoIndex(procesoIndex + 1);
  //   }
  // };

  // const handleBack = () => {
  //   if (procesoIndex > 0) {
  //     setProcesoIndex(procesoIndex - 1);
  //   }
  // };

  const handleChangeDate = (newDate) => {
    dispatch(changeDate(newDate));
    dispatch(fetchProductionRequest({ date: newDate }));
  };

  const handleSaveProd = () => {
    dispatch(updateProductionRequest({ date, setOpenAlert }));
  };
  useEffect(() => {
    if (production) {
      setPlanProd(production);
    }
  }, [production]);

  useEffect(() => {
    dispatch(fetchCapacityRequest());
    dispatch(fetchProductionRequest({ date }));
  }, [dispatch]);

  // useEffect(() => {
  //   setOpenAlert(planProd.length > 0 && planProd[0]?.kanban === true);
  // }, [planProd]);

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : didError ? (
        <div>Error</div>
      ) : (
        <>
          <Card>
            <CardContent>
              <div className="flex items-center mb-2">
                {planProd.length > 0 && planProd[0]?.kanban === true ? (
                  <Typography variant="h6" component="span">
                    Kanban del día {moment(date).format("DD/MM/YYYY")}
                  </Typography>
                ) : (
                  <>
                    <Typography variant="h6" component="span">
                      Agregar SKU
                    </Typography>
                    <IconButton size="small" onClick={() => setOpenProd(true)}>
                      <AddIcon />
                    </IconButton>
                  </>
                )}
                <div className="ml-auto flex items-center">
                  {planProd.length > 0 && planProd[0]?.kanban === false && (
                    <Button
                      sx={{ mr: 1 }}
                      variant="contained"
                      onClick={handleSaveProd}
                    >
                      Generar Kanban
                    </Button>
                  )}
                  <TextField
                    id="date"
                    label="Fecha"
                    type="date"
                    size="small"
                    value={date}
                    onChange={(e) => handleChangeDate(e.target.value)}
                    sx={{ width: "15rem" }}
                  />
                  {/* {planProd && planProd.length > 0 && (
                    <Fragment>
                      <IconButton size="small" onClick={handleBack}>
                        <ArrowBackIcon />
                      </IconButton>
                      <IconButton size="small" onClick={handleNext}>
                        <ArrowForwardIcon />
                      </IconButton>
                    </Fragment>
                  )} */}
                </div>
              </div>
              <ProductionTable
                planProd={planProd}
                // procesoIndex={procesoIndex}
                handleDeleteProd={handleDeleteProd}
              />
            </CardContent>
          </Card>
          <Modal open={openProd} onClose={handleOnCloseProd}>
            <Box sx={style}>
              <IconButton
                aria-label="close"
                size="small"
                onClick={handleOnCloseProd}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
              <ProductionForm
                date={date}
                planProd={planProd}
                setProduct={setProduct}
                product={product}
              />
            </Box>
          </Modal>
          <AlertSuccess open={openAlert} setOpen={setOpenAlert} />
        </>
      )}
    </>
  );
};

export default Production;
