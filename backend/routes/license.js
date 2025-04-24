const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Redis = require('ioredis');
const licenseService = require('../modules/license/services/LicenseService');
const { licenseMiddleware } = require('../modules/license/middleware/licenseMiddleware');
const { authenticateToken } = require('../middleware/authMiddleware'); // Yeni auth middleware'ini import et

// Redis bağlantısını server.js'den almak yerine burada yeniden oluşturabilir veya
// merkezi bir konfigürasyon dosyasından alabiliriz. Şimdilik yeniden oluşturalım.
const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

const router = express.Router();

// GET /api/license
router.get('/', async (req, res, next) => {
  try {
    const licenseKey = req.headers['x-license-key'];
    if (!licenseKey) {
      return res.status(400).json({ error: 'Lisans anahtarı başlıkta eksik (x-license-key)' });
    }
    const licenseData = await licenseService.validateLicenseKey(licenseKey);
    // licenseData null veya undefined ise hata fırlatabiliriz veya kontrol edebiliriz
    if (!licenseData) {
        return res.status(404).json({ error: 'Geçersiz veya bulunamayan lisans anahtarı.' });
    }
    const availability = await licenseService.checkLicenseAvailability(licenseData.id);

    res.json({
      id: licenseData.id,
      maxUsers: availability.max,
      currentUsers: availability.current,
      expirationDate: licenseData.expiration
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/license/generate
router.post('/generate', async (req, res, next) => {
  try {
    const { maxUsers, expirationDays } = req.body;
    if (!maxUsers || !expirationDays) {
        return res.status(400).json({ error: 'maxUsers ve expirationDays gereklidir.' });
    }
    const licenseData = {
      id: uuidv4(),
      maxUsers: parseInt(maxUsers, 10),
      expiration: new Date(Date.now() + parseInt(expirationDays, 10) * 86400000).toISOString()
    };

    const licenseKey = licenseService.generateLicenseKey(licenseData);
    await redis.set(`license_data:${licenseData.id}`, JSON.stringify(licenseData));
    await redis.set(`license:${licenseData.id}:max_users`, licenseData.maxUsers);

    res.json({ key: licenseKey });
  } catch (error) {
     next(error);
  }
});

// GET /api/test (Bu rotayı da lisansla ilgiliyse buraya taşıyabiliriz)
// Eğer bu rota genel bir test ise ayrı bir test.js rotasına taşınabilir.
// Şimdilik burada bırakalım veya server.js'de kalabilir.
// GET /api/license/test (Hem JWT hem de Lisans kontrolü)
// Önce JWT kontrolü, sonra lisans kontrolü yapılır.
// Önce JWT kontrolü, sonra lisans kontrolü yapılır.
router.get('/test', authenticateToken, licenseMiddleware('testModule'), (req, res) => {
  // authenticateToken middleware'i req.user objesini ekler
  // licenseMiddleware middleware'i req.license objesini ekler (varsa)
  res.json({
      message: 'Kimlik doğrulaması ve Lisans kontrollü endpoint çalışıyor',
      user: req.user, // Giriş yapmış kullanıcı bilgileri
      licenseId: req.license?.id // Lisans bilgisi (varsa)
    });
});


module.exports = router;