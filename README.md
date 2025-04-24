# MES_PROJECT

Bu proje, modern web teknolojileri kullanılarak geliştirilecek büyük ölçekli bir uygulamanın temelini oluşturur.

## Amaç
- Modern ve kullanıcı dostu bir üretim yönetim sistemi (MES) geliştirmek
- Üretim süreçlerini dijitalleştirerek verimliliği ve izlenebilirliği artırmak
- Farklı departmanlar ve kullanıcı rollerine uygun esnek modüller sunmak
- Gerçek zamanlı veri toplama ve analiz ile karar destek mekanizmalarını güçlendirmek
- Kolay entegrasyon ve ölçeklenebilir mimari ile uzun vadeli sürdürülebilirlik sağlamak
- Kod kalitesini ve iş birliğini artırmak
- Geliştirici deneyimini iyileştirmek
- Açık ve anlaşılır dokümantasyon ile katkı sağlayacak herkese rehberlik etmek

### Hedef Kitle
Bu projenin hedef kitlesi şunlardır:
- Üretim tesislerinde çalışan yöneticiler: Fabrika ve üretim süreçlerinin genel yönetiminden sorumlu olan, verimlilik ve izlenebilirlik arayışında olan kişiler.
- Üretim mühendisleri ve operatörler: Üretim hattında aktif rol alan, süreçleri dijitalleştirerek hata ve gecikmeleri azaltmak isteyen teknik personel.
- Dijital dönüşüm projelerinde görev alan yazılım geliştiriciler: Üretim süreçlerini dijital ortama taşımak ve entegre sistemler geliştirmek isteyen yazılımcılar.
- Danışmanlar: Üretim yönetimi ve dijital dönüşüm alanında firmalara rehberlik eden, çözüm ve entegrasyon önerileri sunan profesyoneller.

Bu gruplar, projenin sunduğu modüler yapı ve gerçek zamanlı veri analizi sayesinde üretim süreçlerini daha etkin ve verimli yönetebileceklerdir.

### Çözülmek İstenen Problemler
- Manuel ve kağıt tabanlı üretim takibinin neden olduğu hata ve gecikmeler: Üretim süreçlerinde insan hatası, veri kaybı ve süreçlerin yavaşlaması gibi sorunlara yol açar.
- Farklı sistemler arasında veri bütünlüğü ve entegrasyon eksikliği: Birbirinden kopuk çalışan yazılımlar nedeniyle verilerde tutarsızlık ve bilgi akışında kopukluk yaşanır.
- Gerçek zamanlı raporlama ve izlenebilirlik ihtiyacı: Karar alma süreçlerinde gecikmeler ve geçmişe dönük izlenebilirlik eksikliği ortaya çıkar.
- Süreç şeffaflığı ve operasyonel verimlilik eksikliği: Üretim hattındaki darboğazlar, kayıplar ve verimsizlikler kolayca tespit edilemez.
- Anlık veri toplama ve analiz eksikliği: Üretimden gelen verilerin anlık olarak toplanamaması, hızlı müdahale ve iyileştirme fırsatlarını azaltır.
- Standartlaşma ve sürdürülebilirlik sorunları: Farklı departmanlar arasında süreçlerin standartlaştırılamaması, uzun vadede yönetim ve bakım zorluklarına neden olur.

### Vizyon
- Sektör bağımsız, modüler ve genişletilebilir bir MES platformu oluşturmak
- Açık kaynak topluluğu ile sürekli gelişen ve güncellenen bir ekosistem sağlamak
- Sektör bağımsız, modüler ve genişletilebilir bir MES platformu oluşturmak. Farklı sektörlerin ihtiyaçlarına kolayca uyarlanabilen esnek bir yapı hedeflenmektedir.
- Açık kaynak topluluğu ile sürekli gelişen ve güncellenen bir ekosistem sağlamak. Katılımcıların katkılarıyla inovasyonun ve sürdürülebilirliğin teşvik edilmesi amaçlanmaktadır.
- Modern yazılım mimarileri ve en iyi uygulamalar ile yüksek performanslı, güvenli ve ölçeklenebilir bir altyapı sunmak.
- Kullanıcı ve geliştirici topluluğu için kapsamlı dokümantasyon, eğitim materyalleri ve destek kanalları sağlamak.
- Dijital dönüşüm süreçlerinde liderlik ederek, üretim yönetiminde şeffaflık, verimlilik ve izlenebilirlikte sektöre öncülük etmek.

## Teknolojiler (Önerilen)

### Temel Altyapı
- **Microservis Mimarisi**: NestJS/Express tabanlı dağıtık servisler
- **Mesaj Kuyruklama**: RabbitMQ veya Apache Kafka ile event-driven iletişim
- **Containerizasyon**: Docker ve Kubernetes ile container yönetimi

