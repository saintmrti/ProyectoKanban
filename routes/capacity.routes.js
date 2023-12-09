const { Router } = require("express");

const response = require("../helpers/response");
const { getSummary } = require("../queries/capacity");

const router = Router();

router.get("/", (req, res) => {
  response(res, false, getSummary);
});

// router.post("/", (req, res) => {
//     response(res, false, getSummary);
// });

// router.put("/", (req, res) => {
//     response(res, false, getSummary);
// });

// router.delete("/", (req, res) => {
//     response(res, false, getSummary);
// });

module.exports = router;
