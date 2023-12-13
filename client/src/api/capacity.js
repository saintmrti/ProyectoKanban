import axios, { CancelToken } from "axios";

export const fetchCapacityApi = {
  cancel: null,
  run: () =>
    axios
      .get("/api/capacidad", {
        cancelToken: new CancelToken((c) => (fetchCapacityApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const insertCapacityApi = {
  cancel: null,
  run: (data) =>
    axios
      .post("/api/capacidad", data, {
        cancelToken: new CancelToken((c) => (insertCapacityApi.cancel = c)),
      })
      .then(({ data }) => data),
};

export const updateCapacityApi = {
  cancel: null,
  run: (data) =>
    axios
      .put("/api/capacidad", data, {
        cancelToken: new CancelToken((c) => (updateCapacityApi.cancel = c)),
      })
      .then(({ data }) => data),
};
