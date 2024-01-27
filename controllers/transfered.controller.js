const _ = require("lodash");
const Connection = require("../connection/db");
const response = require("../helpers/response");

const { getSummary, insertInventory } = require("../queries/inventory");

module.exports.transfered = async (req, res) => {
  try {
    const cn = new Connection(false);
    const { productos, inv_nacional, req_ayer, req_hoy, wip_programa, tn } =
      await getSummary(cn);

    const newRegisters = _.map(productos, (producto) => {
      const bpt = _.find(
        inv_nacional,
        (i) =>
          i.bpt &&
          i.bpt.toUpperCase() === `PTAMTY${producto.producto}`.toUpperCase()
      );
      const cedis = _.find(
        inv_nacional,
        (i) =>
          i.cedis &&
          i.cedis.toUpperCase() === `CEDMTY${producto.producto}`.toUpperCase()
      );
      const req = _.find(
        req_ayer,
        (i) =>
          i.producto &&
          i.producto.toUpperCase() === producto.producto.toUpperCase()
      );
      const wip = _.find(
        wip_programa,
        (i) =>
          i.producto &&
          i.producto.toUpperCase() === producto.producto.toUpperCase()
      );
      const tienda = _.find(
        tn,
        (i) =>
          i.producto &&
          i.producto.toUpperCase() === producto.producto.toUpperCase()
      );

      const inv_bpt = bpt ? bpt?.inv_net_trans : 0;
      const inv_cedis = cedis ? cedis?.inv_net_trans : 0;
      // const tiendita = req ? req?.bptmy_maximo : 0;
      const tiendita = tienda ? tienda?.tiendita : 0;
      const prox_salida = req ? req?.total : 0;
      const min_kg_carga = wip ? wip?.min_kg_carga : 0;
      const salida_hoy = wip ? wip?.salida_hoy : 0;
      const wip_programa_hoy = wip ? wip?.wip : 0;

      return {
        ...producto,
        inv_bpt,
        inv_cedis,
        bpt_cedis: inv_bpt + inv_cedis,
        tiendita,
        prox_salida,
        min_kg_carga,
        salida_hoy,
        wip_programa_hoy,
      };
    });
    cn.close();
    res.status(200).json({
      success: true,
      data: req_ayer,
    });
    // response(res, false, insertInventory, newRegisters);
  } catch (error) {
    console.error(error);
    if (cn) cn.close();
    res.json(errorObj(error));
  }
};
