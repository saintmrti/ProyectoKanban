const moment = require("moment-timezone");
const today = moment().format("YYYY-MM-DD");

module.exports.getSummary = async (conn, date) => {
  const { data: productos } = await conn.query(`
    SELECT * FROM Qualtia_Prod_producto_cat;
  `);

  const { data: inv_nacional } = await conn.query(`
    SELECT * FROM Qualtia_Prod_inv_nacional
    WHERE CONVERT(date, fecha) = '${date}';
  `);

  const { data: requirement } = await conn.query(`
    SELECT * FROM Qualtia_Prod_requerimiento
    WHERE CONVERT(date, fecha) BETWEEN '${moment(date)
      .subtract(1, "days")
      .format("YYYY-MM-DD")}' AND '${date}';
  `);

  const { data: wip_programa } = await conn.query(`
    SELECT * FROM Qualtia_Plan_pedido
    WHERE CONVERT(date, fecha) = '${date}';
  `);

  const { data: pr } = await conn.query(`
    SELECT * FROM Qualtia_Prod_plan_rebanado
    WHERE CONVERT(date, fecha) =  '${date}';
  `);

  const { data: KgCarga } = await conn.query(`
    SELECT * FROM Qualtia_Prod_min_kg_carga
    WHERE CONVERT(date, fecha) = '2024-01-25';
  `);

  return {
    productos,
    inv_nacional,
    requirement,
    wip_programa,
    pr,
    KgCarga,
  };
};

// module.exports.insertInventory = async (conn, invNacional) => {
//   if (invNacional.length > 0) {
//     await conn.query(`
//         INSERT INTO Qualtia_Prod_inv_req (fecha, idProducto, inv_bpt, inv_cedis, bpt_cedis, tiendita, prox_salida, min_kg_carga, salida_hoy, wip_programa_hoy) VALUES
//         ${invNacional
//           .map(
//             ({
//               id,
//               inv_bpt,
//               inv_cedis,
//               bpt_cedis,
//               tiendita,
//               prox_salida,
//               min_kg_carga,
//               salida_hoy,
//               wip_programa_hoy,
//             }) =>
//               `('2023-12-01', ${id}, ${inv_bpt}, ${inv_cedis}, ${bpt_cedis}, ${tiendita}, ${prox_salida}, ${min_kg_carga}, ${salida_hoy}, ${wip_programa_hoy})`
//           )
//           .join(",")}
//       `);
//     const { data } = await conn.query(`
//       SELECT * FROM Qualtia_Prod_inv_req WHERE fecha = '2023-12-01';
//     `);
//     return data;
//   }
// };
