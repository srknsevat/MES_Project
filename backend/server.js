const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// JSON gövde parse edici middleware
app.use(express.json());

// CORS middleware
app.use(cors());

// Rotaları ekle
const authRoutes = require('./routes/auth');
// Diğer route dosyalarını da benzer şekilde ekleyebilirsin
// const licenseRoutes = require('./routes/license');
// const transactionsRoutes = require('./routes/transactions');

app.use('/api/auth', authRoutes);
// app.use('/api/license', licenseRoutes);
// app.use('/api/transactions', transactionsRoutes);

// Basit bir ana endpoint (opsiyonel)
app.get('/', (req, res) => {
  res.send('MES Backend API çalışıyor');
});

// Hata yönetimi middleware'i
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Bir sunucu hatası oluştu.' });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sunucu ${PORT} portunda tüm ağlarda çalışıyor.`);
});

const sqlRoutes = require('./routes/sql');
app.use('/api/sql', sqlRoutes);