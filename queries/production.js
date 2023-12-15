const moment = require("moment-timezone");
const time = moment().format("HH:mm:ss");
const _ = require("lodash");

module.exports.getSummary = async (conn, date) => {
  const { data } = await conn.query(`
      SELECT t.id, p.fecha, p.idProducto, p.secuencia, p.destino, p.producto, p.rack,
      p.kg_lote, p.no_rack, p.tipo_emulsion, t.idProduccion, t.mezclado, t.embutido, t.cocimiento, t.enfriamiento, t.desmolde, t.atemperado, t.rebanado, t.entrega, t.activo_inicio
      FROM Qualtia_Prod_plan_produccion as p
      INNER JOIN Qualtia_Plan_produccion_tiempos as t
      ON p.id = t.idProduccion
      WHERE CAST(p.fecha AS DATE)= '${date}';
    `);
  return data;
};

module.exports.insertProduction = async (conn, { plan, date }) => {
  dateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm:ss").format(
    "YYYY-MM-DD HH:mm:ss"
  );
  await conn.query(`
    DELETE FROM Qualtia_Plan_produccion_tiempos
    WHERE CAST(fecha AS DATE) = '${date}';
  `);
  await conn.query(`
    DELETE FROM Qualtia_Prod_plan_produccion
    WHERE CAST(fecha AS DATE) = '${date}';
  `);

  const insertPromises = plan.map(async (item) => {
    const {
      sec,
      idProducto,
      destino,
      producto,
      rack,
      kg_lote,
      no_rack,
      tipo_emulsion,
      procesos,
    } = item;
    const {
      info: { insertId },
    } = await conn.query(`
        INSERT INTO Qualtia_Prod_plan_produccion (fecha, idProducto, secuencia, destino, producto, rack, kg_lote, no_rack, tipo_emulsion)
        VALUES ('${dateTime}', ${idProducto}, ${sec}, '${destino}', '${producto}', '${rack}', ${kg_lote}, ${no_rack}, '${tipo_emulsion}');
      `);

    await conn.query(`
      INSERT INTO Qualtia_Plan_produccion_tiempos (idProduccion, fecha, mezclado, embutido, cocimiento, enfriamiento, desmolde, atemperado, rebanado, entrega, activo_inicio) VALUES
      (${insertId}, '${dateTime}', '${procesos?.Mezclado?.inicio}', '${procesos?.Embutido?.inicio}', '${procesos?.Cocimiento?.inicio}', '${procesos?.Enfriamiento?.inicio}', '${procesos?.Desmolde?.inicio}', '${procesos?.Atemperado?.inicio}', '${procesos?.Rebanado?.inicio}', '${procesos?.Entrega?.inicio}', 1),
      (${insertId}, '${dateTime}', '${procesos?.Mezclado?.fin}', '${procesos?.Embutido?.fin}', '${procesos?.Cocimiento?.fin}', '${procesos?.Enfriamiento?.fin}', '${procesos?.Desmolde?.fin}', ' ${procesos?.Atemperado?.fin}', '${procesos?.Rebanado?.fin}', '${procesos?.Entrega?.fin}', 0);
    `);
  });
  await Promise.all(insertPromises);

  const { data } = await conn.query(`
    SELECT t.id, p.fecha, p.idProducto, p.secuencia, p.destino, p.producto, p.rack,
    p.kg_lote, p.no_rack, p.tipo_emulsion, t.idProduccion, t.mezclado, t.embutido, t.cocimiento, t.enfriamiento, t.desmolde, t.atemperado, t.rebanado, t.entrega, t.activo_inicio
    FROM Qualtia_Prod_plan_produccion as p
    INNER JOIN Qualtia_Plan_produccion_tiempos as t
    ON p.id = t.idProduccion
    WHERE CAST(p.fecha AS DATE)= '${date}';
  `);

  return data;
};

module.exports.deleteProduction = async (conn, date) => {
  await conn.query(`
    DELETE FROM Qualtia_Plan_produccion_tiempos
    WHERE CAST(fecha AS DATE) = '${date}';
  `);
  await conn.query(`
    DELETE FROM Qualtia_Prod_plan_produccion
    WHERE CAST(fecha AS DATE) = '${date}';
  `);

  const { data } = await conn.query(`
    SELECT t.id, p.fecha, p.idProducto, p.secuencia, p.destino, p.producto, p.rack,
    p.kg_lote, p.no_rack, p.tipo_emulsion, t.idProduccion, t.mezclado, t.embutido, t.cocimiento, t.enfriamiento, t.desmolde, t.atemperado, t.rebanado, t.entrega, t.activo_inicio
    FROM Qualtia_Prod_plan_produccion as p
    INNER JOIN Qualtia_Plan_produccion_tiempos as t
    ON p.id = t.idProduccion
    WHERE CAST(p.fecha AS DATE)= '${date}';
  `);

  return data;
};
