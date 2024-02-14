import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import { blue, green } from "@mui/material/colors";
import moment from "moment";

export default function SlicedPlanTable({ pedido }) {
  const theme = useTheme();
  return (
    <TableContainer>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={2}
              align="center"
              sx={{
                backgroundColor:
                  pedido[0].fecha === moment().format("YYYY-MM-DD")
                    ? green[600]
                    : theme.palette.primary.main,
                color: blue[50],
              }}
            >
              <div className="flex">
                <span className="font-bold">
                  {moment(pedido[0].fecha).format("dddd")}
                </span>
                <span className="ml-auto">{pedido[0].fecha}</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sku</TableCell>
            <TableCell align="center">Pedido&nbsp;(kg)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedido.map((row) => (
            <TableRow
              key={row.sku}
              // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.sku}
              </TableCell>
              <TableCell align="center">{row.pedido}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
