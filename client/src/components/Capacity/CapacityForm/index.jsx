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
// import moment from "moment-timezone";

const CapacityForm = ({ selectedArr, editProduct, setOpenForm }) => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const dispatch = useDispatch();

  const [selectedLinea, setSelectedLinea] = useState();
  const [machines, setMachines] = useState([]);
  // const [times, setTimes] = useState(false);
  const linesList = useSelector(getLines);
  const machinesList = useSelector(getMachines);

  const product = _.find(selectedArr, { id: editProduct });

  const onSubmit = (values) => {
    const sku = {
      idSku: editProduct,
      desmolde: null,
      ...values,
    };
    editProduct
      ? dispatch(updateCapacityRequest(sku))
      : dispatch(insertCapacityRequest(sku));
    reset();
    setOpenForm(false);
  };

  // function convertMinutesAsHours(minutos) {
  //   const horas = Math.floor(minutos / 60);
  //   const minutosRestantes = minutos % 60;
  //   const horaFormateada = moment({
  //     hour: horas,
  //     minute: minutosRestantes,
  //   }).format("HH:mm");
  //   return horaFormateada;
  // }

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
      setValue("tinas_emulsion", product.tinas_emulsion);
      setValue("tinas_fresco", product.tinas_fresco);
      setValue("tinas_congelado", product.tinas_congelado);
      setValue("ingredientes_secos", product.ingredientes_secos);
      setValue("salmuerizador", product.salmuerizador);
      setValue("corte_deshuese_fresco", product.corte_deshuese_fresco);
      setValue("emulsiones", product.emulsiones);
      setValue("mezclado", product.mezclado);
      setValue("embutido", product.embutido);
      setValue("cocimiento", product.cocimiento);
      setValue("enfriamiento", product.enfriamiento);
      // setValue("desmolde", product.desmolde);
      setValue("atemperado", product.atemperado);
      setValue("rebanado", product.rebanado);
      setValue("entrega", product.entrega);
      setValue("te_ingredientes_salmuera", product.te_ingredientes_salmuera);
      setValue("te_salmuera_mezclado", product.te_salmuera_mezclado);
      setValue("te_emulsiones_mezclado", product.te_emulsiones_mezclado);
      setValue("te_cyd_emulsiones", product.te_cyd_emulsiones);
      setValue("te_cyd_mezclado", product.te_cyd_mezclado);
      setValue("te_mezclado_embutido", product.te_mezclado_embutido);
      setValue("te_embutido_cocimiento", product.te_embutido_cocimiento);
      setValue(
        "te_cocimiento_enfriamiento",
        product.te_cocimiento_enfriamiento
      );
      setValue("te_enfriamiento_desmolde", product.te_enfriamiento_desmolde);
      setValue("te_desmolde_atemperado", product.te_desmolde_atemperado);
      setValue("te_atemperado_rebanado", product.te_atemperado_rebanado);
      setValue("te_rebanado_entrega", product.te_rebanado_entrega);
    }
  }, [product, setValue]);

  return (
    <form
      className="flex justify-center items-center flex-wrap"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <h1 className="text-2xl mb-5 w-full text-center">
          {editProduct ? "Editar SKU" : "Agregar SKU"}
        </h1>
        <div className="grid grid-cols-4 gap-5 mb-5">
          {!editProduct && (
            <Fragment>
              <FormControl sx={{ width: "17rem" }} size="small">
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
              <FormControl sx={{ width: "17rem" }} size="small">
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
            sx={{ width: "17rem" }}
            label="SKU"
            type="text"
            autoComplete="off"
            size="small"
            {...register("sku", { required: true })}
          />
          <FormControl sx={{ width: "17rem" }} size="small">
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
            sx={{ width: "17rem" }}
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
            sx={{ width: "17rem" }}
            label="Rack"
            type="text"
            size="small"
            autoComplete="off"
            {...register("rack", { required: true })}
          />
          <TextField
            sx={{ width: "17rem" }}
            label="No. Rack"
            type="number"
            autoComplete="off"
            inputProps={{
              step: "0.01",
            }}
            size="small"
            {...register("no_rack", {
              required: true,
              pattern: /^[0-9]+([.][0-9]+)?$/,
            })}
          />
          <TextField
            sx={{ width: "17rem" }}
            label="Tipo Emulsión"
            autoComplete="off"
            type="text"
            size="small"
            {...register("tipo_emulsion", { required: true })}
          />
          <TextField
            sx={{ width: "17rem" }}
            label="Tinas Emulsión"
            autoComplete="off"
            type="number"
            size="small"
            {...register("tinas_emulsion", { required: true })}
          />
          <TextField
            sx={{ width: "17rem" }}
            label="Tinas Fresco"
            autoComplete="off"
            type="number"
            size="small"
            {...register("tinas_fresco", { required: true })}
          />
          <TextField
            sx={{ width: "17rem" }}
            label="Tinas Congelado"
            autoComplete="off"
            type="number"
            size="small"
            {...register("tinas_congelado", { required: true })}
          />
        </div>
        <h1 className="text-2xl mb-5 w-full text-center">Tiempos (m)</h1>
        <div className="grid grid-cols-6 gap-5 mb-10">
          <TextField
            sx={{ width: "10.3rem" }}
            label="Ingredientes secos"
            type="number"
            size="small"
            {...register("ingredientes_secos", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="T.E. a salmuerizador"
            type="number"
            size="small"
            {...register("te_ingredientes_salmuera", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="Salmuerizador"
            type="number"
            size="small"
            {...register("salmuerizador", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="T.E. a mezclado"
            type="number"
            size="small"
            {...register("te_salmuera_mezclado", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="Emulsiones"
            type="number"
            size="small"
            {...register("emulsiones", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="T.E. a mezclado"
            type="number"
            size="small"
            {...register("te_emulsiones_mezclado", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="Corte y Deshuese"
            type="number"
            size="small"
            {...register("corte_deshuese_fresco", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="T.E. a emulsiones"
            type="number"
            size="small"
            {...register("te_cyd_emulsiones", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="T.E. a mezclado"
            type="number"
            size="small"
            {...register("te_cyd_mezclado", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="Mezclado"
            type="number"
            size="small"
            {...register("mezclado", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="T.E. a embutido"
            type="number"
            size="small"
            {...register("te_mezclado_embutido", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="Embutido"
            type="number"
            size="small"
            {...register("embutido", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="T.E. a cocimiento"
            type="number"
            size="small"
            {...register("te_embutido_cocimiento", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="Cocimiento"
            type="number"
            size="small"
            {...register("cocimiento", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="T.E. a enfriamiento"
            type="number"
            size="small"
            {...register("te_cocimiento_enfriamiento", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="Enfriamiento"
            type="number"
            size="small"
            {...register("enfriamiento", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="T.E. a pre-atemperado"
            type="number"
            size="small"
            {...register("te_enfriamiento_desmolde", { required: true })}
          />
          {/* <TextField
            sx={{ width: "10.3rem" }}
            label="Desmolde"
            type="number"
            size="small"
            {...register("desmolde", { required: true })}
          /> */}
          <TextField
            sx={{ width: "10.3rem" }}
            label="T.E. a atemperado"
            type="number"
            size="small"
            {...register("te_desmolde_atemperado", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="Atemperado"
            type="number"
            size="small"
            {...register("atemperado", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="T.E. a rebanado"
            type="number"
            size="small"
            {...register("te_atemperado_rebanado", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="Rebanado"
            type="number"
            size="small"
            {...register("rebanado", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="T.E. a entrega"
            type="number"
            size="small"
            {...register("te_rebanado_entrega", { required: true })}
          />
          <TextField
            sx={{ width: "10.3rem" }}
            label="Entrega"
            type="number"
            size="small"
            {...register("entrega", { required: true })}
          />
        </div>
        <div className="w-full flex justify-center">
          <Button variant="contained" type="submit">
            {editProduct ? "Actualizar" : "Agregar"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CapacityForm;
