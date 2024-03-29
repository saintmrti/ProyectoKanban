import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const dataInicial = [
  { SKU: "X010", "Plan Ajustado": 2754 },
  { SKU: "X479", "Plan Ajustado": 1723 },
  { SKU: "X971", "Plan Ajustado": 5821 },
  { SKU: "X010", "Plan Ajustado": 2754 },
  { SKU: "X479", "Plan Ajustado": 1723 },
  { SKU: "X971", "Plan Ajustado": 5821 },
  { SKU: "X010", "Plan Ajustado": 2754 },
  { SKU: "X479", "Plan Ajustado": 1723 },
  { SKU: "X971", "Plan Ajustado": 5821 },
  { SKU: "X010", "Plan Ajustado": 2754 },
  { SKU: "X479", "Plan Ajustado": 1723 },
  { SKU: "X971", "Plan Ajustado": 5821 },
  { SKU: "X010", "Plan Ajustado": 2754 },
  // { SKU: "X479", "Plan Ajustado": 1723 },
  // { SKU: "X971", "Plan Ajustado": 5821 },
  // { SKU: "X010", "Plan Ajustado": 2754 },
  // { SKU: "X479", "Plan Ajustado": 1723 },
  // { SKU: "X971", "Plan Ajustado": 5821 },
  // { SKU: "X010", "Plan Ajustado": 2754 },
  // { SKU: "X479", "Plan Ajustado": 1723 },
  // { SKU: "X971", "Plan Ajustado": 5821 },
  // { SKU: "X010", "Plan Ajustado": 2754 },
  // { SKU: "X479", "Plan Ajustado": 1723 },
  // { SKU: "X971", "Plan Ajustado": 5821 },
  // { SKU: "X010", "Plan Ajustado": 2754 },
  // { SKU: "X479", "Plan Ajustado": 1723 },
  // { SKU: "X971", "Plan Ajustado": 5821 },
  // { SKU: "X010", "Plan Ajustado": 2754 },
  // { SKU: "X479", "Plan Ajustado": 1723 },
  // { SKU: "X971", "Plan Ajustado": 5821 },
  // { SKU: "X010", "Plan Ajustado": 2754 },
  // { SKU: "X479", "Plan Ajustado": 1723 },
  // { SKU: "X971", "Plan Ajustado": 5821 },
  // { SKU: "X010", "Plan Ajustado": 2754 },
  // { SKU: "X479", "Plan Ajustado": 1723 },
  // { SKU: "X971", "Plan Ajustado": 5821 },
  // { SKU: "X010", "Plan Ajustado": 2754 },
  // { SKU: "X479", "Plan Ajustado": 1723 },
  // { SKU: "X971", "Plan Ajustado": 5821 },
  // { SKU: "X010", "Plan Ajustado": 2754 },
  // { SKU: "X479", "Plan Ajustado": 1723 },
  // { SKU: "X971", "Plan Ajustado": 5821 },
  // { SKU: "X010", "Plan Ajustado": 2754 },
  // { SKU: "X479", "Plan Ajustado": 1723 },
  // { SKU: "X971", "Plan Ajustado": 5821 },
  // { SKU: "X010", "Plan Ajustado": 2754 },
  // { SKU: "X479", "Plan Ajustado": 1723 },
  // { SKU: "X971", "Plan Ajustado": 5821 },
  // { SKU: "X010", "Plan Ajustado": 2754 },
  // { SKU: "X479", "Plan Ajustado": 1723 },
  // { SKU: "X971", "Plan Ajustado": 5821 },
  // { SKU: "X010", "Plan Ajustado": 2754 },
  // { SKU: "X479", "Plan Ajustado": 1723 },
  // { SKU: "X971", "Plan Ajustado": 5821 },
];

const columns = ["SKU", "Plan Ajustado"];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e2e2e2",
    color: "#13100c",
    fontWeight: 700,
    textAlign: "center",
    padding: "7px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    //Se cambio de odd a even
    backgroundColor: "rgba(223, 235, 237, 0.5)",
    textAlign: "center",
    padding: "5px",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Cell({ value }) {
  return <StyledTableCell align="center">{value}</StyledTableCell>;
}

export default function InventoryTable({ onClick }) {
  //const [data, setData] = useState(dataInicial);
  return (
    <TableContainer
      component={Paper}
      sx={{
        //width: "100%",
        overflowY: "auto",
        marginBottom: "0",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell align="left" key={column}>
                {column}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataInicial.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {columns.map((column) => (
                <Cell key={column} value={row[column]} />
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
