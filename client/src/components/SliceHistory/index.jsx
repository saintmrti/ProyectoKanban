import _ from "lodash";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import SlicedPlanTable from "./SlicedPlanTable";
import { history } from "./dummyData";
import { Typography } from "@mui/material";

const SliceHistory = () => {
  return (
    <Paper sx={{ minHeight: "calc(100vh - 157px)", p: 2 }}>
      <div className="flex items-center mb-5">
        <Typography variant="h6" gutterBottom component="div">
          Historial de pedidos
        </Typography>
        <TextField
          id="date"
          label="Fecha"
          type="date"
          size="small"
          defaultValue="2023-11-06"
          sx={{ ml: 5, width: "15rem" }}
        />
      </div>
      <div className="grid grid-cols-6 gap-2">
        {_.map(history, (pedido, index) => (
          <Card
            key={index}
            sx={{ maxWidth: 400, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
          >
            <SlicedPlanTable pedido={pedido} />
          </Card>
        ))}
      </div>
    </Paper>
  );
};

export default SliceHistory;
