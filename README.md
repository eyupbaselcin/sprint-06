# Kampüs Etkinlikleri

**Sprint 6 + Vize** · Eyüp Başelçin · 2416501043

Kampüsteki seminer, atölye, söyleşi ve yarışmaları keşfetmek ve yönetmek için duyarlı bir web uygulaması.

**Canlı uygulama:** [eyupbaselcin-frontend.vercel.app](https://eyupbaselcin-frontend.vercel.app)
**GitHub:** [eyupbaselcin/sprint-06](https://github.com/eyupbaselcin/sprint-06)

## Özellikler

- Yaklaşan etkinlikleri ana sayfada görüntüleme
- Etkinlikleri ada göre arama ve kategoriye göre filtreleme
- Etkinlik detaylarını ayrı URL’lerde açma
- Etkinlik ekleme, düzenleme ve silme
- Form alanlarında doğrulama ve kullanıcıya hata mesajı gösterme
- Yönetim listesini geniş ekranda tablo, mobilde kart olarak görüntüleme
- Bilgileri tarayıcı `localStorage` alanında saklama
- Giriş, kayıt ve şifre yenileme ekranları
- Bilinmeyen adresler için 404 sayfası

> Giriş, kayıt ve şifre yenileme ekranları arayüz demosudur; uygulamada kullanıcı hesabı veya sunucu tarafı kimlik doğrulama bulunmaz. Etkinlik verileri yalnızca mevcut tarayıcıda saklanır.

## Sayfalar

| Adres | Açıklama |
| --- | --- |
| `/` | Ana sayfa ve yaklaşan etkinlikler |
| `/events` | Etkinlik arama ve filtreleme |
| `/events/:eventId` | Etkinlik detayı |
| `/admin` | Etkinlik yönetim listesi |
| `/admin/new` | Etkinlik oluşturma |
| `/admin/:eventId/edit` | Etkinlik düzenleme |
| `/login` | Giriş arayüzü |
| `/register` | Kayıt arayüzü |
| `/forgot-password` | Şifre yenileme arayüzü |
| Diğer adresler | 404 sayfası |

## Teknolojiler

- React 19 ve TypeScript
- React Router 7
- Vite 8
- Oxlint

## Geliştirme

Node.js `22.12` veya üzeri gereklidir.

```bash
npm install
npm run dev
```

Üretim derlemesi ve kalite kontrolü:

```bash
npm run build
npm run lint
npm run preview
```

## Vercel Dağıtımı

Proje GitHub deposuna bağlıdır ve `main` branch’ine gönderilen commit’ler production dağıtımını tetikler.

- Proje adı: `eyupbaselcin-frontend`
- Framework: Vite
- Root Directory: `.`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Rewrite: `vercel.json`, React Router adreslerinin doğrudan açılmasını sağlar.
