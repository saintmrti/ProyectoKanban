const moment = require("moment-timezone");
const today = moment().format("YYYY-MM-DD");

module.exports.getSummary = async (conn) => {
  const { data: productos } = await conn.query(`
    SELECT * FROM Qualtia_Prod_producto_cat;
    `);

  const { data: inv_nacional } = await conn.query(`
    SELECT * FROM Qualtia_Prod_inv_nacional;
    `);

  const { data: requerimiento } = await conn.query(`
    SELECT * FROM Qualtia_Prod_requerimiento;
    `);

  const { data: wip_programa } = await conn.query(`
    SELECT * FROM Qualtia_Prod_wip;
    `);

  return {
    productos,
    inv_nacional,
    requerimiento,
    wip_programa,
  };
};

module.exports.insertInventory = async (conn, invNacional) => {
  if (invNacional.length > 0) {
    await conn.query(`
        INSERT INTO Qualtia_Prod_inv_req (fecha, idProducto, inv_bpt, inv_cedis, bpt_cedis, tiendita, prox_salida, min_kg_carga, salida_hoy, wip_programa_hoy) VALUES
        ${invNacional
          .map(
            ({
              id,
              inv_bpt,
              inv_cedis,
              bpt_cedis,
              tiendita,
              prox_salida,
              min_kg_carga,
              salida_hoy,
              wip_programa_hoy,
            }) =>
              `('${today}', ${id}, ${inv_bpt}, ${inv_cedis}, ${bpt_cedis}, ${tiendita}, ${prox_salida}, ${min_kg_carga}, ${salida_hoy}, ${wip_programa_hoy})`
          )
          .join(",")}
      `);
    const { data } = await conn.query(`
      SELECT * FROM Qualtia_Prod_inv_req WHERE fecha = '${today}';
    `);
    return data;
  }
};
