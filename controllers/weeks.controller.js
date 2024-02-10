const xlsx = require("xlsx");
const _ = require("lodash");

module.exports.parseWeeks = (fileContent) => {
  const sheetName = "14W";
  const registros = [];

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
    _.forEach(datosExtraidos, function (register) {
      const producto = {
        sku: `${register[0]}`,
        descripcion: register[1],
        plan_ajustado: register[7],
      };
      registros.push(producto);
    });
  }
  // De la fila 1 a la 8
  const filasAExtraer1 = Array.from({ length: 45 }, (_, index) => index + 13);
  // de la N a la CE
  const columnasAExtraer = Array.from({ length: 16 - 6 }, (_, index) =>
    xlsx.utils.encode_col(index + 3)
  );

  const filasAExtraer2 = Array.from({ length: 23 }, (_, index) => index + 72);
  //console.log(filasAExtraer, columnasAExtraer)

  // Uso de las funciones
  const sheet = leerArchivoExcel(fileContent, sheetName);
  const datosExtraidos1 = extraerDatos(sheet, filasAExtraer1, columnasAExtraer);
  const datosExtraidos2 = extraerDatos(sheet, filasAExtraer2, columnasAExtraer);
  agruparDatos(datosExtraidos1);
  agruparDatos(datosExtraidos2);
  const productosFiltrados = registros.filter(
    (producto) => producto.sku !== "" && producto.descripcion !== ""
  );
  return productosFiltrados;
};

module.exports.uploadWeeks = async (cn, data, date) => {
  try {
    const cleanData = data.filter(
      (obj) => !Object.values(obj).every((val) => val === undefined)
    );

    const values = cleanData
      .map(
        (item) =>
          `('${item.sku}', '${item.descripcion}', '${item.plan_ajustado}','${date}')`
      )
      .join(",");

    await cn.query(`
      INSERT INTO Qualtia_Plan_ajustado
      (producto, descripcion, plan_ajustado, fecha)
      VALUES ${values}
  `);
  } catch (error) {
    console.log(error);
  }
};
