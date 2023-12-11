import { useState, useEffect } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { getCapacity, getLinesProduction } from "../../../selectors/capacity";

const GroupFilter = ({ setSelectedArr }) => {
  // const [searchText, setSearchText] = useState("");
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedSubGroup, setSelectedSubGroup] = useState();
  const [subGroupOptions, setSubGroupOptions] = useState([]);

  const data = useSelector(getCapacity);
  const lines = useSelector(getLinesProduction);

  const handleOnChangeGroup = (event) => {
    const { value } = event.target;
    setSelectedGroup(value);
  };

  const handleOnChangeSubGroup = (event) => {
    const { value } = event.target;
    setSelectedSubGroup(value);
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
    if (lines.length > 0) {
      setSelectedGroup(lines[0]?.idLinea);
    }
  }, [lines]);

  useEffect(() => {
    if (selectedGroup) {
      const values = _.values(data[selectedGroup]);
      setSelectedSubGroup(values[0][0].idMaquina);
      setSubGroupOptions(values);
    }
  }, [selectedGroup, data]);

  useEffect(() => {
    if (selectedSubGroup) {
      setSelectedArr(data[selectedGroup][selectedSubGroup]);
    }
  }, [selectedSubGroup, data, selectedGroup, setSelectedArr]);

  return (
    <>
      <FormControl sx={{ width: "15rem", mr: 2 }} size="small">
        <InputLabel id="filtro-linea">Linea</InputLabel>
        <Select
          labelId="filtro-linea"
          id="linea"
          value={selectedGroup || ""}
          label="Select List"
          onChange={handleOnChangeGroup}
        >
          {_.map(lines, (linea) => (
            <MenuItem key={linea.idLinea} value={linea.idLinea}>
              {linea.linea}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: "15rem" }} size="small">
        <InputLabel id="list-selector-label">Maquina</InputLabel>
        <Select
          labelId="list-selector-label"
          id="list-selector"
          value={selectedSubGroup || ""}
          label="Select List"
          onChange={handleOnChangeSubGroup}
        >
          {_.map(subGroupOptions, (machine) => (
            <MenuItem key={machine[0].idMaquina} value={machine[0].idMaquina}>
              {machine[0].maquina}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default GroupFilter;
