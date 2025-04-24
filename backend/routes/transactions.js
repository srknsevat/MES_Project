// Express Router örneği
const express = require("express");
const router = express.Router();

// Veritabanı kodu ile SYSTRANSACTION'dan alınan veri örnek. GERÇEK KODA UYARLAYIN.
router.get("/", async (req, res) => {
  // SQL: SELECT tr_code as key, tr_name as name, tr_module_path as modulePath FROM SYSTRANSACTION
  const result = [
    { key: "MATERIAL", name: "Malzeme Kartı", modulePath: "material/MaterialForm" },
    { key: "QUALITY", name: "Kalite Kayıtları", modulePath: "quality/QualityForm" },
    // Dinamik olarak tabloya insertlenen her şey buraya gelir!
  ];
  res.json(result);
});

module.exports = router;