import { useState } from "react";
import ProductionTable from "../components/Table/ProductionTable";
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
import CloseIcon from "@mui/icons-material/Close";
import Barra from "./Prueba";
import ProductionForm from "../components/Forms/ProductionForm";
//agregado por zmm
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
//aqui termina


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const data = [
  {
    id: 1,
    sec: 1,
    destino: "MVC10",
    producto: "X050B",
    rack: "11 x 16",
    kg_lote: 3000,
    no_racks: 3.0,
    tipo: "MOL",
    procesos: [
      {
        nombre: "Mezclado",
        inicio: "04:00",
        fin: "05:40",
      },
      {
        nombre: "Embutido",
        inicio: "06:00",
        fin: "07:31",
      },
      {
        nombre: "Cocimiento",
        inicio: "07:50",
        fin: "12:20",
      },
    ],
  },
];

const Production = () => {
  const [open, setOpen] = useState(false);
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [product, setProduct] = useState(null);
  //agregado por zmm
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 6;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  //aqui termina.
 
  return (
    <div>
      <div style={{ padding: "5px" }}>
        {!openSpeedDial ? (
          <Box
            sx={{ position: "fixed", mt: 3, right: "0.1rem", top: "6.3rem" }}
          >
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
            <Barra />
          </>
        )}
      </div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <>
            <Typography variant="h6" component="span">
              Plan Producción
            </Typography>
            <IconButton size="small" onClick={() => setOpen(true)}>
              <AddIcon />
            </IconButton>
          </>
          <div className="flex justify-between items-center w-full h-0">
            {/*<div>
              <IconButton size="small" onClick={() => setOpen(true)}>
                <AddIcon />
              </IconButton>
            </div>
            <div>
              <IconButton size="small" onClick={(f) => f}>
                <ArrowBackIcon />
              </IconButton>
              <IconButton size="small" onClick={(f) => f}>
                <ArrowForwardIcon />
              </IconButton>
            </div>*/}
            <Button size="large" onClick={handleBack} disabled={activeStep === 0} sx={{ position: "relative", top:50, left: -40}}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            
          </Button>
          <Button
            size="large"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            sx={{ position: "relative", top:50, right:-40}}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
          </div>
          <ProductionTable data={data} />
        </CardContent>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <IconButton
            aria-label="close"
            size="small"
            onClick={() => setOpen(false)}
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
            setOpen={setOpen}
            setProduct={setProduct}
            product={product}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Production;
