import axios, { CancelToken } from "axios";

export const fetchProductionApi = {
  cancel: null,
  run: () =>
    axios
      .get("/api/produccion", {
        cancelToken: new CancelToken((c) => (fetchProductionApi.cancel = c)),
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
