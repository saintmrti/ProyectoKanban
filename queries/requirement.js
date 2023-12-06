const moment = require("moment-timezone");
const today = moment().format("YYYY-MM-DD");

module.exports.getSummary = async (conn) => {
  const { data } = await conn.query(`
      SELECT r.id, r.idProducto, p.producto, r.inv_bpt, r.inv_cedis, r.bpt_cedis,
      r.tiendita, r.prox_salida, r.min_kg_carga, r.salida_hoy, r.wip_programa_hoy
      FROM Qualtia_Prod_inv_req AS r
      INNER JOIN Qualtia_Prod_producto_cat AS p
      ON r.idProducto = p.id
      WHERE fecha = '2023-12-01';
    `);
  return data;
};

module.exports.insertRequirement = async (conn, products) => {};
