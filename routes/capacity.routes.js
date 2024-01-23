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
    tinas_congelado,
    tinas_fresco,
    tinas_emulsion,
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
    tinas_emulsion: tinas_emulsion ? parseInt(tinas_emulsion) : null,
    tinas_fresco: tinas_fresco ? parseInt(tinas_fresco) : null,
    tinas_congelado: tinas_congelado ? parseInt(tinas_congelado) : null,
    mezclado: mezclado === "" ? null : `'${mezclado}'`,
    embutido: embutido === "" ? null : `'${embutido}'`,
    cocimiento: cocimiento === "" ? null : `'${cocimiento}'`,
    enfriamiento: enfriamiento === "" ? null : `'${enfriamiento}'`,
    desmolde: desmolde === "" ? null : `'${desmolde}'`,
    atemperado: atemperado === "" ? null : `'${atemperado}'`,
    rebanado: rebanado === "" ? null : `'${rebanado}'`,
    entrega: entrega === "" ? null : `'${entrega}'`,
  };
  response(res, false, insertCapacity, newSku);
});

router.put("/", (req, res) => {
  const {
    idSku,
    sku,
    descripcion,
    kg_lote,
    rack,
    no_rack,
    tipo_emulsion,
    tinas_emulsion,
    tinas_fresco,
    tinas_congelado,
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
    idSku,
    sku,
    descripcion,
    kg_lote: parseInt(kg_lote),
    rack,
    no_rack: parseFloat(no_rack),
    tipo_emulsion,
    tinas_emulsion: tinas_emulsion ? parseInt(tinas_emulsion) : null,
    tinas_fresco: tinas_fresco ? parseInt(tinas_fresco) : null,
    tinas_congelado: tinas_congelado ? parseInt(tinas_congelado) : null,
    mezclado: mezclado === "" ? null : `'${mezclado}'`,
    embutido: embutido === "" ? null : `'${embutido}'`,
    cocimiento: cocimiento === "" ? null : `'${cocimiento}'`,
    enfriamiento: enfriamiento === "" ? null : `'${enfriamiento}'`,
    desmolde: desmolde === "" ? null : `'${desmolde}'`,
    atemperado: atemperado === "" ? null : `'${atemperado}'`,
    rebanado: rebanado === "" ? null : `'${rebanado}'`,
    entrega: entrega === "" ? null : `'${entrega}'`,
  };
  response(res, false, updateCapacity, newSku);
});

router.delete("/", (req, res) => {
  const { idSku } = req.query;
  const sku = {
    idSku: parseInt(idSku),
  };
  response(res, false, deleteCapacity, sku);
});

module.exports = router;
