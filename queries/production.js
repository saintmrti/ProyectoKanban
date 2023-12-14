const moment = require("moment-timezone");
const today = moment().format("YYYY-MM-DD");
const _ = require("lodash");

module.exports.getSummary = async (conn) => {
  const { data } = await conn.query(`
      
    `);
  return data;
};

module.exports.insertProduction = async (conn, planProd) => {
  const insertPromises = planProd.map(async (item) => {
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
        VALUES ('${today}', ${idProducto}, ${sec}, '${destino}', '${producto}', '${rack}', ${kg_lote}, ${no_rack}, '${tipo_emulsion}');
      `);

    await conn.query(`
      INSERT INTO Qualtia_Plan_produccion_tiempos (idProduccion, mezclado, embutido, cocimiento, enfriamiento, desmolde, atemperado, rebanado, entrega, activo_inicio) VALUES
      (${insertId}, '${procesos?.Mezclado?.inicio}', '${procesos?.Embutido?.inicio}', '${procesos?.Cocimiento?.inicio}', '${procesos?.Enfriamiento?.inicio}', '${procesos?.Desmolde?.inicio}', '${procesos?.Atemperado?.inicio}', '${procesos?.Rebanado?.inicio}', '${procesos?.Entrega?.inicio}', 1),
      (${insertId}, '${procesos?.Mezclado?.fin}', '${procesos?.Embutido?.fin}', '${procesos?.Cocimiento?.fin}', '${procesos?.Enfriamiento?.fin}', '${procesos?.Desmolde?.fin}', ' ${procesos?.Atemperado?.fin}', '${procesos?.Rebanado?.fin}', '${procesos?.Entrega?.fin}', 0);
    `);

    const { data } = await conn.query(`
        SELECT * FROM Qualtia_Prod_plan_produccion WHERE id = ${insertId};
      `);

    return data[0];
  });

  const results = await Promise.all(insertPromises);
  return results;
};
