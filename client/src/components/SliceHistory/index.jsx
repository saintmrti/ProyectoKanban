import _ from "lodash";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import moment from "moment-timezone";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlicedRequest } from "../../slices/sliced";
// import TableConsolidado from "../TableConsolidado";

import SlicedPlanTable from "./SlicedPlanTable";
// import { history } from "./dummyData";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const SliceHistory = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.sliced);
  const sliced = _.map(data, (pedido) => ({
    sku: pedido.producto,
    fecha: moment(pedido.fecha).format("YYYY-MM-DD"),
    pedido: pedido.pedido,
  }));
  const slicedByDate = _.groupBy(sliced, "fecha");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  useEffect(() => {
    dispatch(fetchSlicedRequest({ date }));
  }, []);
  return (
    <Paper sx={{ minHeight: "calc(100vh - 157px)", p: 2 }}>
      <div className="flex items-center mb-5">
        <Typography variant="h6" gutterBottom component="div">
          Acumulado Rebanados
        </Typography>
        <TextField
          id="date"
          label="Fecha"
          type="date"
          size="small"
          sx={{ ml: 5, width: "15rem" }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      {/* <TableConsolidado /> */}
      <div className="grid grid-cols-6 gap-2 mt-4">
        {_.map(slicedByDate, (item) => (
          <Card
            key={item[0].fecha}
            sx={{ maxWidth: 400, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
          >
            <SlicedPlanTable pedido={item} />
          </Card>
        ))}
      </div>
    </Paper>
  );
};

export default SliceHistory;
