import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import SpeedDial from "@mui/material/SpeedDial";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import RackTable from "./RackTable";

import ProductionForm from "./ProductionForm";
import ProductionTable from "./ProductionTable";
import { Spinner } from "../Spinner";
import { changeDate } from "../../slices/date";
import { fetchCapacityRequest } from "../../slices/capacity";
import {
  fetchProductionRequest,
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
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [product, setProduct] = useState(null);
  const [procesoIndex, setProcesoIndex] = useState(0);
  const [planProd, setPlanProd] = useState([]);
  const [originalPlanProd, setOriginalPlanProd] = useState([]);

  const production = useSelector(getProduction);
  const { isFetching, didError } = useSelector((state) => state.production);
  const { date } = useSelector((state) => state.date);
  // const handleOnSaveProd = () => {
  //   dispatch(insertProductionRequest({ planProd: planProd, date }));
  //   setOriginalPlanProd(planProd);
  //   setPlanProd([]);
  // };

  const handleDeleteProd = (idProd) => {
    dispatch(deleteProductionRequest({ idProd }));
  };

  const handleOnCloseProd = () => {
    setOpenProd(false);
    setProduct(null);
  };

  const handleNext = () => {
    if (procesoIndex < planProd[0].procesos.length - 4) {
      setProcesoIndex(procesoIndex + 1);
    }
  };

  const handleBack = () => {
    if (procesoIndex > 0) {
      setProcesoIndex(procesoIndex - 1);
    }
  };

  const handleChangeDate = (newDate) => {
    changeDate(newDate);
    dispatch(fetchProductionRequest({ date: newDate }));
  };

  useEffect(() => {
    if (production) {
      setPlanProd(production);
      setOriginalPlanProd(production);
    }
  }, [production]);

  useEffect(() => {
    dispatch(fetchCapacityRequest());
    dispatch(fetchProductionRequest({ date }));
  }, [dispatch]);

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : didError ? (
        <div>Error</div>
      ) : (
        <>
          {!openSpeedDial ? (
            // <Box
            //   sx={{ position: "fixed", mt: 3, right: "1rem", top: "6.5rem" }}
            // >
            //   <SpeedDial
            //     ariaLabel="SpeedDial basic example"
            //     sx={{ position: "absolute", bottom: 1, right: 3 }}
            //     icon={<AddIcon onClick={() => setOpenSpeedDial(true)} />}
            //   ></SpeedDial>
            // </Box>
            <div></div>
          ) : (
            <>
              <CloseIcon
                sx={{ position: "absolute", top: 84, right: 20 }}
                fontSize="medium"
                onClick={() => setOpenSpeedDial(!openSpeedDial)}
              />
              <RackTable />
            </>
          )}
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <div className="flex items-center mb-2">
                <Typography variant="h6" component="span">
                  Agregar SKU
                </Typography>
                <IconButton size="small" onClick={() => setOpenProd(true)}>
                  <AddIcon />
                </IconButton>
                <div className="ml-auto flex items-center">
                  <TextField
                    id="date"
                    label="Fecha"
                    type="date"
                    size="small"
                    value={date}
                    onChange={(e) => handleChangeDate(e.target.value)}
                    sx={{ mr: 2, width: "15rem" }}
                  />
                  {/* <Button
                    variant="outlined"
                    onClick={handleDeleteProd}
                    disabled={planProd.length === 0}
                    sx={{ mr: 1 }}
                  >
                    Eliminar
                  </Button>
                  <Button
                    sx={{ mr: 1 }}
                    variant="outlined"
                    onClick={handleOnSaveProd}
                    disabled={
                      planProd.length === 0 ||
                      planProd[planProd.length - 1]?.sec ===
                        originalPlanProd[originalPlanProd.length - 1]?.sec
                    }
                  >
                    Guardar
                  </Button> */}
                  <IconButton size="small" onClick={handleBack}>
                    <ArrowBackIcon />
                  </IconButton>
                  <IconButton size="small" onClick={handleNext}>
                    <ArrowForwardIcon />
                  </IconButton>
                </div>
              </div>
              <ProductionTable
                planProd={planProd}
                procesoIndex={procesoIndex}
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
                setOpen={setOpenProd}
                setProduct={setProduct}
                setOriginalPlanProd={setOriginalPlanProd}
                product={product}
              />
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default Production;
