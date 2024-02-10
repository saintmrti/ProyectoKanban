import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";

const rows = [
  { name: "Horas por día:", tiempo: 18 },
  { name: "Minutos por día:", tiempo: 1080 },
];

export default function TablaTiempoSTD() {
  const theme = useTheme();
  return (
    <TableContainer
      component={Paper}
      sx={{
        overflowY: "auto",
        marginBottom: "0",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        width: "50%",
      }}
    >
      <Table sx={{ maxWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              colSpan={2}
              sx={{
                background: theme.palette.status.disabled,
                fontWeight: 600,
              }}
            >
              Tiem STD de Prod
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.tiempo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
