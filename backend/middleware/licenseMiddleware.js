const LicenseService = require('../services/LicenseService');
const { ForbiddenError } = require('../errors');
const redis = new (require('ioredis'))();

const licenseMiddleware = (moduleName) => async (req, res, next) => {
  try {
    const licenseKey = req.headers['x-license-key'] || req.query.licenseKey;
    
    if (!licenseKey) throw new ForbiddenError('Lisans anahtarı gereklidir');
    
    const licenseData = await LicenseService.validateLicenseKey(licenseKey);
    const licenseId = licenseData?.id;
    
    // Modül ve süre kontrolü
    if (!licenseData?.modules.includes(moduleName)) {
      throw new ForbiddenError('Bu modül için lisans geçersiz');
    }
    
    // Eşzamanlı kullanıcı kontrolü
    const [currentUsers, maxUsers] = await Promise.all([
      redis.scard(`license:${licenseId}:active_users`),
      redis.get(`license:${licenseId}:max_users`)
    ]);
    
    if (currentUsers >= maxUsers) {
      throw new ForbiddenError('Lisans kullanıcı limiti doldu');
    }
    
    // Kullanıcıyı aktif listeye ekle
    await redis.sadd(`license:${licenseId}:active_users`, req.user.id);
    redis.expire(`license:${licenseId}:active_users`, 3600); // 1 saat
    
    req.license = { ...licenseData, currentUsers, maxUsers };
    next();
  } catch (error) {
    next(error);
  }
};

const releaseLicenseSlot = async (req, res, next) => {
  try {
    if (req.license?.id && req.user?.id) {
      await redis.srem(`license:${req.license.id}:active_users`, req.user.id);
    }
  } finally {
    next();
  }
};

module.exports = {
  licenseMiddleware,
  releaseLicenseSlot
};