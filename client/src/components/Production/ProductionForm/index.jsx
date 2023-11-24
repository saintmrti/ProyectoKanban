import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import _ from "lodash";
import { Typography } from "@mui/material";

import { productos } from "./dummyData";

export default function ProductionForm({ data, setOpen, setProduct, product }) {
  const { register, handleSubmit, reset } = useForm();

  const [timing, setTiming] = useState({
    mezclado: {
      inicio: "",
      fin: "",
    },
    embutido: {
      inicio: "",
      fin: "",
    },
    cocimiento: {
      inicio: "",
      fin: "",
    },
    enfriamiento: {
      inicio: "",
      fin: "",
    },
    desmolde: {
      inicio: "",
      fin: "",
    },
    atemperado: {
      inicio: "",
      fin: "",
    },
    rebanado: {
      inicio: "",
      fin: "",
    },
    entrega: {
      inicio: "",
      fin: "",
    },
  });

  const onSubmit = (values) => {
    const newProduct = {
      id: data[data.length - 1].id + 1,
      sec: data[data.length - 1].sec + 1,
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
          fin: values.mezclado_final,
        },
        {
          nombre: "Embutido",
          inicio: values.embutido_inicio,
          fin: values.embutido_final,
        },
        {
          nombre: "Cocimiento",
          inicio: values.cocimiento_inicio,
          fin: values.cocimiento_final,
        },
        // {
        //   nombre: "Enfriamiento",
        //   inicio: values.enfriamiento_inicio,
        //   fin: values.enfriamiento_final,
        // },
        // {
        //   nombre: "Desmolde",
        //   inicio: values.desmolde_inicio,
        //   fin: values.desmolde_final,
        // },
        // {
        //   nombre: "Atemperado",
        //   inicio: values.atemperado_inicio,
        //   fin: values.atemperado_final,
        // },
        // {
        //   nombre: "Rebanado",
        //   inicio: values.rebanado_inicio,
        //   fin: values.rebanado_final,
        // },
        // {
        //   nombre: "Entrega",
        //   inicio: values.entrega_inicio,
        //   fin: values.entrega_final,
        // },
      ],
    };
    data.push(newProduct);
    reset();
    setOpen(false);
  };

  return (
    <form
      className="flex justify-center items-center flex-wrap"
      onSubmit={handleSubmit(onSubmit)}
    >
      {console.log(timing)}
      <h1 className="text-3xl mb-5 w-full text-center">Agregar SKU</h1>
      <div className="grid grid-cols-4 gap-5 mb-10">
        <FormControl sx={{ width: "15rem" }}>
          <InputLabel id="fase">SKU</InputLabel>
          <Select
            label="SKU"
            defaultValue=""
            size="small"
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
          {...register("destino", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Rack"
          type="text"
          size="small"
          defaultValue=""
          value={product ? _.find(productos, { name: product })?.rack : ""}
          {...register("rack", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Kg Lote"
          type="number"
          size="small"
          defaultValue=""
          value={product ? _.find(productos, { name: product })?.kg_lote : ""}
          {...register("kg_lote", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="No Racks"
          type="number"
          size="small"
          defaultValue=""
          value={product ? _.find(productos, { name: product })?.no_racks : ""}
          {...register("no_racks", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Tipo"
          type="text"
          size="small"
          defaultValue=""
          value={product ? _.find(productos, { name: product })?.tipo : ""}
          {...register("tipo", { required: true })}
        />
        <div></div>
        <div></div>
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
              value={data[data.length - 1]?.procesos[0]?.fin || ""}
              onChange={(e) =>
                setTiming({
                  ...timing,
                  mezclado: { ...timing.mezclado, inicio: e.target.value },
                })
              }
              {...register("mezclado_inicio", { required: true })}
            />
            <TextField
              sx={{ width: "15rem" }}
              label="Final"
              type="time"
              size="small"
              value={timing.mezclado.fin || ""}
              {...register("mezclado_final", { required: true })}
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
              {...register("embutido_inicio", { required: true })}
            />
            <TextField
              sx={{ width: "15rem" }}
              label="Final"
              type="time"
              size="small"
              {...register("embutido_final", { required: true })}
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
              {...register("cocimiento_inicio", { required: true })}
            />
            <TextField
              sx={{ width: "15rem" }}
              label="Final"
              type="time"
              size="small"
              {...register("cocimiento_final", { required: true })}
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
              // {...register("Inicio", { required: true })}
            />
            <TextField
              sx={{ width: "15rem" }}
              label="Final"
              type="time"
              size="small"
              // {...register("Inicio", { required: true })}
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
              // {...register("Inicio", { required: true })}
            />
            <TextField
              sx={{ width: "15rem" }}
              label="Final"
              type="time"
              size="small"
              // {...register("Inicio", { required: true })}
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
              // {...register("Inicio", { required: true })}
            />
            <TextField
              sx={{ width: "15rem" }}
              label="Final"
              type="time"
              size="small"
              // {...register("Inicio", { required: true })}
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
              // {...register("Inicio", { required: true })}
            />
            <TextField
              sx={{ width: "15rem" }}
              label="Final"
              type="time"
              size="small"
              // {...register("Inicio", { required: true })}
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
              // {...register("Inicio", { required: true })}
            />
            <TextField
              sx={{ width: "15rem" }}
              label="Final"
              type="time"
              size="small"
              // {...register("Inicio", { required: true })}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Button variant="contained" type="submit">
          Agregar
        </Button>
      </div>
    </form>
  );
}
