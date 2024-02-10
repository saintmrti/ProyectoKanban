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

import { getListSku } from "../../../selectors/capacity";
import { insertProductionRequest } from "../../../slices/production";

export default function ProductionForm({
  planProd,
  setProduct,
  date,
  setOpen,
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
      fecha_mezclado: `${date} 06:00:00`,
      destino: values.destino,
    };
    dispatch(insertProductionRequest({ production_order }));
    setProduct(null);
    setOpen(false);
    reset();
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
    <form
      className="flex justify-center items-center flex-wrap"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl mb-5 w-full text-center">Seleccionar SKU</h1>
      <div className="flex flex-col">
        <Controller
          name="producto"
          control={control}
          rules={{ required: false }}
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
          label="Rack"
          type="text"
          size="small"
          value={product ? _.find(listSku, { sku: product })?.rack : ""}
          // {...register("rack", { required: true })}
        />
        <TextField
          sx={{ width: "15rem", mb: 2 }}
          label="Kg Lote"
          type="number"
          size="small"
          value={product ? _.find(listSku, { sku: product })?.kg_lote : ""}
          // {...register("kg_lote", { required: true })}
        />
        <TextField
          sx={{ width: "15rem", mb: 2 }}
          label="No Racks"
          type="number"
          size="small"
          value={product ? _.find(listSku, { sku: product })?.no_rack : ""}
          // {...register("no_rack", { required: true })}
        />
        <TextField
          sx={{ width: "15rem", mb: 2 }}
          label="Tipo"
          type="text"
          size="small"
          value={
            product ? _.find(listSku, { sku: product })?.tipo_emulsion : ""
          }
          // {...register("tipo_emulsion", { required: true })}
        />
        <div></div>
        <div></div>
      </div>
      <div className="w-full flex justify-center">
        <Button variant="contained" type="submit">
          Agregar
        </Button>
      </div>
    </form>
  );
}
