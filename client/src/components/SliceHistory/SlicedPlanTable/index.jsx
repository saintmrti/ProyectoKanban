import _ from "lodash";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { blue } from "@mui/material/colors";

export default function SlicedPlanTable({ pedido }) {
  const list = _.values(pedido)[0];
  const day = _.keys(pedido)[0];
  const date = _.values(pedido)[1];
  const theme = useTheme();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={2}
              align="center"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: blue[50],
              }}
            >
              <div className="flex">
                <span className="font-bold">{day}</span>
                <span className="ml-auto">{date}</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Sku</TableCell>
            <TableCell align="center">Pedido&nbsp;(kg)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
