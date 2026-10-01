# call.lab

Landing page call.lab, jasa website + iklan Meta untuk UMKM. Tagline: "Call on Duty, always call for website".

## Fitur
- Hero yang terkunci saat di-scroll: empat "bahan" (Website, SEO, Iklan, Konten) jatuh ke flask dan cairannya naik.
- Filosofi CALL.LAB (Create, Adapt, Launch, Learn) yang muncul kata per kata saat di-scroll, kartu layanan bertumpuk,
  proses kerja Create/Adapt/Launch/Learn yang bergeser horizontal.
- Paket bundel website + iklan Meta sekali bayar (Silver, Gold, Gold+, Platinum) dengan tombol WhatsApp berisi pesan paket.
- Kontak WhatsApp, email dan media sosial dari environment variable.
- Menghormati `prefers-reduced-motion`: tanpa pin dan animasi, semua konten tampil statis.
- SEO: metadata, Open Graph, JSON-LD `ProfessionalService`, `robots.txt`, `sitemap.xml`.

## Stack
Next.js 16 (App Router, static export), React 19, TypeScript, plain CSS, GSAP ScrollTrigger, Lenis.
Font: Cabinet Grotesk (Fontshare) dan JetBrains Mono. Logo: `brand/callab-logo.svg`.

## Jalankan di lokal
```bash
npm install
cp .env.example .env.local   # isi kontak asli di sini, file ini tidak ikut git
npm run dev
```

## Build dan deploy
`npm run build` menghasilkan folder `out/` berisi HTML/CSS/JS statis. Cukup disajikan oleh web server
(misalnya Caddy `file_server`), tidak butuh proses Node di server.

## Status
- Isi dan harga paket di `src/content/packages.ts` masih DRAFT, harus diganti dengan penawaran asli.
- Daftar layanan di `src/components/Services.tsx` belum disamakan dengan isi paket (masih menyebut Google Ads, konten sosmed, SEO).
- Gaya bahasa belum seragam: sebagian "lo/kita", bagian filosofi "kami".
- Foto di `public/img/` dari Unsplash (lisensi Unsplash). Sebaiknya diganti foto tim dan hasil kerja sendiri.

## Brand
Nama, logo dan aset brand call.lab milik pemiliknya. Tidak ada lisensi yang diberikan untuk memakai brand ini.
