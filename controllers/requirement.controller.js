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

    // const transformData = _.map(cleanData, (item) => ({
    //   sku: item?.SKU?.replace(/'/g, "''") || null,
    //   descripcion: item["Descripción"]?.replace(/'/g, "''") || null,
    //   linea: item?.Linea || null,
    //   origen: item?.Origen?.replace(/'/g, "''") || null,
    //   bptmy_maximo: parseInt(item["BPTMY Maximo"]) || 0,
    //   bptmy_minimo: parseInt(item["BPTMY Minimo"]) || 0,
    //   cedmty: item["CEDMTY"] || 0,
    //   cedchih: item["CEDCHIH"] || 0,
    //   cedlan: item["CEDLAN"] || 0,
    //   cedgdl: item["CEDGDL"] || 0,
    //   cedcul: item["CEDCUL"] || 0,
    //   cedtij: item["CEDTIJ"] || 0,
    //   cedmer: item["CEDMER"] || 0,
    //   cedleon: item["CEDLEON"] || 0,
    //   cedver: item["CEDVER"] || 0,
    //   cedmex: item["CEDMEX"] || 0,
    //   cedtep: item["CEDTEP"] || 0,
    //   qyq: item["QyQ"] || 0,
    //   carnemart: item["CARNEMART"] || 0,
    //   total: item["TOTAL"] || 0,
    //   fecha: moment().format("YYYY-MM-DD HH:mm:ss"),
    // }));

    // const tempTableValues = transformData
    //   .map(
    //     (item) => `(
    //     '${item.sku}',
    //     '${item.descripcion}',
    //     '${item.linea}',
    //     '${item.origen}',
    //     ${item.bptmy_maximo},
    //     ${item.bptmy_minimo},
    //     ${item.cedmty},
    //     ${item.cedchih},
    //     ${item.cedlan},
    //     ${item.cedgdl},
    //     ${item.cedcul},
    //     ${item.cedtij},
    //     ${item.cedmer},
    //     ${item.cedleon},
    //     ${item.cedver},
    //     ${item.cedmex},
    //     ${item.cedtep},
    //     ${item.qyq},
    //     ${item.carnemart},
    //     ${item.total},
    //     ${item.fecha}
    //   )`
    //   )
    //   .join(",");

    // await cn.query(`
    //   INSERT INTO Qualtia_Prod_requerimiento
    //   (producto, descripcion, linea, origen, bptmy_maximo, bptmy_minimo, cedmty, cedchih, cedlan, cedgdl, cedcul, cedtij, cedmer, cedleon, cedver, cedmex, cedtep, QyQ, carnemart, total, fecha)
    //   VALUES ${tempTableValues}
    // `);

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
