// Answers use only facts the owner has confirmed (prices 2026-09-30, renewal 2026-10-02, remote work).
// Delivery time and revision counts are not decided yet, so they are left out on purpose.

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Berapa biaya jasa bikin website UMKM di call.lab?",
    a: "Paketnya mulai Rp 1,7 juta (Silver) sampai Rp 4,9 juta (Platinum), dibayar sekali buat pembuatan. Semua paket udah termasuk website, iklan Meta Ads, plus domain dan hosting tahun pertama.",
  },
  {
    q: "Ada biaya per tahun setelah website jadi?",
    a: "Ada, mulai tahun kedua. Silver dan Gold Rp 489rb per tahun, Gold+ dan Platinum Rp 989rb per tahun. Isinya domain, hosting, SSL (https) dan backup rutin. Buat Gold+ dan Platinum, perbaikan kalau ada error juga udah masuk.",
  },
  {
    q: "Bisnis gue di luar Bandung atau Jakarta, tetap bisa?",
    a: "Bisa. Kita kerja 100% online, jadi bisnis di kota mana pun di Indonesia tetap kita layani. Ngobrol, kirim bahan, sampai website jadi, semuanya lewat WhatsApp atau call.",
  },
  {
    q: "Budget iklan Meta Ads udah termasuk di harga paket?",
    a: "Belum. Harga paket buat setup dan jalanin iklannya. Budget iklan dibayar langsung ke Meta, besarnya lo yang tentuin sesuai kemampuan.",
  },
  {
    q: "Bisa pakai domain .co.id?",
    a: "Bisa, harganya sama kayak .com. Bedanya, .co.id butuh KTP dan dokumen usaha (misalnya NIB) buat didaftarkan.",
  },
  {
    q: "Bedanya website biasa sama toko online apa?",
    a: "Silver dan Gold itu website buat ngenalin usaha lo, dari landing page sampai beberapa halaman. Gold+ dan Platinum udah toko online: ada katalog dan keranjang, pesanan langsung masuk WhatsApp, dan Platinum punya panel admin buat kelola produk sendiri.",
  },
];
