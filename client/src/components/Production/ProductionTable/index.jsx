import { Fragment } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import _ from "lodash";
import { IconButton } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.hover,
    fontWeight: "bold",
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

export default function ProductionTable({
  planProd,
  // procesoIndex,
  handleDeleteProd,
}) {
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer
        sx={{
          maxHeight: "calc(100vh - 250px)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"
                colSpan={
                  planProd.length > 0 && planProd[0]?.kanban === false ? 7 : 6
                }
              >
                Celda 2
              </StyledTableCell>
              {_.map(planProd[0]?.procesos, (proceso) => (
                <StyledTableCell
                  key={proceso.nombre}
                  sx={{ minWidth: 165 }}
                  align="center"
                  colSpan={2}
                >
                  {proceso.nombre}
                </StyledTableCell>
              ))}
            </TableRow>
            <TableRow>
              {planProd.length > 0 && planProd[0]?.kanban === false && (
                <StyledTableCell sx={{ width: "2rem", top: 57 }}>
                  <b>Acciones</b>
                </StyledTableCell>
              )}
              <StyledTableCell sx={{ top: 57 }} align="center">
                <b>SKU</b>
              </StyledTableCell>
              <StyledTableCell sx={{ top: 57 }} align="center">
                <b>Destino</b>
              </StyledTableCell>
              <StyledTableCell sx={{ top: 57, minWidth: 100 }} align="center">
                <b>Lote (kg)</b>
              </StyledTableCell>
              <StyledTableCell sx={{ top: 57, minWidth: 80 }} align="center">
                <b>Rack</b>
              </StyledTableCell>
              <StyledTableCell sx={{ top: 57, minWidth: 100 }} align="center">
                <b># Racks</b>
              </StyledTableCell>
              <StyledTableCell sx={{ top: 57 }} align="center">
                <b>Tipo</b>
              </StyledTableCell>
              {_.map(planProd[0]?.procesos, (proceso) => (
                <Fragment key={proceso.nombre}>
                  <StyledTableCell sx={{ top: 57 }} align="center">
                    <b>Inicio</b>
                  </StyledTableCell>
                  <StyledTableCell sx={{ top: 57 }} align="center">
                    <b>Fin</b>
                  </StyledTableCell>
                </Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(planProd, (row) => (
              <StyledTableRow key={row.id}>
                {planProd.length > 0 && planProd[0]?.kanban === false && (
                  <StyledTableCell align="center" component="th" scope="row">
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteProd(row.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </StyledTableCell>
                )}
                <StyledTableCell align="center">{row.producto}</StyledTableCell>
                <StyledTableCell align="center">{row.destino}</StyledTableCell>
                <StyledTableCell align="center">{row.kg_lote}</StyledTableCell>
                <StyledTableCell align="center">{row.rack}</StyledTableCell>
                <StyledTableCell align="center">{row.no_rack}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.tipo_emulsion}
                </StyledTableCell>
                {_.map(row?.procesos, (proceso) => (
                  <Fragment key={proceso.nombre}>
                    <StyledTableCell align="center">
                      {proceso.inicio}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {proceso.fin}
                    </StyledTableCell>
                  </Fragment>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
