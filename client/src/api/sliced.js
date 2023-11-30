import axios, { CancelToken } from "axios";

// export const fetchRequirementApi = {
//   cancel: null,
//   run: () =>
//     axios
//       .get("/api/requerimiento", {
//         cancelToken: new CancelToken((c) => (fetchRequirementApi.cancel = c)),
//       })
//       .then(({ data }) => data),
// };

export const insertSlicedApi = {
  cancel: null,
  run: (sliced) =>
    axios
      .post("/api/rebanado", sliced, {
        cancelToken: new CancelToken((c) => (insertSlicedApi.cancel = c)),
      })
      .then(({ data }) => data),
};
