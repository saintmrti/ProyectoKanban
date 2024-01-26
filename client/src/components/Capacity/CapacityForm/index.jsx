import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import _ from "lodash";
import Card from "@mui/material/Card";
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
  // const [times, setTimes] = useState(false);
  const linesList = useSelector(getLines);
  const machinesList = useSelector(getMachines);

  const product = _.find(selectedArr, { id: editProduct });

  const onSubmit = (values) => {
    const sku = {
      idSku: editProduct,
      ...values,
    };
    editProduct
      ? dispatch(updateCapacityRequest(sku))
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
      setValue("tinas_emulsion", product.tinas_emulsion);
      setValue("tinas_fresco", product.tinas_fresco);
      setValue("tinas_congelado", product.tinas_congelado);
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
            {...register("tinas_emulsion", { required: false })}
          />
          <TextField
            sx={{ width: "17rem" }}
            label="Tinas Fresco"
            autoComplete="off"
            type="number"
            size="small"
            {...register("tinas_fresco", { required: false })}
          />
          <TextField
            sx={{ width: "17rem" }}
            label="Tinas Congelado"
            autoComplete="off"
            type="number"
            size="small"
            {...register("tinas_congelado", { required: false })}
          />
        </div>
        <h1 className="text-2xl mb-5 w-full text-center">Tiempos</h1>
        <div className="grid grid-cols-3 gap-5 mb-10">
          <Card
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              sx={{ width: "10.3rem" }}
              label="Ingredientes secos"
              type="time"
              defaultValue={product?.ingredientes_secos}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("ingredientes_secos", { required: false })}
            />
            <TextField
              sx={{ width: "10.3rem" }}
              label="T.E. a salmuerizador"
              type="time"
              // defaultValue={product?.mezclado}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("te_salmuerizador", { required: false })}
            />
          </Card>
          <Card
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "10.3rem" }}
              label="Salmuerizador"
              type="time"
              defaultValue={product?.salmuerizador}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("salmuerizador", { required: false })}
            />
            <TextField
              sx={{ width: "10.3rem" }}
              label="T.E. a mezclado"
              type="time"
              // defaultValue={product?.mezclado}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("te_salmuera_mezclado", { required: false })}
            />
          </Card>
          <Card
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "10.3rem" }}
              label="Emulsiones"
              type="time"
              defaultValue={product?.emulsiones}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("emulsiones", { required: false })}
            />
            <TextField
              sx={{ width: "10.3rem" }}
              label="T.E. a mezclado"
              type="time"
              defaultValue={product?.te_celda}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("te_emul_mezclado", { required: false })}
            />
          </Card>
          <Card
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "6.6rem" }}
              label="Corte y Deshuese"
              type="time"
              defaultValue={product?.corte_deshuese}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("corte_deshuese", { required: false })}
            />
            <TextField
              sx={{ width: "6.6rem" }}
              label="T.E. a emulsiones"
              type="time"
              defaultValue={product?.te_corte_deshuese}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("te_emulsiones", { required: false })}
            />
            <TextField
              sx={{ width: "6.6rem" }}
              label="T.E. a mezclado"
              type="time"
              defaultValue={product?.te_corte_deshuese}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("te_cyd_mezclado", { required: false })}
            />
          </Card>
          <Card
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "10.3rem" }}
              label="Mezclado"
              type="time"
              defaultValue={product?.mezclado}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("mezclado", { required: false })}
            />
            <TextField
              sx={{ width: "10.3rem" }}
              label="T.E. a embutido"
              type="time"
              // defaultValue={product?.mezclado}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("te_embutido", { required: false })}
            />
          </Card>
          <Card
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "10.3rem" }}
              label="Embutido"
              type="time"
              defaultValue={product?.embutido}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("embutido", { required: false })}
            />
            <TextField
              sx={{ width: "10.3rem" }}
              label="T.E. a cocimiento"
              type="time"
              // defaultValue={product?.mezclado}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("te_cocimiento", { required: false })}
            />
          </Card>
          <Card
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "10.3rem" }}
              label="Cocimiento"
              type="time"
              defaultValue={product?.cocimiento}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("cocimiento", { required: false })}
            />
            <TextField
              sx={{ width: "10.3rem" }}
              label="T.E. a enfriamiento"
              type="time"
              // defaultValue={product?.mezclado}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("te_enfriamiento", { required: false })}
            />
          </Card>
          <Card
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "10.3rem" }}
              label="Enfriamiento"
              type="time"
              defaultValue={product?.enfriamiento}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("enfriamiento", { required: false })}
            />
            <TextField
              sx={{ width: "10.3rem" }}
              label="T.E. a desmolde"
              type="time"
              // defaultValue={product?.mezclado}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("te_desmolde", { required: false })}
            />
          </Card>
          <Card
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "10.3rem" }}
              label="Desmolde"
              type="time"
              defaultValue={product?.desmolde}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("desmolde", { required: false })}
            />
            <TextField
              sx={{ width: "10.3rem" }}
              label="T.E. a atemperado"
              type="time"
              // defaultValue={product?.mezclado}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("te_atemperado", { required: false })}
            />
          </Card>
          <Card
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "10.3rem" }}
              label="Atemperado"
              type="time"
              defaultValue={product?.atemperado}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("atemperado", { required: false })}
            />
            <TextField
              sx={{ width: "10.3rem" }}
              label="T.E. a rebanado"
              type="time"
              // defaultValue={product?.mezclado}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("te_rebanado", { required: false })}
            />
          </Card>
          <Card
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{ width: "10.3rem" }}
              label="Rebanado"
              type="time"
              defaultValue={product?.rebanado}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("rebanado", { required: false })}
            />
            <TextField
              sx={{ width: "10.3rem" }}
              label="T.E. a entrega"
              type="time"
              // defaultValue={product?.mezclado}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("te_entrega", { required: false })}
            />
          </Card>
          <Card
            sx={{
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <TextField
              sx={{ width: "10.3rem" }}
              label="Entrega"
              type="time"
              defaultValue={product?.entrega}
              InputLabelProps={{ shrink: true }}
              size="small"
              {...register("entrega", { required: false })}
            />
          </Card>
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
