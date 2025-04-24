const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Authorization başlığını al (Bearer TOKEN)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer'dan sonraki kısmı al

    if (token == null) {
        // Token yoksa 401 Unauthorized hatası döndür
        return res.status(401).json({ error: 'Erişim reddedildi. Token bulunamadı.' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("JWT_SECRET tanımlı değil!");
        // Sunucu hatası olarak logla ama kullanıcıya genel hata ver
        return res.status(500).json({ error: 'Sunucu yapılandırma hatası.' });
    }

    jwt.verify(token, secret, (err, userPayload) => {
        if (err) {
            // Token geçerli değilse (süresi dolmuş, imzası yanlış vb.) 403 Forbidden hatası döndür
            console.error("JWT Doğrulama Hatası:", err.message);
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Oturum süresi doldu. Lütfen tekrar giriş yapın.' });
            }
            return res.status(403).json({ error: 'Geçersiz token.' });
        }

        // Token geçerliyse, payload'ı (kullanıcı bilgileri) req objesine ekle
        req.user = userPayload;
        next(); // Sonraki middleware veya route handler'a geç
    });
};

// Rol bazlı yetkilendirme için ek bir middleware (opsiyonel)
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.roles) {
             // authenticateToken middleware'inin önce çalıştığından emin olun
            return res.status(403).json({ error: 'Yetkilendirme için kullanıcı rolleri bulunamadı.' });
        }

        const hasRole = req.user.roles.some(role => allowedRoles.includes(role));
        if (!hasRole) {
            return res.status(403).json({ error: 'Bu işleme erişim yetkiniz yok.' });
        }
        next();
    };
};


module.exports = {
    authenticateToken,
    authorizeRoles
};