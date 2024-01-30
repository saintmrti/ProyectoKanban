const _ = require("lodash");
const Connection = require("../connection/db");
const response = require("../helpers/response");
const moment = require("moment-timezone");

const { getSummary } = require("../queries/inventory");

const plan_embutido = [
  {
    id: 1,
    producto: "X450",
    pedido: 3790,
  },
  {
    id: 2,
    producto: "10155",
    pedido: 5370,
  },
  {
    id: 3,
    producto: "11022",
    pedido: 3000,
  },
  {
    id: 4,
    producto: "X220",
    pedido: 2700,
  },
  {
    id: 5,
    producto: "X210",
    pedido: 2600,
  },
  {
    id: 6,
    producto: "X168",
    pedido: 1384,
  },
  {
    id: 7,
    producto: "CF0126",
    pedido: 4973,
  },
  {
    id: 8,
    producto: "X441",
    pedido: 3384,
  },
  {
    id: 9,
    producto: "P8100",
    pedido: 2000,
  },
  {
    id: 10,
    producto: "CF3111",
    pedido: 1000,
  },
  {
    id: 101,
    producto: "X282",
    pedido: 1488,
  },
  {
    id: 102,
    producto: "X286",
    pedido: 5136,
  },
  {
    id: 103,
    producto: "X302",
    pedido: 7704,
  },
  {
    id: 104,
    producto: "X512",
    pedido: 7704,
  },
  {
    id: 105,
    producto: "10735",
    pedido: 1488,
  },
  {
    id: 106,
    producto: "X949",
    pedido: 1642,
  },
  {
    id: 107,
    producto: "X982",
    pedido: 7704,
  },
  {
    id: 108,
    producto: "X408",
    pedido: 2800,
  },
  {
    id: 109,
    producto: "X201",
    pedido: 2858,
  },
  {
    id: 110,
    producto: "X503",
    pedido: 20006,
  },
  {
    id: 111,
    producto: "X507",
    pedido: 5716,
  },
  {
    id: 112,
    producto: "X942",
    pedido: 2858,
  },
  {
    id: 113,
    producto: "53483",
    pedido: 7145,
  },
  {
    id: 114,
    producto: "53346",
    pedido: 12861,
  },
  {
    id: 115,
    producto: "X211",
    pedido: 7145,
  },
  {
    id: 116,
    producto: "30207",
    pedido: 345,
  },
  {
    id: 117,
    producto: "30238",
    pedido: 345,
  },
  {
    id: 118,
    producto: "X972",
    pedido: 1140,
  },
];

module.exports.transfered = async (cn, date) => {
  try {
    const { productos, inv_nacional, requirement, wip_programa, pr, tn } =
      await getSummary(cn, date);

    const newReq = _.map(requirement, (req) => ({
      ...req,
      real_date: moment(req.fecha).format("YYYY-MM-DD"),
    }));

    const gropedReq = _.groupBy(newReq, "real_date");
    const newRegisters = _.map(productos, (producto) => {
      const bpt = _.find(
        inv_nacional,
        (i) =>
          i.bpt &&
          i.bpt.toUpperCase() === `PTAMTY${producto.producto}`.toUpperCase()
      );
      const cedis = _.find(
        inv_nacional,
        (i) =>
          i.cedis &&
          i.cedis.toUpperCase() === `CEDMTY${producto.producto}`.toUpperCase()
      );
      const req_today = _.find(
        gropedReq[moment(date).subtract(1, "days").format("YYYY-MM-DD")],
        (i) =>
          i.producto &&
          i.producto.toUpperCase() === producto.producto.toUpperCase()
      );
      const req_tomorrow = _.find(
        gropedReq[date],
        (i) =>
          i.producto &&
          i.producto.toUpperCase() === producto.producto.toUpperCase()
      );
      const wip = _.find(
        wip_programa,
        (i) =>
          i.producto &&
          i.producto.toUpperCase() === producto.producto.toUpperCase()
      );
      const plan_rebanado = _.find(
        pr,
        (i) => i.idProducto && i.idProducto === producto.id
      );
      const tienda = _.find(
        tn,
        (i) =>
          i.producto &&
          i.producto.toUpperCase() === producto.producto.toUpperCase()
      );

      const inv_bpt = bpt ? bpt?.inv_net_trans : 0;
      const inv_cedis = cedis ? cedis?.inv_net_trans : 0;
      const tiendita = tienda ? tienda?.tiendita : 0;
      const programa_hoy = plan_rebanado ? plan_rebanado?.pedido : 0;
      const prox_salida = Math.round(req_tomorrow ? req_tomorrow?.total : 0);
      const salida_hoy = Math.round(req_today ? req_today?.total : 0);
      const wip_hoy = wip ? parseInt(wip?.total_Kilos) : 0;
      const min_kg_carga = tienda ? tienda?.min_kg_carga : 0;

      return {
        ...producto,
        inv_bpt,
        inv_cedis,
        bpt_cedis: inv_bpt + inv_cedis,
        tiendita,
        prox_salida,
        min_kg_carga,
        salida_hoy,
        wip_hoy,
        programa_hoy,
        wip_programa_hoy: wip_hoy + programa_hoy,
      };
    });
    const data = _.map(newRegisters, (reg) => {
      const plan = _.find(plan_embutido, (i) => i.producto === reg.producto);
      return {
        ...reg,
        wip_programa_hoy: plan ? plan.pedido : reg.wip_programa_hoy,
      };
    });
    return data;
  } catch (error) {
    console.error(error);
    if (cn) cn.close();
    res.json(errorObj(error));
  }
};
