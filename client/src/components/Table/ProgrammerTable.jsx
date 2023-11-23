import _ from "lodash";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import moment from "moment-timezone";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
// import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";

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

const today = moment().format("DD MMM");
const tomorrow = moment().add(1, "days").format("DD MMM");

const ProgrammerTable = ({ list }) => {
  const theme = useTheme();
  const [plan, setPlan] = useState([]);
  const [load, setLoad] = useState(null);
  const [product, setProduct] = useState(null);

  const handleEditClick = (index) => {
    setProduct(index);
  };

  const handleSaveClick = () => {
    if (
      load !== null &&
      load !== undefined &&
      !isNaN(load) &&
      load.trim() !== ""
    ) {
      const loadValue = parseInt(load);
      if (!isNaN(loadValue)) {
        const updatedData = plan.map((row) =>
          row.idProducto === product
            ? {
                ...row,
                ajuste_carga: loadValue,
                pedido:
                  loadValue *
                  (_.find(list, { idProducto: row.idProducto })?.min_kg_carga ||
                    0),
              }
            : row
        );
        setPlan(updatedData);
      }
    }
    setProduct(null);
  };

  const calculateInvFinal3 = (inv_final_1, prox_salida, pedido) => {
    const invFinal1 = inv_final_1 || 0;
    const proxSalida = prox_salida || 0;
    const pedidoValue = pedido || 0;
    return invFinal1 + pedidoValue - proxSalida;
  };

  const calculateDifInvFinal = (inv_final_1, prox_salida, tiendita, pedido) => {
    const tienda = tiendita || 0;
    const invFinal3 = calculateInvFinal3(inv_final_1, prox_salida, pedido);
    return invFinal3 - tienda;
  };

  useEffect(() => {
    setPlan(
      _.map(list, (row) => ({
        idProducto: row.idProducto,
        sku: row.producto,
        ajuste_carga: 0,
        pedido: 0,
      }))
    );
  }, [list]);
  return (
    <TableContainer
      sx={{ maxHeight: 600, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">
              <b>SKU</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Minimo Kgs/Carga</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>BPT + CEDIS</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>WIP + Pgm {today}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Salida {today}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Inv Final 1</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Salida {tomorrow}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Inv Final 2</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Tienda</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Programar</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Ajuste Cargas</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Inv Final 3</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>Dif Inv Final</b>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(list, (row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center">{row.producto}</StyledTableCell>
              <StyledTableCell align="center">
                {row.min_kg_carga}
              </StyledTableCell>
              <StyledTableCell align="center">{row.bpt_cedis}</StyledTableCell>
              <StyledTableCell align="center">
                {row.wip_programa_hoy}
              </StyledTableCell>
              <StyledTableCell align="center">{row.salida_hoy}</StyledTableCell>
              <StyledTableCell align="center">
                {row.inv_final_1}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.prox_salida}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.inv_final_2}
              </StyledTableCell>
              <StyledTableCell align="center">{row.tiendita}</StyledTableCell>
              <StyledTableCell align="center">{row.programar}</StyledTableCell>
              <StyledTableCell align="center">
                {product && product === row?.idProducto ? (
                  <div className="flex justify-center items-center">
                    <TextField
                      sx={{ width: "8rem", mr: 1 }}
                      hiddenLabel
                      id="filled-hidden-label-small"
                      variant="outlined"
                      defaultValue={
                        _.find(plan, { idProducto: row?.idProducto })
                          ?.ajuste_carga
                      }
                      onChange={(e) => setLoad(e.target.value)}
                      size="small"
                    />
                    <Tooltip title="guardar">
                      <IconButton size="small" onClick={handleSaveClick}>
                        <SaveIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                ) : (
                  <div className="flex justify-center items-center">
                    {
                      _.find(plan, { idProducto: row?.idProducto })
                        ?.ajuste_carga
                    }
                    <Tooltip title="editar">
                      <IconButton
                        size="small"
                        onClick={() => handleEditClick(row.idProducto)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {calculateInvFinal3(
                  row?.inv_final_1,
                  row?.prox_salida,
                  _.find(plan, { idProducto: row?.idProducto })?.pedido
                )}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{
                  color:
                    calculateDifInvFinal(
                      row?.inv_final_1,
                      row?.prox_salida,
                      row?.tiendita,
                      _.find(plan, { idProducto: row?.idProducto })?.pedido
                    ) < 0
                      ? theme.palette.status.error
                      : theme.palette.status.success,
                }}
              >
                {calculateDifInvFinal(
                  row?.inv_final_1,
                  row?.prox_salida,
                  row?.tiendita,
                  _.find(plan, { idProducto: row?.idProducto })?.pedido
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProgrammerTable;
