import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

export const getRequirement = createSelector(
  ({ requirement }) => requirement.data,
  (requirement) => {
    if (_.isEmpty(requirement)) return {};

    const family1 = [
      "X010",
      "X479",
      "X971",
      "81128",
      "81135",
      "X084",
      "X115",
      "X282",
      "X286",
      "X302",
      "X512",
      "x916",
      "10735",
      "X949",
      "X982",
      "X408",
      "X430",
      "X201",
    ];
    const list = _.map(requirement, (item) => {
      const inv_final_1 =
        item.bpt_cedis + item.wip_programa_hoy - item.salida_hoy;
      const inv_final_2 = inv_final_1 - item.prox_salida;
      const programar =
        inv_final_2 < 0
          ? item.tiendita + -inv_final_2
          : item.tiendita - inv_final_2;
      return {
        ...item,
        inv_final_1,
        inv_final_2,
        programar,
      };
    });

    const filtered1 = _.filter(list, (item) =>
      _.includes(family1, item.producto)
    );

    const filteredByFamily1 = _.uniqBy(filtered1, "producto");

    return {
      list,
      filteredByFamily1,
    };
  }
);
