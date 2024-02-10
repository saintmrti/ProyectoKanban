const moment = require("moment-timezone");
const time = moment().format("HH:mm:ss");

module.exports.getRequirements = async (conn, date) => {
  const { data } = await conn.query(`
    SELECT p.pedido, p.fecha, p.ajuste_carga, c.id, c.producto FROM Qualtia_Plan_rebanado AS p
    INNER JOIN Qualtia_Prod_producto_cat AS c
    ON c.id = p.idProducto WHERE CAST(fecha AS DATE) BETWEEN '${moment()
      .subtract(5, "days")
      .format("YYYY-MM-DD")}' AND '${date}';
  `);
  return data;
};

module.exports.insertRequirement = async (conn, { products, date }) => {
  dateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm:ss").format(
    "YYYY-MM-DD HH:mm:ss"
  );

  await conn.query(`
    DELETE FROM Qualtia_Plan_rebanado WHERE CAST(fecha AS DATE) = '${date}';
  `);

  await conn.query(`
    INSERT INTO Qualtia_Plan_rebanado (fecha, idProducto, ajuste_carga, pedido) VALUES
    ${products
      .map(
        (product) =>
          `('${dateTime}', ${product.idProducto}, ${product.ajuste_carga}, ${product.pedido})`
      )
      .join(",")} 
  `);

  const { data } = await conn.query(`
    SELECT * FROM Qualtia_Plan_rebanado WHERE CAST(fecha AS DATE) = '${date}';
  `);
  return data;
};
