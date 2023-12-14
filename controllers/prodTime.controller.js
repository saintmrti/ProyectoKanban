const _ = require("lodash");

module.exports.prodTime = ({ planProd }) => {
  const data = _.map(planProd, (prod) => {
    const processes = prod.procesos.map(({ nombre, inicio, fin }) => ({
      [nombre]: { inicio, fin },
    }));

    const processedData = processes.reduce((acc, process) => {
      const [key] = Object.keys(process);
      acc[key] = process[key];
      return acc;
    }, {});

    return { ...prod, procesos: processedData };
  });

  return data;
};
