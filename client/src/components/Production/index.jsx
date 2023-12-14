import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SpeedDial from "@mui/material/SpeedDial";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import RackTable from "./RackTable";

import ProductionForm from "./ProductionForm";
import ProductionTable from "./ProductionTable";
import { fetchCapacityRequest } from "../../slices/capacity";
import { insertProductionRequest } from "../../slices/production";

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

const data = [];

const Production = () => {
  const dispatch = useDispatch();
  const [openProd, setOpenProd] = useState(false);
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [product, setProduct] = useState(null);
  const [procesoIndex, setProcesoIndex] = useState(0);

  const handleOnSaveProd = () => {
    dispatch(insertProductionRequest({ planProd: data }));
  };

  const handleOnCloseProd = () => {
    setOpenProd(false);
    setProduct(null);
  };

  const handleNext = () => {
    if (procesoIndex < data[0].procesos.length - 4) {
      setProcesoIndex(procesoIndex + 1);
    }
  };

  const handleBack = () => {
    if (procesoIndex > 0) {
      setProcesoIndex(procesoIndex - 1);
    }
  };

  useEffect(() => {
    dispatch(fetchCapacityRequest());
  }, [dispatch]);

  return (
    <>
      {!openSpeedDial ? (
        <Box sx={{ position: "fixed", mt: 3, right: "1rem", top: "6.5rem" }}>
          {/*<Typography sx={{ position: "absolute", bottom: 15, right: 70,  }}>Semanas</Typography>*/}
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 1, right: 3 }}
            icon={<AddIcon onClick={() => setOpenSpeedDial(true)} />}
          ></SpeedDial>
        </Box>
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
      {console.log(data)}
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div className="flex items-center">
            <Typography variant="h6" component="span">
              Plan Producción
            </Typography>
            <IconButton size="small" onClick={() => setOpenProd(true)}>
              <AddIcon />
            </IconButton>
            <div className="ml-auto">
              <Button
                sx={{ mr: 1 }}
                variant="outlined"
                onClick={handleOnSaveProd}
              >
                Guardar
              </Button>
              <IconButton size="small" onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
              <IconButton size="small" onClick={handleNext}>
                <ArrowForwardIcon />
              </IconButton>
            </div>
          </div>
          <ProductionTable data={data} procesoIndex={procesoIndex} />
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
            data={data}
            setOpen={setOpenProd}
            setProduct={setProduct}
            product={product}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Production;
