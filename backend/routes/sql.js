const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Sadece SELECT sorgularına izin veriyoruz!
router.post('/execute', async (req, res) => {
  const { sql } = req.body;
  if (!sql || !sql.trim().toLowerCase().startsWith('select')) {
    return res.status(400).json({ error: 'Sadece SELECT sorgularına izin verilmektedir.' });
  }
  try {
    const result = await pool.query(sql);
    res.json({ rows: result.rows, fields: result.fields });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;