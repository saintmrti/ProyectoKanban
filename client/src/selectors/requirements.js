import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";

export const getRequirements = createSelector(
  ({ requirements }) => requirements.data,
  (requirements) => {
    if (_.isEmpty(requirements)) return {};

    const list = _.map(requirements, (item) => {
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

    return list;
  }
);
