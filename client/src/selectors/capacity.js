import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

export const getCapacity = createSelector(
  ({ capacity }) => capacity.data,
  (capacity) => {
    if (_.isEmpty(capacity)) return {};
    const groupByLinea = _.groupBy(capacity, "idLinea");

    const list = _.mapValues(groupByLinea, (itemsInLinea) => {
      return _.groupBy(itemsInLinea, "idMaquina");
    });

    return list;
  }
);

export const getLinesProduction = createSelector(
  ({ capacity }) => capacity.data,
  (capacity) => {
    if (_.isEmpty(capacity)) return [];
    const list = _.values(capacity, "idLinea");
    const lines = _.uniqBy(list, "idLinea");
    return lines;
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
      };
    });

    const filterList = _.filter(list, (item) => {
      return item.idMaquina === 6;
    });

    return filterList;
  }
);
