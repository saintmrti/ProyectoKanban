import _ from "lodash";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";

import { fetchSlicedRequest } from "../../slices/sliced";
import { fetchRequirementRequest } from "../../slices/requirement";
import AccumulatedSlice from "./AccumulatedSlice";
import SlicedPlanTable from "./SlicedPlanTable";
import { Spinner } from "../Spinner";
import { changeDate } from "../../slices/date";
import { getHistory } from "../../selectors/sliced";
import { Typography } from "@mui/material";
import { useEffect } from "react";

const SliceHistory = () => {
  const dispatch = useDispatch();
  const { date } = useSelector((state) => state.date);
  const { history, slicedByDate } = useSelector(getHistory);
  const { isFetching, didError } = useSelector((state) => state.sliced);
  const handleChangeDate = (newDate) => {
    dispatch(changeDate(newDate));
    dispatch(fetchRequirementRequest({ date: newDate }));
    dispatch(fetchSlicedRequest({ date: newDate }));
  };
  useEffect(() => {
    dispatch(fetchRequirementRequest({ date }));
    dispatch(fetchSlicedRequest({ date }));
  }, []);
  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : didError ? (
        <Typography>Error</Typography>
      ) : (
        <Paper sx={{ minHeight: "calc(100vh - 157px)", p: 2 }}>
          <div className="flex justify-between w-full mb-3">
            <Typography variant="h6" gutterBottom component="div">
              Acumulado Rebanado
            </Typography>
            <TextField
              id="date"
              label="Fecha"
              type="date"
              size="small"
              sx={{ ml: "auto", width: "15rem" }}
              value={date}
              onChange={(e) => handleChangeDate(e.target.value)}
            />
          </div>
          <AccumulatedSlice data={history} />
          <div className="grid grid-cols-6 gap-2 mt-4">
            {_.map(slicedByDate, (item) => (
              <Card
                key={item[0].fecha}
                sx={{
                  maxWidth: 400,
                  maxHeight: 400,
                  overflow: "auto",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                <SlicedPlanTable pedido={item} />
              </Card>
            ))}
          </div>
        </Paper>
      )}
    </>
  );
};

export default SliceHistory;
