const xlsx = require("xlsx");
const moment = require("moment-timezone");
const _ = require("lodash");

module.exports.parseOrder = (fileContent) => {
  const sheetName = "WIP JAM";

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

  const filasAExtraer = Array.from({ length: 80 }, (_, index) => index + 6);
  const columnasAExtraer = Array.from({ length: 15 }, (_, index) =>
    xlsx.utils.encode_col(index)
  );

  const sheet = leerArchivoExcel(fileContent, sheetName);
  const datosExtraidos = extraerDatos(sheet, filasAExtraer, columnasAExtraer);
  const datosAgrupados = agruparDatos(datosExtraidos, columnasAExtraer);
  return datosAgrupados;
};

module.exports.uploadOrder = async (cn, data, date) => {
  try {
    const cleanData = data.filter(
      (obj) => !Object.values(obj).every((val) => val === undefined)
    );

    const transformData = _.map(cleanData, (item) => ({
      peso_promedio: parseFloat(item["PESO PROMEDIO"]) || 0,
      producto: `'${item.PRODUCTO}'` || null,
      descripcion: `'${item.DESCRIPCION}'` || null,
      cocer_embutido: parseFloat(item["COCER (Embutido)"]) || 0,
      cocimiento: parseFloat(item.COCIMIENTO) || 0,
      enfriamiento: parseFloat(item.ENFRIAMIENTO) || 0,
      madurado: parseFloat(item.MADURADO) || 0,
      camaras: parseFloat(item.CAMARAS) || 0,
      empaque: parseFloat(item.EMPAQUE) || 0,
      incompletas: parseFloat(item.INCOMPLETAS) || 0,
      retenidas: parseFloat(item.RETENIDAS) || 0,
      total_piezas: parseFloat(item["Total Piezas"]) || 0,
      canastillas: parseFloat(item.Canastillas) || 0,
      tarimas: parseFloat(item.Tarimas) || 0,
      total_Kilos: parseFloat(item["Total kilos"]) || 0,
      fecha: date,
    }));

    const values = transformData
      .map(
        (item) =>
          `(${item.peso_promedio}, ${item.producto},${item.descripcion},
            ${item.cocer_embutido}, ${item.cocimiento}, ${item.enfriamiento},
            ${item.madurado}, ${item.camaras}, ${item.empaque}, ${item.incompletas},
            ${item.retenidas}, ${item.total_piezas}, ${item.canastillas}, 
            ${item.tarimas}, ${item.total_Kilos}, '${item.fecha}')`
      )
      .join(",");
    await cn.query(`
        INSERT INTO Qualtia_Plan_pedido
        (peso_promedio, producto, descripcion, cocer_embutido, cocimiento, enfriamiento, madurado, camaras, empaque, incompletas, repetidas, total_piezas, canastillas, tarimas, total_Kilos, fecha)
        VALUES ${values}
    `);
  } catch (error) {
    console.log(error);
  }
};
