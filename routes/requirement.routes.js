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
const { parseWeeks, uploadWeeks } = require("../controllers/weeks.controller");
const {
  requirementValidator,
  inventoryValidator,
  orderValidator,
  weekValidator,
} = require("../helpers/fileValidator");

const router = Router();

router.get("/", (req, res) => {
  const { date } = req.query;
  response(res, false, getSummary, date);
});

router.post("/", async (req, res) => {
  try {
    const date = req.body.fecha;
    const files = req.files.files;
    if (files && files.length > 0) {
      const cn = new Connection(false);
      let inv_nacional, req_celda, wip_jam, weeks;
      for (let i = 0; i < files.length; i++) {
        if (requirementValidator(files[i].name)) {
          req_celda = files[i];
        }
        if (inventoryValidator(files[i].name)) {
          inv_nacional = files[i];
        }
        if (orderValidator(files[i].name)) {
          wip_jam = files[i];
        }
        if (weekValidator(files[i].name)) {
          weeks = files[i];
        }
      }
      if (inv_nacional && req_celda && wip_jam && weeks) {
        const data_inv = await parseInventory(inv_nacional.data, date);
        const data_req = parseRequirement(req_celda.data, date);
        const data_order = parseOrder(wip_jam.data);
        const data_weeks = parseWeeks(weeks.data);
        await Promise.all([
          uploadInventory(cn, res, data_inv, date),
          uploadRequirement(cn, res, data_req, date),
          uploadOrder(cn, res, data_order, date),
          uploadWeeks(cn, res, data_weeks, date),
        ]);
        const invNacional = await transfered(cn, date);
        cn.close();
        response(res, true, insertRequirement, { invNacional, date });
      } else {
        cn.close();
        res.json({
          isError: true,
          status: "No se encontraron los archivos necesarios",
        });
      }
    } else {
      res.json({
        isError: true,
        status: "No se encontraron los archivos necesarios",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
