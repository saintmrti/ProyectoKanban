import { useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import { useTheme } from "@mui/material/styles";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import RackTable from "./RackTable";
import ProductionForm from "./ProductionForm";
import ProductionTable from "./ProductionTable";

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

const data = [
  // {
  //   id: 1,
  //   sec: 1,
  //   destino: "MVC10",
  //   producto: "X050B",
  //   rack: "11 x 16",
  //   kg_lote: 3000,
  //   no_racks: 3.0,
  //   tipo_emulsion: "MOL",
  //   procesos: [
  //     {
  //       nombre: "Mezclado",
  //       inicio: "04:00",
  //       fin: "05:40",
  //     },
  //     {
  //       nombre: "Embutido",
  //       inicio: "06:00",
  //       fin: "07:31",
  //     },
  //     {
  //       nombre: "Cocimiento",
  //       inicio: "07:50",
  //       fin: "12:20",
  //     },
  //     {
  //       nombre: "Enfriamiento",
  //       inicio: "12:20",
  //       fin: "16:30",
  //     },
  //     {
  //       nombre: "Desmolde",
  //       inicio: "16:30",
  //       fin: "16:55",
  //     },
  //     {
  //       nombre: "Atemperado",
  //       inicio: "16:55",
  //       fin: "20:55",
  //     },
  //     {
  //       nombre: "Rebanado",
  //       inicio: "20:55",
  //       fin: "22:55",
  //     },
  //     {
  //       nombre: "Entrega",
  //       inicio: "22:55",
  //       fin: "23:10",
  //     },
  //   ],
  // },
];

const Production = () => {
  const [openProd, setOpenProd] = useState(false);
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [product, setProduct] = useState(null);
  const [procesoIndex, setProcesoIndex] = useState(0);

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
