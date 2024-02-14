import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import moment from "moment-timezone";

export const getHistory = createSelector(
  ({ sliced }) => sliced.data,
  ({ requirement }) => requirement.data,
  (sliced, requirement) => {
    if (_.isEmpty(sliced)) return {};
    const history = Object.values(
      sliced?.pedidos.reduce((acc, { producto, pedido, fecha }) => {
        const dayOfWeek = moment(fecha).utc().format("dddd");
        const skuData = acc[producto] || {
          sku: producto,
          plan: _.find(requirement, { producto: producto })?.plan_ajustado || 0,
          lunes: null,
          martes: null,
          miercoles: null,
          jueves: null,
          viernes: null,
          sabado: null,
          total: 0,
          dif: 0,
        };
        switch (dayOfWeek) {
          case "Monday":
            skuData.lunes = pedido;
            break;
          case "Tuesday":
            skuData.martes = pedido;
            break;
          case "Wednesday":
            skuData.miercoles = pedido;
            break;
          case "Thursday":
            skuData.jueves = pedido;
            break;
          case "Friday":
            skuData.viernes = pedido;
            break;
          case "Saturday":
            skuData.sabado = pedido;
            break;
        }
        skuData.total += pedido;
        skuData.dif = skuData.plan === 0 ? 0 : skuData.plan - skuData.total;
        acc[producto] = skuData;
        return acc;
      }, {})
    );

    const data = _.map(sliced?.pedidos, (pedido) => ({
      sku: pedido.producto,
      fecha: moment(pedido.fecha).utc().format("YYYY-MM-DD"),
      pedido: pedido.pedido,
    }));
    const orderByDate = _.orderBy(data, "fecha", "asc");
    const slicedByDate = _.groupBy(orderByDate, "fecha");

    return {
      history,
      slicedByDate,
    };
  }
);
