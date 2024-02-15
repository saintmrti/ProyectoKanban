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
      ingredientes_secos === ""
        ? null
        : moment.duration(ingredientes_secos).asMinutes(),
    salmuerizador:
      salmuerizador === "" ? null : moment.duration(salmuerizador).asMinutes(),
    emulsiones:
      emulsiones === "" ? null : moment.duration(emulsiones).asMinutes(),
    corte_deshuese_fresco:
      corte_deshuese_fresco === ""
        ? null
        : moment.duration(corte_deshuese_fresco).asMinutes(),
    mezclado: mezclado === "" ? null : moment.duration(mezclado).asMinutes(),
    embutido: embutido === "" ? null : moment.duration(embutido).asMinutes(),
    cocimiento:
      cocimiento === "" ? null : moment.duration(cocimiento).asMinutes(),
    enfriamiento:
      enfriamiento === "" ? null : moment.duration(enfriamiento).asMinutes(),
    desmolde: desmolde === "" ? null : moment.duration(desmolde).asMinutes(),
    atemperado:
      atemperado === "" ? null : moment.duration(atemperado).asMinutes(),
    rebanado: rebanado === "" ? null : moment.duration(rebanado).asMinutes(),
    entrega: entrega === "" ? null : moment.duration(entrega).asMinutes(),
    te_ingredientes_salmuera:
      te_ingredientes_salmuera === ""
        ? null
        : moment.duration(te_ingredientes_salmuera).asMinutes(),
    te_salmuera_mezclado:
      te_salmuera_mezclado === ""
        ? null
        : moment.duration(te_salmuera_mezclado).asMinutes(),
    te_emulsiones_mezclado:
      te_emulsiones_mezclado === ""
        ? null
        : moment.duration(te_emulsiones_mezclado).asMinutes(),
    te_cyd_emulsiones:
      te_cyd_emulsiones === ""
        ? null
        : moment.duration(te_cyd_emulsiones).asMinutes(),
    te_cyd_mezclado:
      te_cyd_mezclado === ""
        ? null
        : moment.duration(te_cyd_mezclado).asMinutes(),
    te_mezclado_embutido:
      te_mezclado_embutido === ""
        ? null
        : moment.duration(te_mezclado_embutido).asMinutes(),
    te_embutido_cocimiento:
      te_embutido_cocimiento === ""
        ? null
        : moment.duration(te_embutido_cocimiento).asMinutes(),
    te_cocimiento_enfriamiento:
      te_cocimiento_enfriamiento === ""
        ? null
        : moment.duration(te_cocimiento_enfriamiento).asMinutes(),
    te_enfriamiento_desmolde:
      te_enfriamiento_desmolde === ""
        ? null
        : moment.duration(te_enfriamiento_desmolde).asMinutes(),
    te_desmolde_atemperado:
      te_desmolde_atemperado === ""
        ? null
        : moment.duration(te_desmolde_atemperado).asMinutes(),
    te_atemperado_rebanado:
      te_atemperado_rebanado === ""
        ? null
        : moment.duration(te_atemperado_rebanado).asMinutes(),
    te_rebanado_entrega:
      te_rebanado_entrega === ""
        ? null
        : moment.duration(te_rebanado_entrega).asMinutes(),
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
      ingredientes_secos === ""
        ? null
        : moment.duration(ingredientes_secos).asMinutes(),
    salmuerizador:
      salmuerizador === "" ? null : moment.duration(salmuerizador).asMinutes(),
    emulsiones:
      emulsiones === "" ? null : moment.duration(emulsiones).asMinutes(),
    corte_deshuese_fresco:
      corte_deshuese_fresco === ""
        ? null
        : moment.duration(corte_deshuese_fresco).asMinutes(),
    mezclado: mezclado === "" ? null : moment.duration(mezclado).asMinutes(),
    embutido: embutido === "" ? null : moment.duration(embutido).asMinutes(),
    cocimiento:
      cocimiento === "" ? null : moment.duration(cocimiento).asMinutes(),
    enfriamiento:
      enfriamiento === "" ? null : moment.duration(enfriamiento).asMinutes(),
    desmolde: desmolde === "" ? null : moment.duration(desmolde).asMinutes(),
    atemperado:
      atemperado === "" ? null : moment.duration(atemperado).asMinutes(),
    rebanado: rebanado === "" ? null : moment.duration(rebanado).asMinutes(),
    entrega: entrega === "" ? null : moment.duration(entrega).asMinutes(),
    te_ingredientes_salmuera:
      te_ingredientes_salmuera === ""
        ? null
        : moment.duration(te_ingredientes_salmuera).asMinutes(),
    te_salmuera_mezclado:
      te_salmuera_mezclado === ""
        ? null
        : moment.duration(te_salmuera_mezclado).asMinutes(),
    te_emulsiones_mezclado:
      te_emulsiones_mezclado === ""
        ? null
        : moment.duration(te_emulsiones_mezclado).asMinutes(),
    te_cyd_emulsiones:
      te_cyd_emulsiones === ""
        ? null
        : moment.duration(te_cyd_emulsiones).asMinutes(),
    te_cyd_mezclado:
      te_cyd_mezclado === ""
        ? null
        : moment.duration(te_cyd_mezclado).asMinutes(),
    te_mezclado_embutido:
      te_mezclado_embutido === ""
        ? null
        : moment.duration(te_mezclado_embutido).asMinutes(),
    te_embutido_cocimiento:
      te_embutido_cocimiento === ""
        ? null
        : moment.duration(te_embutido_cocimiento).asMinutes(),
    te_cocimiento_enfriamiento:
      te_cocimiento_enfriamiento === ""
        ? null
        : moment.duration(te_cocimiento_enfriamiento).asMinutes(),
    te_enfriamiento_desmolde:
      te_enfriamiento_desmolde === ""
        ? null
        : moment.duration(te_enfriamiento_desmolde).asMinutes(),
    te_desmolde_atemperado:
      te_desmolde_atemperado === ""
        ? null
        : moment.duration(te_desmolde_atemperado).asMinutes(),
    te_atemperado_rebanado:
      te_atemperado_rebanado === ""
        ? null
        : moment.duration(te_atemperado_rebanado).asMinutes(),
    te_rebanado_entrega:
      te_rebanado_entrega === ""
        ? null
        : moment.duration(te_rebanado_entrega).asMinutes(),
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
