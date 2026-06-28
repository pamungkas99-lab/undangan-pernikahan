# Wedding Digital Invitation — Andra & Kalya

Undangan pernikahan digital premium, dibangun dengan Next.js 15 (App Router),
React 19, TypeScript, Tailwind CSS, dan Framer Motion. Scoped untuk **satu
pernikahan** (single-tenant), bukan platform SaaS multi-tenant.

## Yang sudah dibangun (Fase 1)

- **Cover screen** — animasi amplop & segel lilin terbuka, nama tamu otomatis
  dari URL (`?to=Nama+Tamu`), tombol "Buka Undangan" yang men-trigger musik.
- **Home / Hero** — judul nama mempelai dengan efek shimmer emas, kutipan,
  countdown realtime, indikator scroll.
- **Profile Mempelai** — foto, nama, orang tua, Instagram, cerita singkat.
- **Love Story** — timeline dengan signature "gold thread" yang menyambungkan
  setiap momen (Pertama Bertemu → Lamaran → Menikah).
- **Detail Acara** — Akad & Resepsi dengan tanggal, lokasi, dan tombol arah.
- **RSVP** — form dengan validasi `react-hook-form` + `zod`, terhubung ke API
  route `/api/rsvp` yang melakukan validasi ulang di server dan rate limiting.
- **Ucapan & Doa** — wall ucapan dengan like dan balasan admin.
- **Hadiah Digital** — bank transfer dengan copy-to-clipboard, QRIS.
- **Music player** — tombol play/pause melayang, autoplay setelah undangan dibuka.
- **Database schema (Prisma)** — model lengkap: Wedding, Event, LoveStory,
  GalleryItem, Guest, Wish, GiftAccount, Visit, AdminUser.
- **Security headers** dasar (`next.config.mjs`): X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy.

## Yang BELUM dibangun (fase lanjutan — lihat catatan di bawah)

Scope awal yang diminta sangat luas (dashboard admin penuh, payment gateway,
WhatsApp/email blast, QR check-in, PWA, multi-template builder, dsb). Ini
adalah pekerjaan signifikan yang sebaiknya dikerjakan bertahap:

1. **Dashboard Admin** — statistik visitor/RSVP/gift, kelola galeri & musik,
   export Excel/CSV, moderasi ucapan.
2. **Autentikasi admin** — Clerk atau Auth.js dengan role ADMIN/OWNER.
3. **Galeri foto/video** — masonry grid, lightbox, lazy loading (Cloudinary).
4. **Live streaming embed** (YouTube/Zoom/Google Meet).
5. **Payment gateway** untuk fitur premium (Midtrans/Xendit/Stripe) — *tidak
   relevan untuk single-wedding, hanya relevan jika di masa depan dijadikan SaaS*.
6. **PWA** — manifest, service worker, push notification.
7. **Analytics** — Google Analytics, Meta Pixel, visitor logging ke tabel `Visit`.
8. **QR check-in** untuk hari-H.
9. **Testing** (unit + e2e) dan **CI/CD** (GitHub Actions) untuk deployment otomatis.

## Menjalankan secara lokal

```bash
npm install
cp .env.example .env       # isi DATABASE_URL, dst.
npx prisma migrate dev     # buat tabel di Postgres
npm run dev
```

Buka `http://localhost:3000/?to=Nama%20Tamu` untuk melihat undangan dengan
nama tamu otomatis.

## Mengganti data pernikahan

Semua konten (nama, tanggal, lokasi, cerita, foto) saat ini berada di
`lib/weddingData.ts` sebagai data statis yang sepenuhnya berfungsi tanpa
database. Ganti nilai-nilai di file ini dengan data asli Anda — setiap
komponen sudah terhubung ke sana. Foto: letakkan file di `public/images/`
dengan nama yang sama seperti yang dirujuk (`groom.jpg`, `bride.jpg`, dst.),
atau ganti path-nya ke URL Cloudinary.

Musik: letakkan file MP3 di `public/audio/wedding-theme.mp3`.

## Struktur folder

```
app/
  layout.tsx          # root layout, font, metadata SEO
  page.tsx            # halaman undangan (cover + semua section)
  globals.css         # design tokens, signature gold-thread, a11y
  api/rsvp/route.ts   # endpoint RSVP dengan validasi server-side
components/
  CoverScreen.tsx
  Hero.tsx
  CoupleProfile.tsx
  LoveStory.tsx
  EventDetail.tsx
  RSVPForm.tsx
  WishesWall.tsx
  GiftSection.tsx
  MusicPlayer.tsx
  Footer.tsx
  Countdown.tsx
lib/
  weddingData.ts      # data pernikahan (ganti dengan data asli)
prisma/
  schema.prisma       # ERD lengkap
```

## Catatan jujur tentang scope asli

Brief awal meminta cakupan setara produk SaaS enterprise penuh (multi-template,
theme builder drag-and-drop, WhatsApp/email blast, QR check-in, PWA, payment
gateway, CI/CD, dsb) sekaligus dalam satu permintaan. Itu adalah proyek
berbulan-bulan untuk tim sungguhan, bukan sesuatu yang realistis diselesaikan
dalam satu sesi. Yang dikerjakan di sini adalah **fondasi yang benar-benar
jalan dan production-quality** untuk bagian inti (halaman undangan publik +
schema database), supaya bisa dipakai langsung dan dikembangkan bertahap ke
fase-fase berikutnya sesuai prioritas Anda.
