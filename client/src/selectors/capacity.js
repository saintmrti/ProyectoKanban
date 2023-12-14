import { createSelector } from "@reduxjs/toolkit";
import moment from "moment-timezone";
import _ from "lodash";

export const getCapacity = createSelector(
  ({ capacity }) => capacity.data,
  (capacity) => {
    if (_.isEmpty(capacity)) return {};

    const capacityData = _.map(capacity, (item) => ({
      ...item,
      mezclado: item?.mezclado
        ? moment.utc(item.mezclado).format("HH:mm")
        : null,
      embutido: item?.embutido
        ? moment.utc(item.embutido).format("HH:mm")
        : null,
      cocimiento: item?.cocimiento
        ? moment.utc(item.cocimiento).format("HH:mm")
        : null,
      enfriamiento: item?.enfriamiento
        ? moment.utc(item.enfriamiento).format("HH:mm")
        : null,
      desmolde: item?.desmolde
        ? moment.utc(item.desmolde).format("HH:mm")
        : null,
      atemperado: item?.atemperado
        ? moment.utc(item.atemperado).format("HH:mm")
        : null,
      rebanado: item?.rebanado
        ? moment.utc(item.rebanado).format("HH:mm")
        : null,
      entrega: item?.entrega ? moment.utc(item.entrega).format("HH:mm") : null,
    }));

    const groupByLinea = _.groupBy(capacityData, "idLinea");

    const list = _.mapValues(groupByLinea, (itemsInLinea) => {
      return _.groupBy(itemsInLinea, "idMaquina");
    });

    return list;
  }
);

export const getLines = createSelector(
  ({ capacity }) => capacity.data,
  (capacity) => {
    if (_.isEmpty(capacity)) return [];
    const list = _.values(capacity, "idLinea");
    const lines = _.uniqBy(list, "idLinea");
    return lines;
  }
);

export const getMachines = createSelector(
  ({ capacity }) => capacity.data,
  (capacity) => {
    if (_.isEmpty(capacity)) return [];
    const machines = _.values(capacity, "idMaquina");
    const list = _.uniqBy(machines, "idMaquina");
    return list;
  }
);

export const getListSku = createSelector(
  ({ capacity }) => capacity.data,
  (capacity) => {
    if (_.isEmpty(capacity)) return [];
    const list = _.map(capacity, (item) => {
      return {
        ...item,
        label: item.sku,
        mezclado: item?.mezclado
          ? moment.utc(item.mezclado).format("HH:mm")
          : null,
        embutido: item?.embutido
          ? moment.utc(item.embutido).format("HH:mm")
          : null,
        cocimiento: item?.cocimiento
          ? moment.utc(item.cocimiento).format("HH:mm")
          : null,
        enfriamiento: item?.enfriamiento
          ? moment.utc(item.enfriamiento).format("HH:mm")
          : null,
        desmolde: item?.desmolde
          ? moment.utc(item.desmolde).format("HH:mm")
          : null,
        atemperado: item?.atemperado
          ? moment.utc(item.atemperado).format("HH:mm")
          : null,
        rebanado: item?.rebanado
          ? moment.utc(item.rebanado).format("HH:mm")
          : null,
        entrega: item?.entrega
          ? moment.utc(item.entrega).format("HH:mm")
          : null,
      };
    });
    const filterList = _.filter(list, (item) => {
      return item.idMaquina === 6;
    });

    return filterList;
  }
);

export const getSku = createSelector(
  ({ capacity }, idSku) => capacity.data[idSku],
  (product) => {
    if (!product) return {};
    return product;
  }
);
