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
