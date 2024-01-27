const { Router } = require("express");
const _ = require("lodash");

const Connection = require("../connection/db");
const response = require("../helpers/response");
const { getSummary } = require("../queries/requirement");
const {
  parseInventory,
  insertInventory,
} = require("../controllers/inventory.controller");
const {
  parseRequirement,
  insertRequirement,
} = require("../controllers/requirement.controller");
const { parseOrder, insertOrder } = require("../controllers/order.controller");

const router = Router();

router.get("/", (req, res) => {
  const { date } = req.query;
  response(res, false, getSummary, date);
});

router.post("/", async (req, res) => {
  try {
    const cn = new Connection(false);
    const files = req.files.files;
    const inv_nacional = _.find(
      files,
      (file) => file.name === "inv_nacional.csv"
    );
    const req_celda = _.find(files, (file) => file.name === "req_celda.xlsx");
    const wip_jam = _.find(files, (file) => file.name === "pedido.xlsx");
    // const data_inv = await parseInventory(inv_nacional.data);
    // const data_req = parseRequirement(req_celda.data);
    const data_order = parseOrder(wip_jam.data);
    // await insertInventory(cn, data_inv);
    // await insertRequirement(cn, data_req);
    await insertOrder(cn, data_order);
    res.status(200).json({
      isError: false,
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
