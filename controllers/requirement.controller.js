const xlsx = require("xlsx");
const _ = require("lodash");
const moment = require("moment");

module.exports.parseRequirement = (fileContent) => {
  const sheetName = "Celda";

  function leerArchivoExcel(fileContent, sheetName) {
    const workbook = xlsx.read(fileContent, { type: "buffer" });
    const sheet = workbook.Sheets[sheetName];
    return sheet;
  }

  function extraerDatos(sheet, filasAExtraer, columnasAExtraer) {
    const datosExtraidos = [];

    filasAExtraer.forEach((fila) => {
      const filaActual = [];
      columnasAExtraer.forEach((columna) => {
        const celda = sheet[`${columna}${fila}`];
        filaActual.push(celda ? celda.v : "");
      });
      datosExtraidos.push(filaActual);
    });

    return datosExtraidos;
  }

  function agruparDatos(datosExtraidos) {
    const filasAgrupadas = [];
    const encabezados = datosExtraidos[0];

    for (let i = 1; i < datosExtraidos.length; i++) {
      const fila = {};
      encabezados.forEach((encabezado, index) => {
        const nombreColumna = encabezado.toString();
        fila[nombreColumna] = datosExtraidos[i][index] || 0;
      });

      filasAgrupadas.push(fila);
    }

    return filasAgrupadas;
  }
  const filasAExtraer = Array.from({ length: 117 }, (_, index) => index + 5);
  const columnasAExtraer = Array.from({ length: 20 }, (_, index) =>
    xlsx.utils.encode_col(index + 1)
  );

  const sheet = leerArchivoExcel(fileContent, sheetName);
  const datosExtraidos = extraerDatos(sheet, filasAExtraer, columnasAExtraer);
  const datosAgrupados = agruparDatos(datosExtraidos, columnasAExtraer);

  return datosAgrupados;
};

module.exports.uploadRequirement = async (cn, data, date) => {
  try {
    const cleanData = data.filter(
      (obj) => !Object.values(obj).every((val) => val === undefined)
    );

    const values = cleanData
      .map(
        (item) =>
          `('${item["SKU"]}', '${item["Descripción"]}', '${item["Linea"]}', '${item["Origen"]}', ${item["BPTMY Maximo"]}, ${item["BPTMTY Minimo"]}, ${item["CEDMTY"]}, ${item["CEDCHIH"]}, ${item["CEDLAN"]}, ${item["CEDGDL"]}, ${item["CEDCUL"]}, ${item["CEDTIJ"]}, ${item["CEDMER"]}, ${item["CEDLEON"]},${item["CEDVER"]}, ${item["CEDMEX"]}, ${item["CEDTEP"]}, ${item["QyQ"]}, ${item["CARNEMART"]}, ${item["TOTAL"]}, '${date}')`
      )
      .join(",");

    await cn.query(`
      INSERT INTO Qualtia_Prod_requerimiento 
      (producto, descripcion, linea, origen, bptmy_maximo, bptmy_minimo, cedmty, cedchih, cedlan, cedgdl, cedcul, cedtij, cedmer, cedleon, cedver, cedmex, cedtep, QyQ, carnemart, total, fecha)
      VALUES ${values}
  `);
  } catch (error) {
    console.log(error);
  }
};
