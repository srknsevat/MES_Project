const Redis = require('ioredis');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

class LicenseService {
 constructor() {
 this.redis = new Redis();
 this.encryptionKey = process.env.LICENSE_ENCRYPTION_KEY || 'default-key';
 }

 async validateLicenseKey(licenseKey) {
 try {
 const decrypted = this.decryptLicenseKey(licenseKey);
 return JSON.parse(decrypted);
 } catch (error) {
 return null;
 }
 }

 async checkLicenseAvailability(licenseId) {
 const [currentUsers, maxUsers] = await Promise.all([
 this.redis.scard(`license:${licenseId}:active_users`),
 this.redis.get(`license:${licenseId}:max_users`)
 ]);

 return {
 current: parseInt(currentUsers),
 max: parseInt(maxUsers),
 available: parseInt(maxUsers) - parseInt(currentUsers) > 0
 };
 }

 async addActiveUser(licenseId, userId) {
 const pipeline = this.redis.pipeline();
 pipeline.sadd(`license:${licenseId}:active_users`, userId);
 pipeline.expire(`license:${licenseId}:active_users`, 86400); // 24 saat
 await pipeline.exec();
 }

 async removeActiveUser(licenseId, userId) {
 await this.redis.srem(`license:${licenseId}:active_users`, userId);
 }

 generateLicenseKey(data) {
 const cipher = crypto.createCipheriv(
 'aes-256-cbc', 
 Buffer.from(this.encryptionKey), 
 Buffer.alloc(16, 0)
 );
 let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
 encrypted += cipher.final('hex');
 return encrypted;
 }

 decryptLicenseKey(encrypted) {
 const decipher = crypto.createDecipheriv(
 'aes-256-cbc', 
 Buffer.from(this.encryptionKey), 
 Buffer.alloc(16, 0)
 );
 let decrypted = decipher.update(encrypted, 'hex', 'utf8');
 decrypted += decipher.final('utf8');
 return decrypted;
 }
}

module.exports = new LicenseService();