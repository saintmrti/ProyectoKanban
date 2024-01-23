import { useState, Fragment } from "react";
import _ from "lodash";
// import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
// import { useTheme } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
// import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
// import Button from "@mui/material/Button";

import GroupFilter from "../GroupFilter";
import { dataTimings } from "./dummyData";

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

const CapacityTable = ({
  setEditProduct,
  setOpenAlert,
  setOpenForm,
  selectedArr,
  setDeleteProduct,
  setSelectedArr,
}) => {
  //   const theme = useTheme();

  const [timings, setTimings] = useState(false);

  const handleAddClick = () => {
    setOpenForm(true);
    setEditProduct(null);
  };

  const handleEditClick = (index) => {
    setEditProduct(index);
    setOpenForm(true);
  };

  const handleDeleteClick = (index) => {
    setDeleteProduct(index);
    setOpenAlert(true);
  };

  return (
    <Box sx={{ height: "calc(100vh - 112px)" }}>
      <Paper sx={{ width: "100%", height: "100%", overflow: "hidden", p: 2 }}>
        <div className="flex justify-between w-full">
          <Typography variant="h6" sx={{ mb: 2 }}>
            Capacidad
          </Typography>
          <div className="ml-auto flex items-center">
            <GroupFilter
              selectedArr={selectedArr}
              setSelectedArr={setSelectedArr}
            />
            {console.log(selectedArr)}
            <Tooltip title="Mostrar tiempos">
              <IconButton sx={{ ml: 1 }} onClick={() => setTimings(!timings)}>
                <AccessTimeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Agregar sku">
              <IconButton onClick={handleAddClick}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <TableContainer
          sx={{
            maxHeight: "calc(100% - 45px)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {timings ? (
                  <Fragment>
                    <StyledTableCell>
                      <b>SKU</b>
                    </StyledTableCell>
                    {_.map(dataTimings, (timing, index) => (
                      <StyledTableCell key={index} align="center">
                        <b>{timing}</b>
                      </StyledTableCell>
                    ))}
                    <StyledTableCell align="right">
                      <b>Acciones</b>
                    </StyledTableCell>
                  </Fragment>
                ) : (
                  <>
                    <StyledTableCell>
                      <b>SKU</b>
                    </StyledTableCell>
                    <StyledTableCell>
                      <b>Clasificación Familia</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>Lote (Kg)</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>Rack</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>No. Rack</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>Tipo Emulsión</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>Tina Emulsión</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>Tina Fresco</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>Tina Congelado</b>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <b>Acciones</b>
                    </StyledTableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {timings ? (
                _.map(selectedArr, (row) => {
                  return (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell>{row.sku}</StyledTableCell>
                      <StyledTableCell align="center">
                        {row?.mezclado}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row?.embutido}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row?.cocimiento}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row?.enfriamiento}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row?.desmolde}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row?.atemperado}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row?.rebanado}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row?.entrega}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <div className="flex items-center justify-end">
                          <IconButton
                            size="small"
                            onClick={() => handleEditClick(row.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(row.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <>
                  {_.map(selectedArr, (row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell>{row.sku}</StyledTableCell>
                      <StyledTableCell>{row.descripcion}</StyledTableCell>
                      <StyledTableCell align="center">
                        {row.kg_lote}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.rack}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.no_rack}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.tipo_emulsion}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.tinas_emulsion}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.tinas_fresco}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.tinas_congelado}
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className="flex items-center justify-end">
                          <IconButton
                            size="small"
                            onClick={() => handleEditClick(row.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(row.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CapacityTable;
