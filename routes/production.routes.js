const { Router } = require("express");

const response = require("../helpers/response");
const { prodTime } = require("../controllers/prodTime.controller");
const { getSummary, insertProduction } = require("../queries/production");

const router = Router();

router.get("/", (req, res) => {
  response(res, false, getSummary);
});

router.post("/", (req, res) => {
  const planProd = prodTime(req.body);
  response(res, false, insertProduction, planProd);
});

module.exports = router;
