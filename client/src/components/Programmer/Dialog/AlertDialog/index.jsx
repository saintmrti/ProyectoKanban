import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import TablaProgramador from "../TablaProgramador";
import Box from "@mui/material/Box";
import TablaTiempoSTD from "../TablaTiempoSTD";
import TablaRes from "../TablaRes";
import { insertSlicedRequest } from "../../../../slices/sliced";

export default function AlertDialog({ open, setOpen, realPlan,setRealPlan }) {
  const dispatch = useDispatch();
  const [datosParaTablaRes, setDatosParaTablaRes] = useState(0);

  const handleOnClick = () => {
    setOpen(!open);
    dispatch(insertSlicedRequest({ products: realPlan }));
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="x1"
      >
        <DialogTitle id="alert-dialog-title">{"Revisa tus datos"}</DialogTitle>
        <DialogContent sx={{ margin: "0px", overflowY: "auto" }}>
          <TablaProgramador
            dataInicial={realPlan}
            setDatosParaTablaRes={setDatosParaTablaRes}
            setRealPlan={setRealPlan}
          />
        </DialogContent>
        <DialogContent sx={{ display: "flex", width: "70%", gap: 1 }}>
          <TablaTiempoSTD />
          <TablaRes total={datosParaTablaRes} minutosPorDia={1080} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Recalcular</Button>
          <Button onClick={handleOnClick} autoFocus>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}