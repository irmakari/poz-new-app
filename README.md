# Poz App 📸 35mm Analog Film & Memory Journal

> **"Anılarını filme dönüştür. Günlerini fotoğraflar, notlar ve nostaljik hislerle sakla."**

---

## 📌 Proje Hakkında

**Poz App**, kullanıcıların anılarını analog 35mm film makaraları konseptiyle ölümsüzleştirdiği, günlük notlar tuttuğu ve fotoğraflar biriktirdiği mobil bir sosyal anı günlüğüdür.

### 🛠️ Teknolojik Mimari

- **Frontend:** React Native (Expo ~v54), TypeScript, Expo Router (File-based Routing)
- **Backend:** Node.js, Express.js, JWT Authentication
- **Veritabanı & Depolama:** Supabase PostgreSQL & Supabase Storage (Photo Bucket)
- **Arayüz & Tasarım:** Custom Scrapbook Editorial UI, Y2K Nostalgic Aesthetic, High-End Color Palette (`#F7FAFC` Ice Porcelain, Derin Lacivert `#0F172A`, Bordo `#6B1D2F`, Orman Yeşili `#14532D`)

---

## 🚀 Gelecek Özellikler & Yol Haritası (Future Features / TODO)

Aşağıdaki özellikler uygulamanın gelecek sürümlerinde canlıya alınmak üzere planlanmıştır:

- [ ] 🎵 **Günün Şarkısı (Live Music Integration & Audio Player):**
  - iTunes Search API entegrasyonu ile canlı müzik ve albüm kapağı arama.
  - O güne özel şarkı seçip anı kartında kaset çalarlı ses önizlemesi ile dinleme.
- [ ] 🎞️ **Fiziksel Film Yıkama & Baskı Siparişi (Darkroom Developing Service):**
  - Dolduğun 36 karelik makaraları fiziksel kargo adresi seçerek banyo/baskı siparişine dönüştürme.
- [ ] 👥 **Ortak Film Makaraları (Shared Film Rolls):**
  - Arkadaşlarınla birlikte ortak film makarası oluşturup aynı ruloya fotoğraf çekebilme.
- [ ] 🔔 **Günlük Hatırlatıcı Bildirimler (Push Notifications):**
  - "Günün karesini çekmeyi unutma" analog hatırlatıcı bildirimleri.

---

## 💻 Kurulum & Çalıştırma

### 1. Backend Server
```bash
cd server
npm install
npm run dev
```
Express sunucusu `http://localhost:5001` portunda yayına başlar.

### 2. Expo Frontend
```bash
npm install
npx expo start
```
Expo Go veya iOS/Android simülatörünüzle QR kodunu okutarak uygulamayı başlatabilirsiniz.
