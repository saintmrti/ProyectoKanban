const { Router } = require("express");

const response = require("../helpers/response");
const { getSummary } = require("../queries/requirement");

const router = Router();

router.get("/", (req, res) => {
  const { date } = req.query;
  response(res, false, getSummary, date);
});

module.exports = router;
