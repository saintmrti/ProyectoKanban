import _ from "lodash";
import moment from "moment";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import FolderIcon from "@mui/icons-material/Folder";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ListItemText from "@mui/material/ListItemText";
// import Box from "@mui/material/Box";
// import ButtonGroup from "@mui/material/ButtonGroup";
// import CheckIcon from "@mui/icons-material/Check";
// import ClearIcon from "@mui/icons-material/Clear";

import { getListSku } from "../../../selectors/capacity";
import { insertProductionRequest } from "../../../slices/production";

export default function ProductionForm({
  planProd,
  setProduct,
  date,
  product,
}) {
  const { register, handleSubmit, reset, setValue, control } = useForm({
    defaultValues: {
      producto: null,
    },
  });

  const dispatch = useDispatch();

  const listSku = useSelector(getListSku);
  const mezclado = _.find(listSku, { sku: product })?.mezclado;
  // const idProducto = _.find(listSku, { sku: product })?.id;
  const process = planProd[planProd.length - 1]?.procesos;
  const skuOptions = _.map(listSku, "sku");

  const onSubmit = (values) => {
    const production_order = {
      idSku: values.producto,
      idMaquina: 6,
      fecha_mezclado: `${date} ${values.mezcladora_inicio}:00`,
      destino: values.destino,
    };
    dispatch(insertProductionRequest({ production_order }));
    setProduct(null);
    reset({
      producto: null,
    });
  };

  const calculateTiming = (mezcladoInicio, embutidoFin) => {
    const mezclado_min = mezclado ? moment.duration(mezclado).asMinutes() : 120;
    const embutidoFin_hrs = embutidoFin || "06:00";
    const mezclado_inicio = mezcladoInicio || "04:00";
    const mezclado_fin = calculateEndTime(mezclado_inicio, mezclado_min);
    const embutido_inicio =
      mezclado_fin > embutidoFin_hrs
        ? calculateEndTime(mezclado_fin, 1)
        : calculateEndTime(embutidoFin_hrs, 1);
    const embutido_fin = calculateEndTime(embutido_inicio, 90);
    const cocimiento_inicio = embutido_fin;
    const cocimiento_fin = calculateEndTime(cocimiento_inicio, 270);
    const enfriamiento_inicio = cocimiento_fin;
    const enfriamiento_fin = calculateEndTime(enfriamiento_inicio, 250);
    const desmolde_inicio = enfriamiento_fin;
    const desmolde_fin = calculateEndTime(desmolde_inicio, 25);
    const atemperado_inicio = desmolde_fin;
    const atemperado_fin = calculateEndTime(atemperado_inicio, 240);
    const rebanado_inicio = atemperado_fin;
    const rebanado_fin = calculateEndTime(rebanado_inicio, 120);
    const entrega_inicio = rebanado_fin;
    const entrega_fin = calculateEndTime(entrega_inicio, 15);

    setValue("mezclado_inicio", mezclado_inicio);
    setValue("mezclado_fin", mezclado_fin);
    setValue("embutido_inicio", embutido_inicio);
    setValue("embutido_fin", embutido_fin);
    setValue("cocimiento_inicio", cocimiento_inicio);
    setValue("cocimiento_fin", cocimiento_fin);
    setValue("enfriamiento_inicio", enfriamiento_inicio);
    setValue("enfriamiento_fin", enfriamiento_fin);
    setValue("desmolde_inicio", desmolde_inicio);
    setValue("desmolde_fin", desmolde_fin);
    setValue("atemperado_inicio", atemperado_inicio);
    setValue("atemperado_fin", atemperado_fin);
    setValue("rebanado_inicio", rebanado_inicio);
    setValue("rebanado_fin", rebanado_fin);
    setValue("entrega_inicio", entrega_inicio);
    setValue("entrega_fin", entrega_fin);
  };

  const calculateEndTime = (startTime, min) => {
    return moment(startTime, "HH:mm").add(min, "minutes").format("HH:mm");
  };

  // const handleOnDelete = (index) => {
  //   const newPlanProd = originalPlanProd.filter((_, i) => i !== index);
  //   setOriginalPlanProd(newPlanProd);
  // };

  useEffect(() => {
    if (process && process.length > 0 && product) {
      calculateTiming(process[0].fin, process[1].fin);
    } else {
      calculateTiming();
    }
    setValue("rack", _.find(listSku, { sku: product })?.rack);
    setValue("kg_lote", _.find(listSku, { sku: product })?.kg_lote);
    setValue("no_rack", _.find(listSku, { sku: product })?.no_rack);
    setValue("tipo_emulsion", _.find(listSku, { sku: product })?.tipo_emulsion);
  }, [product, process, setValue]);

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl mb-5 text-center">Seleccionar SKU</h1>
      <div className="flex flex-col items-center w-full">
        <Controller
          name="producto"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              disablePortal
              id="combo-box-demo"
              options={skuOptions}
              sx={{ width: "15rem", mb: 2 }}
              size="small"
              renderInput={(params) => <TextField {...params} label="SKU" />}
              onChange={(_, value) => {
                setProduct(value);
                field.onChange(value);
              }}
            />
          )}
        />
        <FormControl sx={{ width: "15rem", mb: 2 }} size="small">
          <InputLabel id="destino">Destino</InputLabel>
          <Select
            labelId="destino"
            id="select-destino"
            label="Destino"
            autoComplete="off"
            defaultValue="MVC10"
            {...register("destino", {
              required: true,
            })}
          >
            <MenuItem value="MVC10">MVC 10</MenuItem>
            <MenuItem value="MVC12">MVC 12</MenuItem>
            <MenuItem value="ULMA2">ULMA 2</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ width: "15rem", mb: 2 }}
          autoComplete="off"
          label="Mezcladora Inicio"
          type="time"
          size="small"
          InputLabelProps={{ shrink: true }}
          {...register("mezcladora_inicio", { required: true })}
        />
        <TextField
          sx={{ width: "15rem", mb: 2 }}
          autoComplete="off"
          label="Rack"
          type="text"
          size="small"
          value={product ? _.find(listSku, { sku: product })?.rack : ""}
          // {...register("rack", { required: true })}
        />
        <TextField
          sx={{ width: "15rem", mb: 2 }}
          label="Kg Lote"
          autoComplete="off"
          type="number"
          size="small"
          value={product ? _.find(listSku, { sku: product })?.kg_lote : ""}
          // {...register("kg_lote", { required: true })}
        />
        <TextField
          sx={{ width: "15rem", mb: 2 }}
          label="No Racks"
          autoComplete="off"
          type="number"
          size="small"
          value={product ? _.find(listSku, { sku: product })?.no_rack : ""}
          // {...register("no_rack", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Tipo"
          autoComplete="off"
          type="text"
          size="small"
          value={
            product ? _.find(listSku, { sku: product })?.tipo_emulsion : ""
          }
          // {...register("tipo_emulsion", { required: true })}
        />
        <div className="flex justify-center mt-8">
          <Button variant="contained" type="submit" size="small">
            Agregar
          </Button>
        </div>
      </div>
      {/* {console.log(originalPlanProd)}
        {originalPlanProd.length > 0 && (
          <Box height="100%">
            <Box
              height={375}
              width={250}
              paddingLeft={1}
              sx={{ overflowY: "auto" }}
            >
              <List dense={true} sx={{ padding: 0 }}>
                {_.map(originalPlanProd, (item, index) => (
                  <ListItem
                    sx={{
                      borderRadius: "5px",
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                    key={index}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleOnDelete(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.idSku} />
                  </ListItem>
                ))}
              </List>
            </Box>
            <div className="flex justify-center mt-8">
              <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled button group"
              >
                <Button
                  size="small"
                  color="error"
                  onClick={() => setOriginalPlanProd([])}
                >
                  <ClearIcon />
                </Button>
                <Button size="small" color="success">
                  <CheckIcon />
                </Button>
              </ButtonGroup>
            </div>
          </Box>
        )} */}
    </form>
  );
}
