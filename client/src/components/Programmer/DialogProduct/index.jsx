import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import moment from "moment-timezone";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// import { deleteRequirementRequest } from "../../../slices/requirement";
// import _ from "lodash";

export default function DialogProduct({
  setOpen,
  open,
  plan,
  realPlan,
  setPlan,
  setRealPlan,
  product,
  calculateInvFinal3,
  calculateDifInvFinal,
}) {
  // const dispatch = useDispatch();
  const [loadValue, setLoadValue] = useState(0);
  const [baler, setBaler] = useState("MVC 10");
  const handleClose = () => setOpen(false);
  const handleAddProduct = () => {
    const pedido = () => loadValue * product?.min_kg_carga;
    const updatedData = plan.map((row) =>
      row.idProducto === product.idProducto
        ? {
            ...row,
            ajuste_carga: loadValue,
            pedido: pedido(),
            inv_final_3: calculateInvFinal3(
              row?.inv_final_1,
              row?.prox_salida,
              pedido()
            ),
            dif_inv_final: calculateDifInvFinal(
              row?.inv_final_1,
              row?.prox_salida,
              row?.tiendita,
              pedido()
            ),
          }
        : row
    );
    setPlan(updatedData);
    const productExist = realPlan.some(
      (row) => row.idProducto === product?.idProducto
    );
    if (productExist) {
      if (loadValue > 0) {
        const updatedRealPlan = realPlan.map((row) =>
          row.idProducto === product?.idProducto
            ? {
                ...row,
                ajuste_carga: loadValue,
                pedido: pedido(),
                destino: baler,
              }
            : row
        );
        setRealPlan(updatedRealPlan);
      } else {
        const updatedRealPlan = realPlan.filter(
          (row) => row.idProducto !== product?.idProducto
        );
        setRealPlan(updatedRealPlan);
      }
    } else {
      setRealPlan([
        ...realPlan,
        {
          idProducto: product?.idProducto,
          sku: product?.producto,
          ajuste_carga: loadValue,
          pedido: pedido(),
          destino: baler,
        },
      ]);
    }
    setOpen(false);
  };

  useEffect(() => {
    setLoadValue(product?.ajuste_carga || 0);
    setBaler(product?.destino || "MVC 10");
  }, [product]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="x1"
    >
      <DialogContent sx={{ width: 300 }}>
        <Typography variant="h6" component="h1" align="center">
          Editar carga de{" "}
          <span className="font-semibold">{product?.producto}</span>
        </Typography>
        <Typography variant="body1" component="p" align="center">
          ({product?.min_kg_carga} kg por carga)
        </Typography>
        <div className="flex flex-col justify-center items-center">
          <TextField
            label="Carga"
            type="number"
            size="small"
            value={loadValue}
            sx={{ marginTop: 2, width: "12rem" }}
            inputProps={{ min: "0" }}
            onChange={(e) => setLoadValue(e.target.value)}
          />
          <FormControl sx={{ marginTop: 2, width: "12rem" }} size="small">
            <InputLabel id="list-selector-label">Destino</InputLabel>
            <Select
              labelId="list-selector-label"
              id="list-selector"
              label="Select List"
              value={baler}
              onChange={(e) => setBaler(e.target.value)}
            >
              <MenuItem value="MVC 10">MVC 10</MenuItem>
              <MenuItem value="ULMA 2">ULMA 2</MenuItem>
              <MenuItem value="MVC 12">MVC 12</MenuItem>
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button size="small" variant="outlined" onClick={handleClose}>
          Cancelar
        </Button>
        <Button size="small" variant="contained" onClick={handleAddProduct}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
