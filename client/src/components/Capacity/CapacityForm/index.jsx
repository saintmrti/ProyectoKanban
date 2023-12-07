import { useEffect } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import _ from "lodash";
const CapacityForm = ({ selectedArr, editProduct }) => {
  const { register, handleSubmit, setValue } = useForm();

  const product = _.find(selectedArr, { id: editProduct });

  const onSubmit = (values) => {
    console.log(values);
  };

  useEffect(() => {
    if (product) {
      setValue("sku", product.sku);
      setValue("id_familia", product.idFamilia);
      setValue("kg_lote", product.kg_lote);
      setValue("tipo_rack", product.tipo_rack);
      setValue("no_rack_lote", product.no_rack_lote);
      setValue("kg_barra", product.kg_barra);
      setValue("no_barras", product.no_barras);
      setValue("tipo", product.tipo);
      setValue("formulacion", product.formulacion);
      setValue("emulsion", product.emulsion);
      setValue("tipo_emulsion", product.tipo_emulsion);
    }
  }, [product, setValue]);

  return (
    <form
      className="flex justify-center items-center flex-wrap"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl mb-5 w-full text-center">Editar SKU</h1>
      <div className="grid grid-cols-4 gap-5 mb-10">
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
            defaultValue={product.idFamilia || ""}
            {...register("id_familia", {
              required: true,
            })}
          >
            <MenuItem value="1">Jamones Granel</MenuItem>
            <MenuItem value="3">Jamones Rebanados</MenuItem>
            <MenuItem value="2">Salchichas Granel</MenuItem>
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
          {...register("tipo_rack", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="No. Rack"
          type="number"
          inputProps={{
            min: 0,
          }}
          size="small"
          {...register("no_rack_lote", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Kg Barra"
          type="number"
          inputProps={{
            min: 0,
          }}
          size="small"
          {...register("kg_barra", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="No. Barras"
          type="number"
          inputProps={{
            min: 0,
          }}
          size="small"
          {...register("no_barras", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Formulación"
          type="text"
          size="small"
          {...register("formulacion", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Emulsión"
          type="text"
          size="small"
          {...register("emulsion", { required: true })}
        />
        <TextField
          sx={{ width: "15rem" }}
          label="Tipo Emulsión"
          type="text"
          size="small"
          {...register("tipo_emulsion", { required: true })}
        />
      </div>
    </form>
  );
};

export default CapacityForm;
