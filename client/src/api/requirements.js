import axios, { CancelToken } from "axios";

export const fetchRequirementsApi = {
  cancel: null,
  run: () =>
    axios
      .get("/api/requerimiento", {
        cancelToken: new CancelToken((c) => (fetchRequirementsApi.cancel = c)),
      })
      .then(({ data }) => data),
};
