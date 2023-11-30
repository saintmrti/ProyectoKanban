const moment = require("moment-timezone");
const today = moment().format("YYYY-MM-DD");

module.exports.insertRequirement = async (conn, products) => {
  await conn.query(`
    INSERT INTO Qualtia_Prod_plan_rebanado (fecha, idProducto, ajuste_carga, pedido) VALUES
    ${products
      .map(
        (product) =>
          `('${today}', ${product.idProducto}, ${product.ajuste_carga}, ${product.pedido})`
      )
      .join(",")} 
  `);

  const { data } = await conn.query(`
    SELECT * FROM Qualtia_Prod_plan_rebanado WHERE fecha = '${today}';
  `);
  return data;
};
