const { Router } = require("express");

const response = require("../helpers/response");
const { getSummary } = require("../models/requirements.model");

const router = Router();

router.get("/", (req, res) => {
  response(res, false, getSummary);
});

module.exports = router;
