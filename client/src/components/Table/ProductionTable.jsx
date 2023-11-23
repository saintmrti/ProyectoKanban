import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import _ from "lodash";
import { Fragment } from "react";
import { styled } from "@mui/material/styles";

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

export default function ProductionTable({ data }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" colSpan={7}>
              Celda 2
            </StyledTableCell>
            {_.map(data[0].procesos, (proceso) => (
              <StyledTableCell key={proceso.nombre} align="center" colSpan={2}>
                {proceso.nombre}
              </StyledTableCell>
            ))}
          </TableRow>
          <TableRow>
            <StyledTableCell sx={{ width: "2rem" }}>
              <b>Sec</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Destino</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>SKU</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Rack</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Kg. Lote</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>No. Racks</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Tipo</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Inicio</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Fin</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Inicio</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Fin</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Inicio</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Fin</b>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(data, (row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.sec}
              </StyledTableCell>
              <StyledTableCell align="center">{row.destino}</StyledTableCell>
              <StyledTableCell align="center">{row.producto}</StyledTableCell>
              <StyledTableCell align="center">{row.rack}</StyledTableCell>
              <StyledTableCell align="center">{row.kg_lote}</StyledTableCell>
              <StyledTableCell align="center">{row.no_racks}</StyledTableCell>
              <StyledTableCell align="center">{row.tipo}</StyledTableCell>
              {_.map(row.procesos, (proceso) => (
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
  );
}