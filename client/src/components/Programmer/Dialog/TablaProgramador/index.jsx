import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
// import Typography from "@mui/material/Typography";
// import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { styled } from "@mui/material/styles";

import { datosParaTiempoDeCambio } from "./data";
//Tabla que consulta Hoja "Tiempos de rebanado concentrado"
const tiempos_de_rebanado = [
  { SKU: "X198", KgPorHora: 1620 },
  { SKU: "X168", KgPorHora: 1620 },
  { SKU: "X169", KgPorHora: 1620 },
  { SKU: "X396", KgPorHora: 1512 },
  { SKU: "71033", KgPorHora: 1398.6 },
  { SKU: "51793", KgPorHora: 1296 },
  { SKU: "10902", KgPorHora: 1512 },
  { SKU: "X220", KgPorHora: 1620 },
  { SKU: "X328", KgPorHora: 680.4 },
  { SKU: "X329", KgPorHora: 680.4 },
  { SKU: "10155", KgPorHora: 1215 },
  { SKU: "11121", KgPorHora: 1409.4 },
  { SKU: "11022", KgPorHora: 1296 },
  { SKU: "10407", KgPorHora: 1215 },
  { SKU: "X519", KgPorHora: 1215 },
  { SKU: "X450", KgPorHora: 1215 },
  { SKU: "X210", KgPorHora: 1620 },
  { SKU: "X450RG", KgPorHora: 1080 },
  { SKU: "X135", KgPorHora: 594 },
  { SKU: "X050B", KgPorHora: 1620 },
  { SKU: "11060", KgPorHora: 1152 },
  { SKU: "11039", KgPorHora: 1152 },
  { SKU: "X444", KgPorHora: 1296 },
  { SKU: "X452", KgPorHora: 1296 },
  { SKU: "X460", KgPorHora: 1296 },
  { SKU: "53858", KgPorHora: 1296 },
];
//Tabla que consulta hoja "Lead Time"
// const datosLeadTime = [
//   { SKU: "10155", tiempoTotalHrs: 17.4 },
//   { SKU: "11022", tiempoTotalHrs: 17.4 },
//   { SKU: "X450", tiempoTotalHrs: 17.6 },
//   { SKU: "X519", tiempoTotalHrs: 17.6 },
//   { SKU: "10407", tiempoTotalHrs: 16.0 },
//   { SKU: "51793", tiempoTotalHrs: 14.2 },
//   { SKU: "X135", tiempoTotalHrs: 15.2 },
//   { SKU: "X050B", tiempoTotalHrs: 14.1 },
//   { SKU: "X444", tiempoTotalHrs: 28.2 },
//   { SKU: "53858", tiempoTotalHrs: 20.2 },
//   { SKU: "11060", tiempoTotalHrs: 27.9 },
//   { SKU: "11039", tiempoTotalHrs: 22.0 },
//   { SKU: "X460", tiempoTotalHrs: 20.2 },
//   { SKU: "X452", tiempoTotalHrs: 20.2 },
//   { SKU: "X168", tiempoTotalHrs: 14.7 },
//   { SKU: "X198", tiempoTotalHrs: 14.7 },
//   { SKU: "X169", tiempoTotalHrs: 12.5 },
//   { SKU: "X328", tiempoTotalHrs: 14.7 },
//   { SKU: "X329", tiempoTotalHrs: 16.6 },
//   { SKU: "X220", tiempoTotalHrs: 14.1 },
//   { SKU: "X210", tiempoTotalHrs: 12.0 },
//   { SKU: "71033", tiempoTotalHrs: 13.6 },
// ];
//Nombre de las columnas de la tabla principal
const columns = [
  //"Hra de Formulación",
  //"Hora Rebanado inicio",
  //"Hora Rebanado final",
  "PRIORIDAD",
  "sku",
  "pedido",
  "barras",
  "KG/HR",
  "HR UTILIZADA",
  "Tiempos STD de producción",
  "Tiempo de cambio",
  "MIN UTILIZADOS",
  //"Break MIN",
  //"Comida MIN",
  //"Lead Time",
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontWeight: 600,
    textAlign: "center",
    fontSize: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Cell({ value, setRealPlan, row }) {
  const [editableValue, setEditableValue] = useState(value);
  const handleChange = (event) => {
    setEditableValue(event.target.value);
  };
  const handleFoco = () => {
    if (setRealPlan) {
      setRealPlan((prevPlan) => {
        const updatedArrayPlan = prevPlan.map((item) =>
          item.idProducto === row.idProducto
            ? { ...item, pedido: editableValue }
            : item
        );
        return updatedArrayPlan;
      });
    }
  };

  return setRealPlan ? (
    <StyledTableCell align="center" sx={{ width: "10%" }}>
      <Input
        type="number"
        value={editableValue}
        onChange={handleChange}
        onBlur={handleFoco}
        style={{ fontSize: "inherit" }}
      />
    </StyledTableCell>
  ) : (
    <StyledTableCell align="center">{value}</StyledTableCell>
  );
}

function obtenerKgHr(skuBuscado) {
  if (!skuBuscado) return 0;
  const resultado = tiempos_de_rebanado.filter(
    (dato) => dato.SKU === skuBuscado
  );
  return resultado.length > 0 ? resultado[0].KgPorHora : 0;
}
function obtenerTiempodeCambio(fila, columna) {
  if (datosParaTiempoDeCambio[fila] && datosParaTiempoDeCambio[fila][columna]) {
    return datosParaTiempoDeCambio[fila][columna];
  } else {
    return 0;
  }
}
// function obtenerLeadTime(skuBuscado) {
//   if (!skuBuscado) return 0;
//   const resultado = datosLeadTime.filter((dato) => dato.SKU === skuBuscado);
//   return resultado.length > 0 ? resultado[0].tiempoTotalHrs : 0;
// }

export default function TablaProgramador({
  dataInicial,
  setDatosParaTablaRes,
  setRealPlan,
}) {
  const [data, setData] = useState(dataInicial);
  const [totales, setTotales] = useState({
    totalKgPlan: 0,
    barrasTotales: 0,
    totalKgHr: 0,
    totalHrUtilizada: 0,
    totalTiemposSTDdeProduccion: 0,
    totalTiempoDeCambio: 0,
    totalMinUtilizados: 0,
  });

  useEffect(() => {
    let sumaMinUtilizados = 0;
    const newData = data.map((obj, index, arr) => {
      let skuActual = obj["sku"];
      let skuAnterior = index > 0 ? arr[index - 1]["sku"] : "";
      let kgHr = obtenerKgHr(obj["sku"]);
      let hrUtilizada = kgHr === 0 ? 0 : obj["pedido"] / kgHr;
      let tiemSTDdeProduccion =
        obj["sku"] !== ""
          ? moment.duration(7, "minutes")
          : moment.duration(0, "minutes");
      let tiempoDeCambio =
        index === 0 ? 0 : obtenerTiempodeCambio(skuAnterior, skuActual);
      let minUtilizados = moment
        .duration(hrUtilizada, "hours")
        .add(tiempoDeCambio, "minutes")
        .add(tiemSTDdeProduccion, "minutes");
      let barras = 10;
      /*
      let leadTime = obtenerLeadTime(obj["sku"]);
      let hraRebadoInicio =
        index === 0
          ? moment("1900-01-01T06:00:00")
          : anterior[index - 1].clone().add(tiempoDeCambio);
      let hraRebadoFinal = hraRebadoInicio
        .clone()
        .add(moment.duration(hrUtilizada, "hours"))
        .add(tiemSTDdeProduccion)
        .add(moment.duration(obj["Break MIN"], "minutes"))
        .add(moment.duration(obj["Comida MIN"], "minutes"));
      anterior.push(hraRebadoFinal.clone());
      
      let hraFormulacion = hraRebadoInicio
        .clone()
        .subtract(moment.duration(leadTime, "hours"))
        .add(24, "hours");
      */
      sumaMinUtilizados += minUtilizados.asMinutes();
      setTotales((prevTotales) => {
        return {
          ...prevTotales,
          totalKgPlan: prevTotales.totalKgPlan + obj["pedido"],
          barrasTotales: prevTotales.barrasTotales + barras,
          totalKgHr: prevTotales.totalKgHr + kgHr,
          totalHrUtilizada: prevTotales.totalHrUtilizada + hrUtilizada,
          totalTiemposSTDdeProduccion:
            prevTotales.totalTiemposSTDdeProduccion +
            tiemSTDdeProduccion.asMinutes(),
          totalTiempoDeCambio: prevTotales.totalTiempoDeCambio + tiempoDeCambio,
          totalMinUtilizados: sumaMinUtilizados,
        };
      });

      return {
        ...obj,
        //"Hora Rebanado inicio": hraRebadoInicio.format("HH:mm"),
        //"Hora Rebanado final": hraRebadoFinal.format("HH:mm"),
        PRIORIDAD: index + 1,
        "KG/HR": kgHr,
        "HR UTILIZADA": hrUtilizada.toFixed(1),
        "Tiempos STD de producción": tiemSTDdeProduccion.asMinutes(),
        "Tiempo de cambio": tiempoDeCambio === 0 ? 0 : tiempoDeCambio,
        "MIN UTILIZADOS": minUtilizados.asMinutes().toFixed(1),
        barras: barras,
        //"Lead Time": leadTime,
        //"Hra de Formulación": hraFormulacion.format("HH:mm"),
      };
    });
    setData(newData);
    setDatosParaTablaRes(sumaMinUtilizados);
  }, []);
  return (
    <TableContainer
      component={Paper}
      sx={{
        overflowY: "auto",
        marginBottom: "0",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Table sx={{ minWidth: 80 }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            {/*<StyledTableCell_1
              align="center"
              sx={{ background: `#FFFFFF` }}
              colSpan={1}
            >
              Dia de la Semana:
            </StyledTableCell_1>
            <StyledTableCell_1
              align="center"
              sx={{ background: `#FFC300` }}
              colSpan={1}
            >
              Viernes
            </StyledTableCell_1>
            <StyledTableCell_1
              align="center"
              sx={{ background: `#FFFFFF` }}
              colSpan={1}
            ></StyledTableCell_1>
            <StyledTableCell_1
              align="center"
              sx={{ background: `#FFFFFF` }}
              colSpan={1}
            ></StyledTableCell_1>*/}
            {/*<StyledTableCell_1
              align="center"
              sx={{ background: `#FFFFFF` }}
              colSpan={1}
            ></StyledTableCell_1>
            <StyledTableCell_1
              align="center"
              sx={{ background: `#FFFFFF` }}
              colSpan={1}
            ></StyledTableCell_1>
            <StyledTableCell_1
              align="center"
              sx={{ background: `#FFFFFF` }}
              colSpan={1}
            ></StyledTableCell_1>*/}
          </TableRow>
          <TableRow>
            <StyledTableCell align="left" colSpan={1}>
              Prioridad
            </StyledTableCell>
            <StyledTableCell align="left" colSpan={1}>
              SKU
            </StyledTableCell>
            <StyledTableCell
              align="left"
              colSpan={1}
              style={{ minWidth: "6rem" }}
            >
              KG Plan
            </StyledTableCell>
            <StyledTableCell align="left" colSpan={1}>
              # Barras <br /> Ingresar
            </StyledTableCell>
            <StyledTableCell align="left" colSpan={1}>
              KG/HR
            </StyledTableCell>
            <StyledTableCell align="left" colSpan={1}>
              HR Utilizada
            </StyledTableCell>
            <StyledTableCell align="left" colSpan={1}>
              Tiempo STD <br /> de Producción
            </StyledTableCell>
            <StyledTableCell align="left" colSpan={1}>
              Tiempo de <br /> Cambio
            </StyledTableCell>
            <StyledTableCell align="left" colSpan={1}>
              Minutos <br /> Utilizados
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {columns.map((column) => (
                <Cell
                  key={column}
                  value={row[column]}
                  setRealPlan={column === "pedido" ? setRealPlan : undefined}
                  row={row}
                />
              ))}
            </StyledTableRow>
          ))}
          <StyledTableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>
              <b>Totales</b>
            </StyledTableCell>
            <StyledTableCell>
              <b>{totales.totalKgPlan}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.barrasTotales}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.totalKgHr}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.totalHrUtilizada.toFixed(1)}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.totalTiemposSTDdeProduccion}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.totalTiempoDeCambio}</b>
            </StyledTableCell>
            <StyledTableCell align="center">
              <b>{totales.totalMinUtilizados.toFixed(1)}</b>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
