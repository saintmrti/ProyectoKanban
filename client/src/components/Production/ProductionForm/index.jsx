import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import _ from "lodash";
import { Typography } from "@mui/material";
import moment from "moment";

import { productos } from "./dummyData";

export default function ProductionForm({ data, setOpen, setProduct, product }) {
  const { register, handleSubmit, reset, setValue } = useForm();

  const process = data[data.length - 1]?.procesos;

  const onSubmit = (values) => {
    const newProduct = {
      id: process ? data[data.length - 1].id + 1 : 1,
      sec: process ? data[data.length - 1].sec + 1 : 1,
      destino: values.destino,
      producto: values.producto,
      rack: values.rack,
      kg_lote: values.kg_lote,
      no_racks: values.no_racks,
      tipo: values.tipo,
      procesos: [
        {
          nombre: "Mezclado",
          inicio: values.mezclado_inicio,
          fin: values.mezclado_fin,
        },
        {
          nombre: "Embutido",
          inicio: values.embutido_inicio,
          fin: values.embutido_fin,
        },
        {
          nombre: "Cocimiento",
          inicio: values.cocimiento_inicio,
          fin: values.cocimiento_fin,
        },
        {
          nombre: "Enfriamiento",
          inicio: values.enfriamiento_inicio,
          fin: values.enfriamiento_fin,
        },
        {
          nombre: "Desmolde",
          inicio: values.desmolde_inicio,
          fin: values.desmolde_fin,
        },
        {
          nombre: "Atemperado",
          inicio: values.atemperado_inicio,
          fin: values.atemperado_fin,
        },
        {
          nombre: "Rebanado",
          inicio: values.rebanado_inicio,
          fin: values.rebanado_fin,
        },
        {
          nombre: "Entrega",
          inicio: values.entrega_inicio,
          fin: values.entrega_fin,
        },
      ],
    };

    data.push(newProduct);
    setProduct(null);
    reset();
    !process && setOpen(false);
  };

  const handleTimingChangeMez = (value) => {
    const mezclado_min = _.find(productos, { name: product })?.mezclado;
    const mezclado_inicio = value;
    const mezclado_fin = calculateEndTime(mezclado_inicio, mezclado_min);
    const embutido_inicio =
      mezclado_fin > "06:00"
        ? calculateEndTime(mezclado_fin, 1)
        : calculateEndTime("06:00", 1);
    const embutido_fin = calculateEndTime(embutido_inicio, 90);

    setValue("mezclado_inicio", mezclado_inicio);
    setValue("mezclado_fin", mezclado_fin);
    setValue("embutido_inicio", embutido_inicio);
    setValue("embutido_fin", embutido_fin);
  };

  const handleTimingChangeCo = (value) => {
    const cocimiento_inicio = value;
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
      const mezclado_min = _.find(productos, { name: product })?.mezclado;

      let mezclado_inicio = process[0].fin;
      let mezclado_fin = calculateEndTime(process[0].fin, mezclado_min);
      let embutido_inicio =
        mezclado_fin > process[1].fin
          ? calculateEndTime(mezclado_fin, 1)
          : calculateEndTime(process[1].fin, 1);
      let embutido_fin = calculateEndTime(embutido_inicio, 90);
      let cocimiento_inicio = embutido_fin;
      let cocimiento_fin = calculateEndTime(cocimiento_inicio, 270);
      let enfriamiento_inicio = cocimiento_fin;
      let enfriamiento_fin = calculateEndTime(enfriamiento_inicio, 250);
      let desmolde_inicio = enfriamiento_fin;
      let desmolde_fin = calculateEndTime(desmolde_inicio, 25);
      let atemperado_inicio = desmolde_fin;
      let atemperado_fin = calculateEndTime(atemperado_inicio, 240);
      let rebanado_inicio = atemperado_fin;
      let rebanado_fin = calculateEndTime(rebanado_inicio, 120);
      let entrega_inicio = rebanado_fin;
      let entrega_fin = calculateEndTime(entrega_inicio, 15);

      const newTiming = {
        mezclado: {
          inicio: mezclado_inicio,
          fin: mezclado_fin,
        },
        embutido: {
          inicio: embutido_inicio,
          fin: embutido_fin,
        },
        cocimiento: {
          inicio: cocimiento_inicio,
          fin: cocimiento_fin,
        },
        enfriamiento: {
          inicio: enfriamiento_inicio,
          fin: enfriamiento_fin,
        },
        desmolde: {
          inicio: desmolde_inicio,
          fin: desmolde_fin,
        },
        atemperado: {
          inicio: atemperado_inicio,
          fin: atemperado_fin,
        },
        rebanado: {
          inicio: rebanado_inicio,
          fin: rebanado_fin,
        },
        entrega: {
          inicio: entrega_inicio,
          fin: entrega_fin,
        },
      };
      Object.keys(newTiming).forEach((processName) => {
        setValue(`${processName}_inicio`, newTiming[processName].inicio);
        setValue(`${processName}_fin`, newTiming[processName].fin);
      });
    }
    setValue("rack", _.find(productos, { name: product })?.rack);
    setValue("kg_lote", _.find(productos, { name: product })?.kg_lote);
    setValue("no_racks", _.find(productos, { name: product })?.no_racks);
    setValue("tipo", _.find(productos, { name: product })?.tipo);
  }, [product, process, setValue]);

  return (
    <form
      className="flex justify-center items-center flex-wrap"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl mb-5 w-full text-center">Seleccionar SKU</h1>
      <div className="grid grid-cols-4 gap-5 mb-10">
        <FormControl sx={{ width: "15rem" }} size="small">
          <InputLabel id="sku">SKU</InputLabel>
          <Select
            labelId="sku"
            id="select-sku"
            label="SKU"
            autoComplete="off"
            defaultValue=""
            {...register("producto", {
              required: true,
              onChange: (e) => setProduct(e.target.value),
            })}
          >
            <MenuItem value="X050B">X050B</MenuItem>
            <MenuItem value="X519">X519</MenuItem>
            <MenuItem value="X168">X168</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ width: "15rem" }}
          label="Destino"
          type="text"
          size="small"
          autoComplete="off"
          {...register("destino", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Rack"
          type="text"
          size="small"
          value={product ? _.find(productos, { name: product })?.rack : ""}
          {...register("rack", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Kg Lote"
          type="number"
          size="small"
          value={product ? _.find(productos, { name: product })?.kg_lote : ""}
          {...register("kg_lote", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="No Racks"
          type="number"
          size="small"
          value={product ? _.find(productos, { name: product })?.no_racks : ""}
          {...register("no_racks", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Tipo"
          type="text"
          size="small"
          value={product ? _.find(productos, { name: product })?.tipo : ""}
          {...register("tipo", { required: true })}
        />
        <div></div>
        <div></div>
        {/* <h1 className="col-span-4 text-2xl text-center">
          Tiempos Precalculados
        </h1> */}
        {!process && product && (
          <Fragment>
            <div className="col-span-2">
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Mezclado
              </Typography>
              <div className="grid grid-cols-2 gap-5">
                <TextField
                  sx={{ width: "15rem" }}
                  label="Inicio"
                  type="time"
                  size="small"
                  defaultValue="00:00"
                  // value={timing?.mezclado?.inicio || ""}
                  {...register("mezclado_inicio", {
                    required: true,
                    onChange: (e) => handleTimingChangeMez(e.target.value),
                  })}
                />
                <TextField
                  sx={{ width: "15rem" }}
                  label="Final"
                  type="time"
                  size="small"
                  defaultValue="00:00"
                  {...register("mezclado_fin", {
                    required: true,
                    // onChange: (e) => handleEndTimingChange(e, "Mezclado"),
                  })}
                />
              </div>
            </div>
            <div className="col-span-2">
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Embutido
              </Typography>
              <div className="grid grid-cols-2 gap-5">
                <TextField
                  sx={{ width: "15rem" }}
                  label="Inicio"
                  type="time"
                  size="small"
                  defaultValue="00:00"
                  {...register("embutido_inicio", { required: false })}
                />
                <TextField
                  sx={{ width: "15rem" }}
                  label="Final"
                  type="time"
                  size="small"
                  defaultValue="00:00"
                  {...register("embutido_fin", { required: false })}
                />
              </div>
            </div>
            <div className="col-span-2">
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Cocimiento
              </Typography>
              <div className="grid grid-cols-2 gap-5">
                <TextField
                  sx={{ width: "15rem" }}
                  label="Inicio"
                  type="time"
                  size="small"
                  defaultValue="00:00"
                  // value={timing?.cocimiento?.inicio || ""}
                  {...register("cocimiento_inicio", {
                    required: false,
                    onChange: (e) => handleTimingChangeCo(e.target.value),
                  })}
                />
                <TextField
                  sx={{ width: "15rem" }}
                  label="Final"
                  type="time"
                  size="small"
                  defaultValue="00:00"
                  // value={timing?.cocimiento?.fin || ""}
                  {...register("cocimiento_fin", { required: false })}
                />
              </div>
            </div>
            <div className="col-span-2">
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Enfriamiento
              </Typography>
              <div className="grid grid-cols-2 gap-5">
                <TextField
                  sx={{ width: "15rem" }}
                  label="Inicio"
                  type="time"
                  size="small"
                  defaultValue="00:00"
                  // value={timing?.enfriamiento?.inicio || ""}
                  {...register("enfriamiento_inicio", { required: false })}
                />
                <TextField
                  sx={{ width: "15rem" }}
                  label="Final"
                  type="time"
                  size="small"
                  defaultValue="00:00"
                  // value={timing?.enfriamiento?.fin || ""}
                  {...register("enfriamiento_fin", { required: false })}
                />
              </div>
            </div>
            <div className="col-span-2">
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Desmolde
              </Typography>
              <div className="grid grid-cols-2 gap-5">
                <TextField
                  sx={{ width: "15rem" }}
                  label="Inicio"
                  type="time"
                  size="small"
                  defaultValue="00:00"
                  // value={timing?.desmolde?.inicio || ""}
                  {...register("desmolde_inicio", { required: false })}
                />
                <TextField
                  sx={{ width: "15rem" }}
                  label="Final"
                  type="time"
                  size="small"
                  defaultValue="00:00"
                  // value={timing?.desmolde?.fin || ""}
                  {...register("desmolde_fin", { required: false })}
                />
              </div>
            </div>
            <div className="col-span-2">
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Atemperado
              </Typography>
              <div className="grid grid-cols-2 gap-5">
                <TextField
                  sx={{ width: "15rem" }}
                  label="Inicio"
                  type="time"
                  size="small"
                  defaultValue="00:00"
                  // value={timing?.atemperado?.inicio || ""}
                  {...register("atemperado_inicio", { required: false })}
                />
                <TextField
                  sx={{ width: "15rem" }}
                  label="Final"
                  type="time"
                  size="small"
                  defaultValue="00:00"
                  // value={timing?.atemperado?.fin || ""}
                  {...register("atemperado_fin", { required: false })}
                />
              </div>
            </div>
            <div className="col-span-2">
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Rebanado
              </Typography>
              <div className="grid grid-cols-2 gap-5">
                <TextField
                  sx={{ width: "15rem" }}
                  label="Inicio"
                  type="time"
                  size="small"
                  defaultValue="00:00"
                  // value={timing?.rebanado?.inicio || ""}
                  {...register("rebanado_inicio", { required: false })}
                />
                <TextField
                  sx={{ width: "15rem" }}
                  label="Final"
                  type="time"
                  size="small"
                  defaultValue="00:00"
                  // value={timing?.rebanado?.fin || ""}
                  {...register("rebanado_fin", { required: false })}
                />
              </div>
            </div>
            <div className="col-span-2">
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Entrega
              </Typography>
              <div className="grid grid-cols-2 gap-5">
                <TextField
                  sx={{ width: "15rem" }}
                  label="Inicio"
                  type="time"
                  size="small"
                  defaultValue="00:00"
                  // value={timing?.entrega?.inicio || ""}
                  {...register("entrega_inicio", { required: false })}
                />
                <TextField
                  sx={{ width: "15rem" }}
                  label="Final"
                  type="time"
                  size="small"
                  defaultValue="00:00"
                  // value={timing?.entrega?.fin || ""}
                  {...register("entrega_fin", { required: false })}
                />
              </div>
            </div>
          </Fragment>
        )}
      </div>
      <div className="w-full flex justify-center">
        <Button variant="contained" type="submit">
          Agregar
        </Button>
      </div>
    </form>
  );
}
