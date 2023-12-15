import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import moment from "moment";

export const getProduction = createSelector(
  ({ production }) => production.data,
  (production) => {
    if (_.isEmpty(production)) return [];
    const groupByidProduccion = _.groupBy(production, "idProduccion");

    const orderByAsset = _.mapValues(groupByidProduccion, (value) => {
      return _.orderBy(value, ["activo_inicio"], ["desc"]);
    });

    const list = _.reduce(
      orderByAsset,
      (result, value) => {
        result.push({
          id: value[0].idProduccion,
          idProducto: value[0].idProducto,
          sec: value[0].secuencia,
          destino: value[0].destino,
          producto: value[0].producto,
          rack: value[0].rack,
          kg_lote: value[0].kg_lote,
          no_rack: value[0].no_rack,
          tipo_emulsion: value[0].tipo_emulsion,
          procesos: [
            {
              nombre: "Mezclado",
              inicio: moment.utc(value[0].mezclado).format("HH:mm"),
              fin: moment.utc(value[1].mezclado).format("HH:mm"),
            },
            {
              nombre: "Embutido",
              inicio: moment.utc(value[0].embutido).format("HH:mm"),
              fin: moment.utc(value[1].embutido).format("HH:mm"),
            },
            {
              nombre: "Cocimiento",
              inicio: moment.utc(value[0].cocimiento).format("HH:mm"),
              fin: moment.utc(value[1].cocimiento).format("HH:mm"),
            },
            {
              nombre: "Enfriamiento",
              inicio: moment.utc(value[0].enfriamiento).format("HH:mm"),
              fin: moment.utc(value[1].enfriamiento).format("HH:mm"),
            },
            {
              nombre: "Desmolde",
              inicio: moment.utc(value[0].desmolde).format("HH:mm"),
              fin: moment.utc(value[1].desmolde).format("HH:mm"),
            },
            {
              nombre: "Atemperado",
              inicio: moment.utc(value[0].atemperado).format("HH:mm"),
              fin: moment.utc(value[1].atemperado).format("HH:mm"),
            },
            {
              nombre: "Rebanado",
              inicio: moment.utc(value[0].rebanado).format("HH:mm"),
              fin: moment.utc(value[1].rebanado).format("HH:mm"),
            },
            {
              nombre: "Entrega",
              inicio: moment.utc(value[0].entrega).format("HH:mm"),
              fin: moment.utc(value[1].entrega).format("HH:mm"),
            },
          ],
        });
        return result;
      },
      []
    );

    const orderBySec = _.orderBy(list, ["sec"], ["asc"]);
    return orderBySec;
  }
);
