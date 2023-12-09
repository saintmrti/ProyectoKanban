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
