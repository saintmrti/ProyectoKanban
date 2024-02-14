const moment = require("moment-timezone");

module.exports.getRequirements = async (conn, date) => {
  const startDay = moment(date).startOf("week").format("YYYY-MM-DD");
  const endDay = moment(date)
    .endOf("week")
    .subtract(1, "day")
    .format("YYYY-MM-DD");
  const { data: pedido } = await conn.query(`
    SELECT p.pedido, p.fecha, p.ajuste_carga, c.id, c.producto FROM Qualtia_Plan_rebanado AS p
    INNER JOIN Qualtia_Prod_producto_cat AS c
    ON c.id = p.idProducto
    WHERE CAST(fecha AS DATE) = '${moment(date)
      .add(1, "day")
      .format("YYYY-MM-DD")}';
  `);
  const { data: pedidos } = await conn.query(`
    SELECT p.pedido, p.fecha, p.ajuste_carga, c.id, c.producto FROM Qualtia_Plan_rebanado AS p
    INNER JOIN Qualtia_Prod_producto_cat AS c
    ON c.id = p.idProducto
    WHERE CAST(fecha AS DATE) BETWEEN '${startDay}' AND '${endDay}';
  `);
  return {
    pedido,
    pedidos,
  };
};

module.exports.insertRequirement = async (conn, { products, date }) => {
  dateTime = moment(date).add(1, "day").format("YYYY-MM-DD HH:mm:ss");
  const startDay = moment(date).startOf("week").format("YYYY-MM-DD");
  const endDay = moment(date)
    .endOf("week")
    .subtract(1, "day")
    .format("YYYY-MM-DD");

  await conn.query(`
    DELETE FROM Qualtia_Plan_rebanado WHERE CAST(fecha AS DATE) = '${moment(
      date
    )
      .add(1, "day")
      .format("YYYY-MM-DD")}';
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

  const { data: pedido } = await conn.query(`
    SELECT p.pedido, p.fecha, p.ajuste_carga, c.id, c.producto FROM Qualtia_Plan_rebanado AS p
    INNER JOIN Qualtia_Prod_producto_cat AS c
    ON c.id = p.idProducto
    WHERE CAST(fecha AS DATE) = '${moment(date)
      .add(1, "day")
      .format("YYYY-MM-DD")}';
  `);
  const { data: pedidos } = await conn.query(`
    SELECT p.pedido, p.fecha, p.ajuste_carga, c.id, c.producto FROM Qualtia_Plan_rebanado AS p
    INNER JOIN Qualtia_Prod_producto_cat AS c
    ON c.id = p.idProducto
    WHERE CAST(fecha AS DATE) BETWEEN '${startDay}' AND '${endDay}';
  `);
  return {
    pedido,
    pedidos,
  };
};
