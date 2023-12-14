const { Router } = require("express");

const response = require("../helpers/response");
const {
  getSummary,
  insertCapacity,
  updateCapacity,
  deleteCapacity,
} = require("../queries/capacity");

const router = Router();

router.get("/", (req, res) => {
  response(res, false, getSummary);
});

router.post("/", (req, res) => {
  const {
    idMaquina,
    sku,
    descripcion,
    kg_lote,
    rack,
    no_rack,
    tipo_emulsion,
    mezclado,
    embutido,
    cocimiento,
    enfriamiento,
    desmolde,
    atemperado,
    rebanado,
    entrega,
  } = req.body;
  const newSku = {
    idMaquina,
    sku,
    descripcion,
    kg_lote: parseInt(kg_lote),
    rack,
    no_rack: parseFloat(no_rack),
    tipo_emulsion,
    mezclado,
    embutido,
    cocimiento,
    enfriamiento,
    desmolde,
    atemperado,
    rebanado,
    entrega,
  };
  response(res, false, insertCapacity, newSku);
});

router.put("/", (req, res) => {
  const { sku } = req.body;
  response(res, false, updateCapacity, sku);
});

router.delete("/", (req, res) => {
  const { idSku } = req.query;
  const sku = {
    idSku: parseInt(idSku),
  };
  response(res, false, deleteCapacity, sku);
});

module.exports = router;
