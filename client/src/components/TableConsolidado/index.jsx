import { Fragment } from "react";
import _ from "lodash";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { useTheme } from "@mui/material/styles";

const data = [
{
    PRODUCTO: "X050B",
    BATCH: 1000,
    CANTIDAD: 3,
    TIPO_DE_RACK: "11 X 16",
    PROGRAMA: "EMBUTIDO",
    UNIDADES: "# CARGAS",
    LUNES: "-",
    MARTES: "-",
    MIERCOLES: 6,
    JUEVES: 6,
    VIERNES: 6,
    SABADO: "-",
    Total: 18,
    "Plan 14W": "-",
    "Saldo Plan 14W": -4000,
  },
  {
    PRODUCTO: "X050B",
    BATCH: 1000,
    CANTIDAD: 3,
    TIPO_DE_RACK: "11 X 16",
    PROGRAMA: "REBANADO",
    UNIDADES: "KG",
    LUNES: "-",
    MARTES: "-",
    MIERCOLES: 6000,
    JUEVES: 6000,
    VIERNES: 6000,
    SABADO: "-",
    Total: 18000,
    "Plan 14W": 14000,
    "Saldo Plan 14W": -4000,
  },
  {
    PRODUCTO: "X135",
    BATCH: 1000,
    CANTIDAD: 3,
    TIPO_DE_RACK: "11 X 16",
    PROGRAMA: "EMBUTIDO",
    UNIDADES: "# CARGAS",
    LUNES: "-",
    MARTES: "-",
    MIERCOLES: "-",
    JUEVES: "-",
    VIERNES: "-",
    SABADO: "-",
    Total: 0,
    "Plan 14W": 0,
    "Saldo Plan 14W": 0,
  },
  {
    PRODUCTO: "X135",
    BATCH: 1000,
    CANTIDAD: 3,
    TIPO_DE_RACK: "11 X 16",
    PROGRAMA: "REBANADO",
    UNIDADES: "KG",
    LUNES: "-",
    MARTES: "-",
    MIERCOLES: "-",
    JUEVES: "-",
    VIERNES: "-",
    SABADO: "-",
    Total: 0,
    "Plan 14W": 0,
    "Saldo Plan 14W": 0,
  },
  {
    PRODUCTO: "11039",
    BATCH: 1000,
    CANTIDAD: 2,
    TIPO_DE_RACK: "11 X 16",
    PROGRAMA: "EMBUTIDO",
    UNIDADES: "# CARGAS",
    LUNES: 2,
    MARTES: "-",
    MIERCOLES: "-",
    JUEVES: "-",
    VIERNES: "-",
    SABADO: "-",
    Total: 2,
    "Plan 14W": 0,
    "Saldo Plan 14W": 0,
  },
  {
    PRODUCTO: "11039",
    BATCH: 1000,
    CANTIDAD: 2,
    TIPO_DE_RACK: "11 X 16",
    PROGRAMA: "REBANADO",
    UNIDADES: "KG",
    LUNES: "-",
    MARTES: 2000,
    MIERCOLES: "-",
    JUEVES: "-",
    VIERNES: "-",
    SABADO: "-",
    Total: 2000,
    "Plan 14W": 1723,
    "Saldo Plan 14W": -277,
  },
  
];


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.hover,
    fontSize: 11,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
  },
}));

const TableConsolidado = () => {
  const theme = useTheme();
  const rubros = ["PRODUCTO", "BATCH", "CANTIDAD", "TIPO_DE_RACK", "PROGRAMA", "UNIDADES", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "Total", "Plan 14W", "Saldo Plan 14W"];

  return (
    <Paper>
      <TableContainer sx={{ maxHeight: "500px", width: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {rubros.map((rubro) => (
                <StyledTableCell key={rubro} align="center">
                  {rubro}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                    backgroundColor:
                      item?.tipo === 1 ? theme.palette.action.hover : "inherit",
                  }}
                >
                  {rubros.map((rubro, i) => (
                    <StyledTableCell key={i} align="center">
                      {item[rubro] !== undefined ? item[rubro] : "-"}
                    </StyledTableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableConsolidado;
