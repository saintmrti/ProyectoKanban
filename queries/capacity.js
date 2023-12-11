// const moment = require("moment-timezone");
// const today = moment().format("YYYY-MM-DD");

module.exports.getSummary = async (conn) => {
  const { data } = await conn.query(`
      SELECT c.id, c.idMaquina, m.nombre as maquina, c.sku, c.descripcion,
      c.kg_lote, c.rack, c.no_rack, c.tipo_emulsion, m.idLinea, l.nombre as linea
      FROM Qualtia_Capacidad_cat_sku as c
      INNER JOIN Qualtia_Capacidad_maquinas as m
      ON c.IdMaquina = m.id
      INNER JOIN Qualtia_Capacidad_lineas as l
      ON m.idLinea = l.id;
    `);
  return data;
};