### IoT & Edge Computing
- **Veri Toplama Protokolleri**: MQTT ve OPC UA desteği
- **Edge Cihaz Yönetimi**: Node-RED ile IoT gateway entegrasyonu

### Veri İşleme & Analiz
- **Python Veri Ekosistemi**: Pandas, NumPy ve Scikit-learn ile veri işleme
- **Node.js Kütüphaneleri**: Fastify, Socket.IO ve TensorFlow.js entegrasyonu
- **Gerçek Zamanlı Analiz**: Apache Spark Streaming veya Flink

### Frontend
- React (Vite ile) + TypeScript
- UI Kütüphaneleri: MUI veya Chakra UI
- State Yönetimi: Redux Toolkit veya Zustand

## Özelleştirilebilir Component Mimarisi
### Bileşen Tasarım Prensipleri
- Parametrik yapılandırma için JSON Schema tabanlı component tanımlama
- Drag & Drop bileşen oluşturucu (frontend/src/components/customizable)
- Dinamik property paneli ile gerçek zamanlı önizleme

### Parametrik Yapılandırma
- TypeScript decorator'ları ile meta veri tanımlama
- Validation kuralları için Joi entegrasyonu
- Theme override desteği ile görsel özelleştirme
- Dinamik Form Builder modülü (JSON schema tabanlı component konfigürasyonu)

### Template Yönetim Sistemi
- Kullanıcı template'leri için MongoDB şema tasarımı
- Rol bazlı erişim kontrolü (RBAC) API endpoint'leri
- Version kontrol entegrasyonu (GitLab/GitHub)

### Backend
- Ana Çatı: NestJS (Express.js tabanlı)
- API Standardı: REST & GraphQL hibrit yaklaşım
- Kimlik Doğrulama: Keycloak veya Auth0 entegrasyonu
- Lisans Kontrol Middleware: Kullanım limitleri ve modül erişim denetimleri

### Veritabanı
- **İlişkisel DB**: PostgreSQL (TimescaleDB eklentili)
- **NoSQL**: MongoDB veya Cassandra
- **Zaman Serileri**: InfluxDB veya QuestDB

## Katkı Rehberi
Projeye katkıda bulunmak isteyenler için aşağıdaki adımları takip edebilirsiniz:

1. **Fork**: Projeyi kendi GitHub hesabınıza fork edin.
2. **Clone**: Forkladığınız projeyi yerel makinenize klonlayın.
3. **Branch**: Yeni bir özellik veya düzeltme için bir branch oluşturun.
4. **Commit**: Yaptığınız değişiklikleri commit edin.
5. **Push**: Değişikliklerinizi GitHub'a push edin.
6. **Pull Request**: Ana projeye değişikliklerinizi içeren bir pull request gönderin.

### Kodlama Standartları
- Kodlarınızı yazarken temiz ve anlaşılır olmasına dikkat edin.
- Proje genelinde kullanılan kodlama standartlarına uyun.

### Test Stratejileri
- Yaptığınız değişikliklerin mevcut testleri bozmadığından emin olun.
- Yeni özellikler için gerekli testleri ekleyin.

### Lisans
Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakabilirsiniz.

### İletişim
Herhangi bir sorunuz veya öneriniz varsa, lütfen [email@example.com](mailto:email@example.com) adresinden bizimle iletişime geçin.

### 1. Ortam Kurulumu
```bash
# Frontend kurulumu (Vite + React)
npx --yes create-vite@latest frontend --template react-ts

# Backend kurulumu (NestJS)
npm init -y backend
cd backend
npm install --save @nestjs/core@10.0.0 @nestjs/common@10.0.0

# Temel bağımlılıklar
npm install typescript@5.0.4 ts-node@10.9.2 --save-dev
```

### 2. Docker Altyapısı
```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: mes_prod
      POSTGRES_USER: mes_admin
      POSTGRES_PASSWORD: securepass123
    ports:
      - "5432:5432"

  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
```

### 3. Konfigürasyon Dosyaları
```env
# .env.example
NODE_ENV=development
API_PORT=3000
DB_URL=postgresql://mes_admin:securepass123@localhost:5432/mes_prod
JWT_SECRET=your_secure_secret_here
```

### 4. Modül Planlama
```text
src/
├── modules/
│   ├── production/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── entities/
│   ├── quality/
│   └── maintenance/
├── core/
│   ├── exceptions/
│   └── interceptors/
└── shared/
    ├── utils/
    └── decorators/
```

### 5. Başlama Komutları
```bash
# Development modunda çalıştırma
cd frontend && npm run dev
cd backend && npm run start:dev

# Üretim build
npm run build --prefix frontend
npm run build --prefix backend
```

---

Her aşamada detaylı rehberlik ve destek sağlanacaktır.