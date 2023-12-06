import _ from "lodash";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
// import { useTheme } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";

import GroupFilter from "../GroupFilter";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.hover,
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
}));

const CapacityTable = ({ data }) => {
  //   const theme = useTheme();
  const [selectedArr, setSelectedArr] = useState([]);
  //   const [load, setLoad] = useState(null);
  //   const [filteredPlan, setFilteredPlan] = useState([]);
  //   const [product, setProduct] = useState(null);
  //   const handleEditClick = (index) => {
  //     setProduct(index);
  //   };

  return (
    <Box sx={{ height: "calc(100vh - 112px)" }}>
      <Paper sx={{ width: "100%", height: "100%", overflow: "hidden", p: 2 }}>
        <div className="flex justify-between w-full">
          <Typography variant="h6" sx={{ mb: 2 }}>
            Capacidad
          </Typography>
          <div className="ml-auto flex items-center">
            <GroupFilter data={data} setSelectedArr={setSelectedArr} />
          </div>
        </div>
        {console.log(selectedArr)}
        <TableContainer
          sx={{
            maxHeight: "calc(100% - 45px)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <b>SKU</b>
                </StyledTableCell>
                <StyledTableCell>
                  <b>Clasificación Familia</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Tamaño de Lote</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Tipo de Rack</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b># Rack por Lote</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Peso de Barra</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Cantidad de Barras</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Alineación Formulación</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Alineación Emulsión</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Tipo Emulsión</b>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(data, (row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{row.sku}</StyledTableCell>
                  <StyledTableCell>{row.familia}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.tamano_lote}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.tipo_rack}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.no_rack_lote}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.peso_promedio_barra}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.cantidad_barras}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.formulacion}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.emulsion}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.tipo_emulsion}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CapacityTable;
