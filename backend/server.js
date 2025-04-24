require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const { licenseMiddleware, releaseLicenseSlot } = require('./modules/license/middleware/licenseMiddleware'); // Artık rota içinde kullanılacak
// const licenseService = require('./modules/license/services/LicenseService'); // Artık rota içinde kullanılacak
// const { v4: uuidv4 } = require('uuid'); // Artık rota içinde kullanılacak
// const Redis = require('ioredis'); // Redis bağlantısı merkezi olarak yönetilebilir veya her rota kendi bağlantısını kurabilir. Şimdilik rotalarda bırakıldı.
// const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

// Rota dosyalarını import edelim
const licenseRoutes = require('./routes/license');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('MES_PROJECT Backend çalışıyor!');
});

// --- API Rotalarını Kullanma ---
// Rotaları ilgili prefixler altında gruplayalım
app.use('/api/license', licenseRoutes);
app.use('/api/auth', authRoutes); // Login rotası /api/auth/login olacak şekilde ayarlandı

// /api/test rotası licenseRoutes içine taşındığı için buradaki tanımı kaldırıyoruz.
// app.get('/api/test', licenseMiddleware('testModule'), (req, res) => {
//   res.json({ message: 'Lisans kontrollü endpoint çalışıyor' });
// });

// --- Merkezi Hata Yönetimi Middleware'i ---
app.use((err, req, res, next) => {
  console.error('Bir hata oluştu:', err.stack || err);

  // Lisanslama hatalarını özel olarak ele alabiliriz
  if (err.name === 'JsonWebTokenError' || err.message === 'invalid signature') {
      return res.status(401).json({ error: 'Geçersiz token.' });
  }
  if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token süresi dolmuş.' });
  }
   // Kendi tanımladığımız ForbiddenError gibi hataları yakalayabiliriz
  if (err.statusCode && err.message) {
       return res.status(err.statusCode).json({ error: err.message });
  }


  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.'
  });
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Sunucu ${PORT} portunda tüm ağlarda çalışıyor.`);
});
