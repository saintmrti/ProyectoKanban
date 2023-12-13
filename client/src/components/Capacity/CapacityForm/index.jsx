import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import _ from "lodash";
import Button from "@mui/material/Button";

import { dataFamily } from "../CapacityTable/dummyData";
import { getLines, getMachines } from "../../../selectors/capacity";
import {
  updateCapacityRequest,
  insertCapacityRequest,
} from "../../../slices/capacity";

const CapacityForm = ({ selectedArr, editProduct, setOpenForm }) => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const dispatch = useDispatch();

  const [selectedLinea, setSelectedLinea] = useState();
  const [machines, setMachines] = useState([]);
  const linesList = useSelector(getLines);
  const machinesList = useSelector(getMachines);

  const product = _.find(selectedArr, { id: editProduct });

  const onSubmit = (values) => {
    const sku = {
      idSku: editProduct,
      ...values,
    };
    editProduct
      ? dispatch(updateCapacityRequest({ sku }))
      : dispatch(insertCapacityRequest(sku));
    reset();
    setOpenForm(false);
  };

  useEffect(() => {
    if (selectedLinea) {
      const machines = _.filter(machinesList, { idLinea: selectedLinea });
      setMachines(machines);
    }
  }, [machinesList, selectedLinea, setValue]);

  useEffect(() => {
    if (product) {
      setValue("sku", product.sku);
      setValue("descripcion", product.descripcion);
      setValue("kg_lote", product.kg_lote);
      setValue("rack", product.rack);
      setValue("no_rack", product.no_rack);
      setValue("tipo_emulsion", product.tipo_emulsion);
      product.mezclado && setValue("mezclado", product.mezclado);
      product.embutido && setValue("embutido", product.embutido);
      product.cocimiento && setValue("cocimiento", product.cocimiento);
      product.enfriamiento && setValue("enfriamiento", product.enfriamiento);
      product.desmolde && setValue("desmolde", product.desmolde);
      product.atemperado && setValue("atemperado", product.atemperado);
      product.rebanado && setValue("rebanado", product.rebanado);
      product.entrega && setValue("entrega", product.entrega);
    }
  }, [product, setValue]);

  return (
    <form
      className="flex justify-center items-center flex-wrap"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl mb-5 w-full text-center">
        {editProduct ? "Editar SKU" : "Agregar SKU"}
      </h1>
      <div className="grid grid-cols-2 gap-5 mb-10">
        {!editProduct && (
          <Fragment>
            <FormControl sx={{ width: "15rem" }} size="small">
              <InputLabel id="linea">Linea</InputLabel>
              <Select
                labelId="linea"
                id="select-linea"
                label="Linea"
                defaultValue=""
                onChange={(e) => setSelectedLinea(e.target.value)}
              >
                {_.map(linesList, (item) => (
                  <MenuItem key={item.id} value={item.idLinea}>
                    {item.linea}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "15rem" }} size="small">
              <InputLabel id="machine">Maquina</InputLabel>
              <Select
                labelId="machine"
                id="select-machine"
                label="Maquina"
                defaultValue=""
                {...register("idMaquina", {
                  required: true,
                })}
              >
                {_.map(machines, (item) => (
                  <MenuItem key={item.id} value={item.idMaquina}>
                    {item.maquina}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Fragment>
        )}
        <TextField
          sx={{ width: "15rem" }}
          label="SKU"
          type="text"
          size="small"
          {...register("sku", { required: true })}
        />
        <FormControl sx={{ width: "15rem" }} size="small">
          <InputLabel id="family">Familia</InputLabel>
          <Select
            labelId="family"
            id="select-family"
            label="Familia"
            defaultValue={product?.descripcion || ""}
            {...register("descripcion", {
              required: true,
            })}
          >
            {dataFamily.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          sx={{ width: "15rem" }}
          label="Lote"
          type="number"
          inputProps={{
            min: 0,
          }}
          size="small"
          autoComplete="off"
          {...register("kg_lote", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Rack"
          type="text"
          size="small"
          autoComplete="off"
          {...register("rack", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="No. Rack"
          type="text"
          inputProps={{
            pattern: "^[0-9]+([.][0-9]+)?$",
          }}
          size="small"
          {...register("no_rack", {
            required: true,
            pattern: /^[0-9]+([.][0-9]+)?$/,
          })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Tipo Emulsión"
          type="text"
          size="small"
          {...register("tipo_emulsion", { required: true })}
        />
      </div>
      <h1 className="text-2xl mb-5 w-full text-center">Tiempos</h1>
      <div className="grid grid-cols-2 gap-5 mb-10">
        <TextField
          sx={{ width: "15rem" }}
          label="Mezclado"
          type="time"
          defaultValue={product?.mezclado || "00:00"}
          size="small"
          {...register("mezclado", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Embutido"
          type="time"
          defaultValue={product?.embutido || "00:00"}
          size="small"
          {...register("embutido", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Cocimiento"
          type="time"
          defaultValue={product?.cocimiento || "00:00"}
          size="small"
          {...register("cocimiento", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Enfriamiento"
          type="time"
          defaultValue={product?.enfriamiento || "00:00"}
          size="small"
          {...register("enfriamiento", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Desmolde"
          type="time"
          defaultValue={product?.desmolde || "00:00"}
          size="small"
          {...register("desmolde", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Atemperado"
          type="time"
          defaultValue={product?.atemperado || "00:00"}
          size="small"
          {...register("atemperado", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Rebanado"
          type="time"
          defaultValue={product?.rebanado || "00:00"}
          size="small"
          {...register("rebanado", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Entrega"
          type="time"
          defaultValue={product?.entrega || "00:00"}
          size="small"
          {...register("entrega", { required: true })}
        />
      </div>
      <div className="w-full flex justify-center">
        <Button variant="contained" type="submit">
          {editProduct ? "Actualizar" : "Agregar"}
        </Button>
      </div>
    </form>
  );
};

export default CapacityForm;
