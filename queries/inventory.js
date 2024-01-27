const moment = require("moment-timezone");
const today = moment().format("YYYY-MM-DD");

module.exports.getSummary = async (conn) => {
  const { data: productos } = await conn.query(`
    SELECT * FROM Qualtia_Prod_producto_cat;
  `);

  const { data: inv_nacional } = await conn.query(`
    SELECT * FROM Qualtia_Prod_inv_nacional
    WHERE fecha = '2024-01-25';
  `);

  const { data: req_ayer } = await conn.query(`
    SELECT * FROM Qualtia_Prod_requerimiento
    WHERE CONVERT(date, fecha) = '2024-01-24';
  `);

  const { data: req_hoy } = await conn.query(`
    SELECT * FROM Qualtia_Prod_requerimiento
    WHERE CONVERT(date, fecha) = '2024-01-25';
  `);

  const { data: wip_programa } = await conn.query(`
    SELECT * FROM Qualtia_Plan_pedido
    WHERE fecha = '2024-01-25';
  `);

  const { data: tn } = await conn.query(`
    SELECT * FROM Qualtia_Prod_tienda
    WHERE fecha = '2023-12-01';
  `);

  return {
    productos,
    inv_nacional,
    req_ayer,
    req_hoy,
    wip_programa,
    tn,
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
              `('2023-12-01', ${id}, ${inv_bpt}, ${inv_cedis}, ${bpt_cedis}, ${tiendita}, ${prox_salida}, ${min_kg_carga}, ${salida_hoy}, ${wip_programa_hoy})`
          )
          .join(",")}
      `);
    const { data } = await conn.query(`
      SELECT * FROM Qualtia_Prod_inv_req WHERE fecha = '2023-12-01';
    `);
    return data;
  }
};
