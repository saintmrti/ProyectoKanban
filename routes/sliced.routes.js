const { Router } = require("express");

const response = require("../helpers/response");
const { insertRequirement } = require("../queries/sliced");

const router = Router();

router.post("/", (req, res) => {
  const { products } = req.body;
  response(res, false, insertRequirement, products);
});

module.exports = router;
