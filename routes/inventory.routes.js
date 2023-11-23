const { Router } = require("express");

const { transfered } = require("../controllers/transfered.controller");

const router = Router();

router.get("/", (req, res) => {
  transfered(req, res);
});

module.exports = router;
