const express = require('express');
const jwt = require('jsonwebtoken'); // JWT kütüphanesini ekle
const bcrypt = require('bcrypt'); // Bcrypt kütüphanesini ekle

const router = express.Router();

// Örnek Kullanıcı Verisi (Normalde veritabanından gelir)
// Şifre 'admin123' ün bcrypt ile hashlenmiş hali (salt round 10)
// Gerçek uygulamada kullanıcı kaydı sırasında hashlenmeli
const sampleUser = {
    id: 'user-1',
    username: 'admin',
    passwordHash: '$2b$10$abcdefghijklmnopqrstuv', // Buraya 'admin123' ün gerçek hash'i gelmeli
    roles: ['admin', 'editor']
};

// Yeni bir kullanıcı için şifre hashleme örneği (Sadece gösterme amaçlı)
// const saltRounds = 10;
// const plainPassword = 'admin123';
// bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
//     if (err) { console.error("Hashleme hatası:", err); return; }
//     console.log("admin123 için hash:", hash);
//     // Bu hash'i sampleUser.passwordHash yerine koyun
// });


// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // 1. Kullanıcıyı bul (Şimdilik örnek kullanıcıyı kullanıyoruz)
    if (username !== sampleUser.username) {
      return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
    }

    // 2. Şifreyi karşılaştır
    // const isMatch = await bcrypt.compare(password, sampleUser.passwordHash);
    // if (!isMatch) {
    //   return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
    // }
    // --- Geçici olarak bcrypt karşılaştırmasını yorum satırı yapıp basit kontrolle devam edelim ---
    // --- Yukarıdaki bcrypt.hash ile ürettiğiniz hash'i ve bu kontrolü aktif etmelisiniz ---
     if (password !== 'admin123') { // !! Bu satırı gerçek hash kontrolü ile değiştirin !!
       return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
     }


    // 3. JWT Oluştur
    const payload = {
        userId: sampleUser.id,
        username: sampleUser.username,
        roles: sampleUser.roles
    };

    // Ortam değişkeninden gizli anahtarı al
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("JWT_SECRET tanımlı değil!");
        return res.status(500).json({ error: 'Sunucu yapılandırma hatası.' });
    }

    const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // Token 1 saat geçerli

    // Token'ı ve kullanıcı bilgilerini (şifre hariç) geri döndür
    res.json({
        message: 'Login successful',
        token: token,
        user: {
            id: sampleUser.id,
            username: sampleUser.username,
            roles: sampleUser.roles
        }
     });

  } catch (error) {
     next(error);
  }
});

// ... (Diğer auth rotaları eklenebilir: /register, /logout vb.) ...

module.exports = router;
// ... existing code ...