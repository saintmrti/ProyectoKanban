const { Router } = require("express");
const moment = require("moment-timezone");

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
    ingredientes_secos,
    salmuerizador,
    emulsiones,
    corte_deshuese_fresco,
    te_ingredientes_salmuera,
    te_salmuera_mezclado,
    te_emulsiones_mezclado,
    te_cyd_emulsiones,
    te_cyd_mezclado,
    te_mezclado_embutido,
    te_embutido_cocimiento,
    te_cocimiento_enfriamiento,
    te_enfriamiento_desmolde,
    te_desmolde_atemperado,
    te_atemperado_rebanado,
    te_rebanado_entrega,
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
    ingredientes_secos:
      ingredientes_secos === "" ? null : parseInt(ingredientes_secos),
    salmuerizador: salmuerizador === "" ? null : parseInt(salmuerizador),
    emulsiones: emulsiones === "" ? null : parseInt(emulsiones),
    corte_deshuese_fresco:
      corte_deshuese_fresco === "" ? null : parseInt(corte_deshuese_fresco),
    mezclado: mezclado === "" ? null : parseInt(mezclado),
    embutido: embutido === "" ? null : parseInt(embutido),
    cocimiento: cocimiento === "" ? null : parseInt(cocimiento),
    enfriamiento: enfriamiento === "" ? null : parseInt(enfriamiento),
    desmolde: desmolde === "" ? null : parseInt(desmolde),
    atemperado: atemperado === "" ? null : parseInt(atemperado),
    rebanado: rebanado === "" ? null : parseInt(rebanado),
    entrega: entrega === "" ? null : parseInt(entrega),
    te_ingredientes_salmuera:
      te_ingredientes_salmuera === ""
        ? null
        : parseInt(te_ingredientes_salmuera),
    te_salmuera_mezclado:
      te_salmuera_mezclado === "" ? null : parseInt(te_salmuera_mezclado),
    te_emulsiones_mezclado:
      te_emulsiones_mezclado === "" ? null : parseInt(te_emulsiones_mezclado),
    te_cyd_emulsiones:
      te_cyd_emulsiones === "" ? null : parseInt(te_cyd_emulsiones),
    te_cyd_mezclado: te_cyd_mezclado === "" ? null : parseInt(te_cyd_mezclado),
    te_mezclado_embutido:
      te_mezclado_embutido === "" ? null : parseInt(te_mezclado_embutido),
    te_embutido_cocimiento:
      te_embutido_cocimiento === "" ? null : parseInt(te_embutido_cocimiento),
    te_cocimiento_enfriamiento:
      te_cocimiento_enfriamiento === ""
        ? null
        : parseInt(te_cocimiento_enfriamiento),
    te_enfriamiento_desmolde:
      te_enfriamiento_desmolde === ""
        ? null
        : parseInt(te_enfriamiento_desmolde),
    te_desmolde_atemperado:
      te_desmolde_atemperado === "" ? null : parseInt(te_desmolde_atemperado),
    te_atemperado_rebanado:
      te_atemperado_rebanado === "" ? null : parseInt(te_atemperado_rebanado),
    te_rebanado_entrega:
      te_rebanado_entrega === "" ? null : parseInt(te_rebanado_entrega),
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
    ingredientes_secos,
    salmuerizador,
    emulsiones,
    corte_deshuese_fresco,
    te_ingredientes_salmuera,
    te_salmuera_mezclado,
    te_emulsiones_mezclado,
    te_cyd_emulsiones,
    te_cyd_mezclado,
    te_mezclado_embutido,
    te_embutido_cocimiento,
    te_cocimiento_enfriamiento,
    te_enfriamiento_desmolde,
    te_desmolde_atemperado,
    te_atemperado_rebanado,
    te_rebanado_entrega,
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
    ingredientes_secos:
      ingredientes_secos === null ? null : parseInt(ingredientes_secos),
    salmuerizador: salmuerizador === null ? null : parseInt(salmuerizador),
    emulsiones: emulsiones === null ? null : parseInt(emulsiones),
    corte_deshuese_fresco:
      corte_deshuese_fresco === null ? null : parseInt(corte_deshuese_fresco),
    mezclado: mezclado === null ? null : parseInt(mezclado),
    embutido: embutido === null ? null : parseInt(embutido),
    cocimiento: cocimiento === null ? null : parseInt(cocimiento),
    enfriamiento: enfriamiento === null ? null : parseInt(enfriamiento),
    desmolde: desmolde === null ? null : parseInt(desmolde),
    atemperado: atemperado === null ? null : parseInt(atemperado),
    rebanado: rebanado === null ? null : parseInt(rebanado),
    entrega: entrega === null ? null : parseInt(entrega),
    te_ingredientes_salmuera:
      te_ingredientes_salmuera === null
        ? null
        : parseInt(te_ingredientes_salmuera),
    te_salmuera_mezclado:
      te_salmuera_mezclado === null ? null : parseInt(te_salmuera_mezclado),
    te_emulsiones_mezclado:
      te_emulsiones_mezclado === null ? null : parseInt(te_emulsiones_mezclado),
    te_cyd_emulsiones:
      te_cyd_emulsiones === null ? null : parseInt(te_cyd_emulsiones),
    te_cyd_mezclado:
      te_cyd_mezclado === null ? null : parseInt(te_cyd_mezclado),
    te_mezclado_embutido:
      te_mezclado_embutido === null ? null : parseInt(te_mezclado_embutido),
    te_embutido_cocimiento:
      te_embutido_cocimiento === null ? null : parseInt(te_embutido_cocimiento),
    te_cocimiento_enfriamiento:
      te_cocimiento_enfriamiento === null
        ? null
        : parseInt(te_cocimiento_enfriamiento),
    te_enfriamiento_desmolde:
      te_enfriamiento_desmolde === null
        ? null
        : parseInt(te_enfriamiento_desmolde),
    te_desmolde_atemperado:
      te_desmolde_atemperado === null ? null : parseInt(te_desmolde_atemperado),
    te_atemperado_rebanado:
      te_atemperado_rebanado === null ? null : parseInt(te_atemperado_rebanado),
    te_rebanado_entrega:
      te_rebanado_entrega === null ? null : parseInt(te_rebanado_entrega),
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
