const express = require("express");
const router = express.Router();

let materials = [];
let auditLog = [];

// Listeleme ve filtreleme
router.get("/", (req, res) => {
  let result = materials.filter(m => !m.deleted);
  if (req.query.malzemeKodu) {
    result = result.filter(m => m.malzemeKodu.toLowerCase().includes(req.query.malzemeKodu.toLowerCase()));
  }
  if (req.query.malzemeTipi) {
    result = result.filter(m => m.malzemeTipi === req.query.malzemeTipi);
  }
  res.json(result);
});

// Yeni malzeme ekleme
router.post("/", (req, res) => {
  const yeni = {
    id: Date.now().toString(),
    malzemeKodu: req.body.malzemeKodu,
    malzemeAdi: req.body.malzemeAdi,
    malzemeTipi: req.body.malzemeTipi,
    olcuBirimi: req.body.olcuBirimi,
    stokDurumu: req.body.stokDurumu,
    ureticiFirma: req.body.ureticiFirma,
    tedarikSuresi: req.body.tedarikSuresi,
    depolamaKoslullari: req.body.depolamaKoslullari,
    aktif: req.body.aktif !== false,
    deleted: false
  };
  materials.push(yeni);
  auditLog.push({ malzemeId: yeni.id, action: "create", user: "demo", date: new Date(), details: yeni });
  res.status(201).json(yeni);
});

// Güncelleme
router.put("/:id", (req, res) => {
  const idx = materials.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Malzeme bulunamadı" });
  materials[idx] = { ...materials[idx], ...req.body };
  auditLog.push({ malzemeId: req.params.id, action: "update", user: "demo", date: new Date(), details: req.body });
  res.json(materials[idx]);
});

// Soft delete
router.delete("/:id", (req, res) => {
  const idx = materials.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Malzeme bulunamadı" });
  materials[idx].deleted = true;
  auditLog.push({ malzemeId: req.params.id, action: "delete", user: "demo", date: new Date() });
  res.json({ success: true });
});

// Geçmiş (audit log)
router.get("/:id/history", (req, res) => {
  const logs = auditLog.filter(l => l.malzemeId === req.params.id);
  res.json(logs);
});

module.exports = router;