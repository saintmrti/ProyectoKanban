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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function AlertDialog({
  open,
  setOpen,
  realPlan,
  setRealPlan,
  date,
}) {
  const dispatch = useDispatch();
  const [datosParaTablaRes, setDatosParaTablaRes] = useState(0);
  const [selectProgram, setSelectProgram] = useState("MVC 10");

  const handleOnClick = () => {
    setOpen(!open);
    dispatch(insertSlicedRequest({ products: realPlan, date }));
    setRealPlan(null);
  };

  const handleListChange = (e) => {
    const value = e.target.value;
    setSelectProgram(value);
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
        <div className="flex justify-between items-center">
          <DialogTitle id="alert-dialog-title">Calcular Capacidad</DialogTitle>
          <FormControl
            sx={{ width: "12rem", marginRight: "20px", display: "none" }}
            size="small"
          >
            <InputLabel id="list-selector-label">Programador</InputLabel>
            <Select
              labelId="list-selector-label"
              id="list-selector"
              defaultValue="MVC 10"
              label="Select List"
              onChange={handleListChange}
            >
              <MenuItem value="MVC 10">MVC 10</MenuItem>
              <MenuItem value="ULMA 2">ULMA 2</MenuItem>
              <MenuItem value="MVC 12">MVC 12</MenuItem>
            </Select>
          </FormControl>
        </div>
        <DialogContent sx={{ margin: "0px", overflowY: "auto" }}>
          <TablaProgramador
            realPlan={realPlan}
            setDatosParaTablaRes={setDatosParaTablaRes}
            setRealPlan={setRealPlan}
            selectProgram={selectProgram}
          />
        </DialogContent>
        <DialogContent sx={{ display: "flex", gap: 1 }}>
          <TablaTiempoSTD />
          <TablaRes total={datosParaTablaRes} minutosPorDia={1080} />
        </DialogContent>
        <DialogActions sx={{ marginRight: "20px" }}>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleOnClick} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
