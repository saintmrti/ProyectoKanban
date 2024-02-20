import { createSelector } from "@reduxjs/toolkit";
// import moment from "moment-timezone";
import _ from "lodash";

export const getCapacity = createSelector(
  ({ capacity }) => capacity.data,
  (capacity) => {
    if (_.isEmpty(capacity)) return {};

    const capacityData = _.map(capacity, (item) => ({
      ...item,
      procesos: [
        {
          nombre: "Ingredientes Secos",
          data: item.ingredientes_secos ? item.ingredientes_secos : null,
        },
        {
          nombre: "Salmuerizador",
          data: item.salmuerizador ? item.salmuerizador : null,
        },
        {
          nombre: "Corte y Deshuese",
          data: item.corte_deshuese_fresco ? item.corte_deshuese_fresco : null,
        },
        {
          nombre: "Emulsiones",
          data: item.emulsiones ? item.emulsiones : null,
        },
        {
          nombre: "Mezclado",
          data: item.mezclado ? item.mezclado : null,
        },
        {
          nombre: "Embutido",
          data: item.embutido ? item.embutido : null,
        },
        {
          nombre: "Cocimiento",
          data: item.cocimiento ? item.cocimiento : null,
        },
        {
          nombre: "Enfriamiento",
          data: item.enfriamiento ? item.enfriamiento : null,
        },
        {
          nombre: "Desmolde",
          data: item.desmolde ? item.desmolde : null,
        },
        {
          nombre: "Atemperado",
          data: item.atemperado ? item.atemperado : null,
        },
        {
          nombre: "Rebanado",
          data: item.rebanado ? item.rebanado : null,
        },
        {
          nombre: "Entrega",
          data: item.entrega ? item.entrega : null,
        },
      ],
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
        // ingredientes_secos: item?.ingredientes_secos
        //   ? convertMinutesAsHours(item.ingredientes_secos)
        //   : null,
        // salmuerizador: item?.salmuerizador
        //   ? convertMinutesAsHours(item.salmuerizador)
        //   : null,
        // corte_deshuese_fresco: item?.corte_deshuese_fresco
        //   ? convertMinutesAsHours(item.corte_deshuese_fresco)
        //   : null,
        // emulsiones: item?.emulsiones
        //   ? convertMinutesAsHours(item.emulsiones)
        //   : null,
        // mezclado: item?.mezclado ? convertMinutesAsHours(item.mezclado) : null,
        // embutido: item?.embutido ? convertMinutesAsHours(item.embutido) : null,
        // cocimiento: item?.cocimiento
        //   ? convertMinutesAsHours(item.cocimiento)
        //   : null,
        // enfriamiento: item?.enfriamiento
        //   ? convertMinutesAsHours(item.enfriamiento)
        //   : null,
        // desmolde: item?.desmolde ? convertMinutesAsHours(item.desmolde) : null,
        // atemperado: item?.atemperado
        //   ? convertMinutesAsHours(item.atemperado)
        //   : null,
        // rebanado: item?.rebanado ? convertMinutesAsHours(item.rebanado) : null,
        // entrega: item?.entrega ? convertMinutesAsHours(item.entrega) : null,
        // te_ingredientes_salmuera: item?.te_ingredientes_salmuera
        //   ? convertMinutesAsHours(item.te_ingredientes_salmuera)
        //   : null,
        // te_salmuera_mezclado: item?.te_salmuera_mezclado
        //   ? convertMinutesAsHours(item.te_salmuera_mezclado)
        //   : null,
        // te_emulsiones_mezclado: item?.te_emulsiones_mezclado
        //   ? convertMinutesAsHours(item.te_emulsiones_mezclado)
        //   : null,
        // te_cyd_emulsiones: item?.te_cyd_emulsiones
        //   ? convertMinutesAsHours(item.te_cyd_emulsiones)
        //   : null,
        // te_cyd_mezclado: item?.te_cyd_mezclado
        //   ? convertMinutesAsHours(item.te_cyd_mezclado)
        //   : null,
        // te_mezclado_embutido: item?.te_mezclado_embutido
        //   ? convertMinutesAsHours(item.te_mezclado_embutido)
        //   : null,
        // te_embutido_cocimiento: item?.te_embutido_cocimiento
        //   ? convertMinutesAsHours(item.te_embutido_cocimiento)
        //   : null,
        // te_cocimiento_enfriamiento: item?.te_cocimiento_enfriamiento
        //   ? convertMinutesAsHours(item.te_cocimiento_enfriamiento)
        //   : null,
        // te_enfriamiento_desmolde: item?.te_enfriamiento_desmolde
        //   ? convertMinutesAsHours(item.te_enfriamiento_desmolde)
        //   : null,
        // te_desmolde_atemperado: item?.te_desmolde_atemperado
        //   ? convertMinutesAsHours(item.te_desmolde_atemperado)
        //   : null,
        // te_atemperado_rebanado: item?.te_atemperado_rebanado
        //   ? convertMinutesAsHours(item.te_atemperado_rebanado)
        //   : null,
        // te_rebanado_entrega: item?.te_rebanado_entrega
        //   ? convertMinutesAsHours(item.te_rebanado_entrega)
        //   : null,
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

// function convertMinutesAsHours(minutos) {
//   const horas = Math.floor(minutos / 60);
//   const minutosRestantes = minutos % 60;
//   const horaFormateada = moment({
//     hour: horas,
//     minute: minutosRestantes,
//   }).format("HH:mm");
//   return horaFormateada;
// }
