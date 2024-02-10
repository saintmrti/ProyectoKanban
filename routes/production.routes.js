const { Router } = require("express");
const axios = require("axios");

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
  try {
    const { date, planProd } = req.body;
    // const production_order = {
    //   idSku: planProd[0]?.producto,
    //   idMaquina: 6,
    //   fecha_mezclado: `${date} ${planProd[0]?.procesos[0]?.inicio}:00`,
    // };
    // const apiURL =
    //   "https://qualtia-kanban.azurewebsites.net/api/production_orders";

    // axios
    //   .post(apiURL, { production_order })
    //   .then((res) => {
    //     console.log(`statusCode: ${res.status}`);
    //     console.log(res.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error al realizar la solicitud:", error);
    //   });
    // const plan = prodTime(planProd);
    // response(res, false, insertProduction, { plan, date });
  } catch (e) {
    console.log(e);
  }
});

router.delete("/", (req, res) => {
  const { date } = req.query;
  response(res, false, deleteProduction, date);
});

module.exports = router;
