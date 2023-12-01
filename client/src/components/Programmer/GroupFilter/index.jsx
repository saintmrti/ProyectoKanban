import _ from "lodash";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const GroupFilter = ({ setFilteredPlan, plan }) => {
  const [searchText, setSearchText] = useState("");

  const handleListChange = (event) => {
    const { value } = event.target;
    switch (value) {
      case "all":
        setFilteredPlan(plan);
        break;
      case "family1":
        setFilteredPlan(_.filter(plan, (item) => item.idProducto < 20));
        break;
      case "family2":
        setFilteredPlan(
          _.filter(plan, (item) => item.idProducto > 20 && item.idProducto < 50)
        );
        break;
      case "family3":
        setFilteredPlan(
          _.filter(plan, (item) => item.idProducto > 49 && item.idProducto < 69)
        );
        break;
      case "family4":
        setFilteredPlan(
          _.filter(plan, (item) => item.idProducto > 68 && item.idProducto < 87)
        );
        break;
      case "family5":
        setFilteredPlan(_.filter(plan, (item) => item.idProducto > 86));
        break;
      case "familyN":
        setFilteredPlan(_.filter(plan, (item) => item.dif_inv_final < 0));
        break;
      default:
        setFilteredPlan(plan);
        break;
    }
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchText(value);

    if (value) {
      setFilteredPlan(
        plan.filter((item) =>
          item.producto.toLowerCase().startsWith(value.toLowerCase())
        )
      );
    } else {
      setFilteredPlan(plan);
    }
  };

  // useEffect(() => {
  //   if (plan && plan.length > 0) {
  //     const skus = plan.map((item) => item.producto);
  //     setUniqueSKUs(_.uniq(skus));
  //   }
  // }, [plan]);

  return (
    <>
      <TextField
        id="date"
        label="Fecha"
        type="date"
        size="small"
        defaultValue="2023-12-01"
        sx={{ mr: 2, width: "15rem" }}
      />
      <TextField
        id="product-search"
        label="Buscar Producto"
        variant="outlined"
        size="small"
        value={searchText}
        onChange={handleSearchChange}
        sx={{ width: "15rem", mr: 2 }}
      />
      <FormControl sx={{ width: "15rem", mr: 2 }} size="small">
        <InputLabel id="filtro-negativos">Ajustar</InputLabel>
        <Select
          labelId="filtro-negativos"
          id="negativos"
          defaultValue="all"
          label="Select List"
          onChange={handleListChange}
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="familyN">Negativos</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: "15rem", mr: 5 }} size="small">
        <InputLabel id="list-selector-label">Grupo</InputLabel>
        <Select
          labelId="list-selector-label"
          id="list-selector"
          defaultValue="all"
          label="Select List"
          onChange={handleListChange}
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="family1">Grupo 1</MenuItem>
          <MenuItem value="family2">Grupo 2</MenuItem>
          <MenuItem value="family3">Grupo 3</MenuItem>
          <MenuItem value="family4">Grupo 4</MenuItem>
          <MenuItem value="family5">Grupo 5</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default GroupFilter;
