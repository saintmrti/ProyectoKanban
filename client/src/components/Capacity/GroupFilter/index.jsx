// import _ from "lodash";
import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import TextField from "@mui/material/TextField";
import { dataOptions } from "../CapacityTable/dummyData";

const selectOptions = Object.keys(dataOptions).map((key) => ({
  key: key,
  label: key.charAt(0).toUpperCase() + key.slice(1).replace("_", " "),
}));

const GroupFilter = ({ setSelectedArr }) => {
  // const [searchText, setSearchText] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(selectOptions[0].key);
  const [subGroupOptions, setSubGroupOptions] = useState([]);
  const [selectedSubGroup, setSelectedSubGroup] = useState("");

  const handleOnChangeGroup = (event) => {
    const { value } = event.target;
    setSelectedGroup(value);
  };

  const handleOnChangeSubGroup = (event) => {
    const { value } = event.target;
    setSelectedSubGroup(value);
    setSelectedArr(dataOptions[selectedGroup][value] || []);
  };

  // const handleSearchChange = (event) => {
  //   const { value } = event.target;
  //   setSearchText(value);

  //   if (value) {
  //     setSelectedArr(
  //       selectedArr.filter((item) =>
  //         item.sku.toLowerCase().startsWith(value.toLowerCase())
  //       )
  //     );
  //   } else {
  //     setSelectedArr(realGroup);
  //   }
  // };

  useEffect(() => {
    const subGroups = dataOptions[selectedGroup]
      ? Object.keys(dataOptions[selectedGroup])
      : [];
    setSubGroupOptions(subGroups);
    const firstSubGroup = subGroups[0] || "";
    setSelectedSubGroup(firstSubGroup);

    if (firstSubGroup) {
      setSelectedArr(dataOptions[selectedGroup][firstSubGroup]);
    } else {
      setSelectedArr([]);
    }
  }, [selectedGroup]);

  return (
    <>
      {/* <TextField
        id="product-search"
        label="Buscar Sku"
        variant="outlined"
        size="small"
        value={searchText}
        onChange={handleSearchChange}
        sx={{ width: "15rem", mr: 2 }}
      /> */}
      <FormControl sx={{ width: "15rem", mr: 2 }} size="small">
        <InputLabel id="filtro-negativos">Grupo</InputLabel>
        <Select
          labelId="filtro-negativos"
          id="negativos"
          value={selectedGroup}
          label="Select List"
          onChange={handleOnChangeGroup}
        >
          {selectOptions.map((opcion) => (
            <MenuItem key={opcion.key} value={opcion.key}>
              {opcion.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: "15rem" }} size="small">
        <InputLabel id="list-selector-label">Subgrupo</InputLabel>
        <Select
          labelId="list-selector-label"
          id="list-selector"
          value={selectedSubGroup}
          label="Select List"
          onChange={handleOnChangeSubGroup}
        >
          {subGroupOptions.map((subGroup) => (
            <MenuItem key={subGroup} value={subGroup}>
              {subGroup.charAt(0).toUpperCase() +
                subGroup.slice(1).replace("_", " ")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default GroupFilter;
