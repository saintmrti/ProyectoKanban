import axios, { CancelToken } from "axios";

export const fetchProductionApi = {
  cancel: null,
  run: (date) =>
    axios
      .get("/api/produccion", {
        cancelToken: new CancelToken((c) => (fetchProductionApi.cancel = c)),
        params: { date },
      })
      .then(({ data }) => data),
};

export const insertProductionApi = {
  cancel: null,
  run: (prod) =>
    axios
      .post("/api/produccion", prod, {
        cancelToken: new CancelToken((c) => (insertProductionApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const deleteProductionApi = {
  cancel: null,
  run: (date) =>
    axios
      .delete("/api/produccion", {
        cancelToken: new CancelToken((c) => (deleteProductionApi.cancel = c)),
        params: { date },
      })
      .then(({ data }) => data),
};
