const { Router } = require("express");
const _ = require("lodash");

const Connection = require("../connection/db");
const response = require("../helpers/response");
const { getSummary, insertRequirement } = require("../queries/requirement");
const { transfered } = require("../controllers/transfered.controller");
const {
  parseInventory,
  uploadInventory,
} = require("../controllers/inventory.controller");
const {
  parseRequirement,
  uploadRequirement,
} = require("../controllers/requirement.controller");
const { parseOrder, uploadOrder } = require("../controllers/order.controller");

const router = Router();

router.get("/", (req, res) => {
  const { date } = req.query;
  response(res, false, getSummary, date);
});

router.post("/", async (req, res) => {
  try {
    const cn = new Connection(false);
    const date = req.body.fecha;
    const files = req.files.files;
    // const inv_nacional = _.find(
    //   files,
    //   (file) => file.name === "inv_nacional.csv"
    // );
    // const req_celda = _.find(files, (file) => file.name === "req_celda.xlsx");
    // const wip_jam = _.find(files, (file) => file.name === "pedido.xlsx");
    // const data_inv = await parseInventory(inv_nacional.data, date);
    // const data_req = parseRequirement(req_celda.data, date);
    // const data_order = parseOrder(wip_jam.data);
    // await uploadInventory(cn, data_inv, date);
    // await uploadRequirement(cn, data_req, date);
    // await uploadOrder(cn, data_order, date);
    const data = await transfered(cn, date);
    cn.close();
    res.status(200).json({
      isError: false,
      isEmpty: _.isEmpty(data),
      data,
      status: "SUCCESS",
    });
    // response(res, true, insertRequirement, data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
