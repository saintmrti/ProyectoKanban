import axios, { CancelToken } from "axios";

export const fetchProductionApi = {
  cancel: null,
  run: (date) =>
    axios
      .get("https://qualtia-kanban.azurewebsites.net/api/production_orders", {
        cancelToken: new CancelToken((c) => (fetchProductionApi.cancel = c)),
        params: { fecha: date },
      })
      .then(({ data }) => data),
};

export const insertProductionApi = {
  cancel: null,
  run: (prod) =>
    axios
      .post(
        "https://qualtia-kanban.azurewebsites.net/api/production_orders",
        prod,
        {
          cancelToken: new CancelToken((c) => (insertProductionApi.cancel = c)),
        }
      )
      .then(({ data }) => data),
};

export const updateProductionApi = {
  cancel: null,
  run: (date) =>
    axios
      .get(
        "https://qualtia-kanban.azurewebsites.net/api/production_orders/activateKanban",
        {
          cancelToken: new CancelToken((c) => (updateProductionApi.cancel = c)),
          params: { fecha: date },
        }
      )
      .then(({ data }) => data),
};

export const deleteProductionApi = {
  cancel: null,
  run: (idProd) =>
    axios
      .delete(
        "https://qualtia-kanban.azurewebsites.net/api/production_orders",
        {
          cancelToken: new CancelToken((c) => (deleteProductionApi.cancel = c)),
          params: { idOrdenProduccion: idProd },
        }
      )
      .then(({ data }) => data),
};
