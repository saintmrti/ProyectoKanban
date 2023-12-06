import _ from "lodash";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const GroupFilter = ({ setSelectedArr, data }) => {
  const [searchText, setSearchText] = useState("");

  const handleListChange = (event) => {
    const { value } = event.target;
    switch (value) {
      case "family1":
        setSelectedArr(data?.celda_1);
        break;
    }
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchText(value);

    if (value) {
      setSelectedArr(
        data.filter((item) =>
          item.producto.toLowerCase().startsWith(value.toLowerCase())
        )
      );
    } else {
      setSelectedArr(data);
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
        id="product-search"
        label="Buscar Sku"
        variant="outlined"
        size="small"
        value={searchText}
        onChange={handleSearchChange}
        sx={{ width: "15rem", mr: 2 }}
      />
      <FormControl sx={{ width: "15rem", mr: 2 }} size="small">
        <InputLabel id="filtro-negativos">Grupo</InputLabel>
        <Select
          labelId="filtro-negativos"
          id="negativos"
          defaultValue="formulacion"
          label="Select List"
          onChange={handleListChange}
        >
          <MenuItem value="formulacion">Formulacion</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: "15rem" }} size="small">
        <InputLabel id="list-selector-label">Maquina</InputLabel>
        <Select
          labelId="list-selector-label"
          id="list-selector"
          defaultValue="celda_1"
          label="Select List"
          onChange={handleListChange}
        >
          <MenuItem value="celda_1">Celda 1</MenuItem>
          <MenuItem value="celda_2">Celda 2</MenuItem>
          <MenuItem value="celda_3">Celda 3</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default GroupFilter;
