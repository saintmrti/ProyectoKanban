const moment = require("moment-timezone");
const today = moment().format("YYYY-MM-DD HH:mm:ss");

module.exports.getSummary = async (conn) => {
  const { data } = await conn.query(`
      SELECT c.id, c.idMaquina, m.nombre as maquina, c.sku, c.descripcion,
      c.kg_lote, c.rack, c.no_rack, c.tipo_emulsion, m.idLinea, l.nombre as linea,
      t.mezclado, t.embutido, t.cocimiento, t.enfriamiento, t.desmolde, t.atemperado,
      t.rebanado, t.entrega
      FROM Qualtia_Capacidad_cat_sku as c
      INNER JOIN Qualtia_Capacidad_maquinas as m
      ON c.idMaquina = m.id
      INNER JOIN Qualtia_Capacidad_lineas as l
      ON m.idLinea = l.id
      LEFT JOIN Qualtia_Capacidad_tiempos_sku as t
      ON c.id = t.idSku;
    `);
  return data;
};

module.exports.insertCapacity = async (
  conn,
  {
    idMaquina,
    sku,
    descripcion,
    kg_lote,
    rack,
    no_rack,
    tipo_emulsion,
    mezclado,
    embutido,
    cocimiento,
    enfriamiento,
    desmolde,
    atemperado,
    rebanado,
    entrega,
  }
) => {
  const {
    info: { insertId },
  } = await conn.query(`
      INSERT INTO Qualtia_Capacidad_cat_sku (idMaquina, sku, descripcion, kg_lote, rack, no_rack, tipo_emulsion)
      VALUES (${idMaquina}, '${sku}', '${descripcion}', ${kg_lote}, '${rack}', ${no_rack}, '${tipo_emulsion}');
    `);

  await conn.query(`
      INSERT INTO Qualtia_Capacidad_tiempos_sku (idSku, fecha, mezclado, embutido, cocimiento, enfriamiento, desmolde, atemperado, rebanado, entrega)
      VALUES (${insertId}, '${today}', '${mezclado}', '${embutido}', '${cocimiento}', '${enfriamiento}', '${desmolde}', '${atemperado}', '${rebanado}', '${entrega}');
    `);

  const { data } = await conn.query(`
      SELECT c.id, c.idMaquina, m.nombre as maquina, c.sku, c.descripcion,
      c.kg_lote, c.rack, c.no_rack, c.tipo_emulsion, m.idLinea, l.nombre as linea,
      t.mezclado, t.embutido, t.cocimiento, t.enfriamiento, t.desmolde, t.atemperado,
      t.rebanado, t.entrega
      FROM Qualtia_Capacidad_cat_sku as c
      INNER JOIN Qualtia_Capacidad_maquinas as m
      ON c.idMaquina = m.id
      INNER JOIN Qualtia_Capacidad_lineas as l
      ON m.idLinea = l.id
      LEFT JOIN Qualtia_Capacidad_tiempos_sku as t
      ON c.id = t.idSku
      WHERE c.id = ${insertId};
  `);
  return data[0];
};

module.exports.updateCapacity = async (
  conn,
  {
    idSku,
    sku,
    descripcion,
    kg_lote,
    rack,
    no_rack,
    tipo_emulsion,
    mezclado,
    embutido,
    cocimiento,
    enfriamiento,
    desmolde,
    atemperado,
    rebanado,
    entrega,
  }
) => {
  await conn.query(`
      UPDATE Qualtia_Capacidad_cat_sku
      SET sku = '${sku}',
      descripcion = '${descripcion}',
      kg_lote = ${kg_lote},
      rack = '${rack}',
      no_rack = ${no_rack},
      tipo_emulsion = '${tipo_emulsion}'
      WHERE id = ${idSku};
    `);

  await conn.query(`
      UPDATE Qualtia_Capacidad_tiempos_sku
      SET fecha = '${today}',
      mezclado = '${mezclado}',
      embutido = '${embutido}',
      cocimiento = '${cocimiento}',
      enfriamiento = '${enfriamiento}',
      desmolde = '${desmolde}',
      atemperado = '${atemperado}',
      rebanado = '${rebanado}',
      entrega = '${entrega}'
      WHERE idSku = ${idSku};
    `);

  const { data } = await conn.query(`
      SELECT c.id, c.idMaquina, m.nombre as maquina, c.sku, c.descripcion,
      c.kg_lote, c.rack, c.no_rack, c.tipo_emulsion, m.idLinea, l.nombre as linea,
      t.mezclado, t.embutido, t.cocimiento, t.enfriamiento, t.desmolde, t.atemperado,
      t.rebanado, t.entrega
      FROM Qualtia_Capacidad_cat_sku as c
      INNER JOIN Qualtia_Capacidad_maquinas as m
      ON c.idMaquina = m.id
      INNER JOIN Qualtia_Capacidad_lineas as l
      ON m.idLinea = l.id
      LEFT JOIN Qualtia_Capacidad_tiempos_sku as t
      ON c.id = t.idSku
      WHERE c.id = ${idSku};
    `);
  return data[0];
};

module.exports.deleteCapacity = async (conn, { idSku }) => {
  await conn.query(`
      DELETE FROM Qualtia_Capacidad_cat_sku
      WHERE id = ${idSku};
    `);
  await conn.query(`
      DELETE FROM Qualtia_Capacidad_tiempos_sku
      WHERE idSku = ${idSku};
    `);
  return idSku;
};
