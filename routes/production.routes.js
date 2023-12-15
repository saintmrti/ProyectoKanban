const { Router } = require("express");

const response = require("../helpers/response");
const { prodTime } = require("../controllers/prodTime.controller");
const {
  getSummary,
  insertProduction,
  deleteProduction,
} = require("../queries/production");

const router = Router();

router.get("/", (req, res) => {
  const { date } = req.query;
  response(res, false, getSummary, date);
});

router.post("/", (req, res) => {
  const { date, planProd } = req.body;
  const plan = prodTime(planProd);
  response(res, false, insertProduction, { plan, date });
});

router.delete("/", (req, res) => {
  const { date } = req.query;
  response(res, false, deleteProduction, date);
});

module.exports = router;
