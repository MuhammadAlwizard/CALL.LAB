// Prices set by the owner (2026-09-30). Every package bundles a website with promotion through Meta Ads,
// paid once. The item lists are still a DRAFT for the owner to confirm before launch.
// Yearly renewal set by the owner (2026-10-02): the first year is in the package price, same price for .com or .co.id.

export type Renewal = {
  price: string;
  items: string[];
};

const siteRenewal: Renewal = {
  price: "Rp 489rb / tahun",
  items: ["Domain .com atau .co.id", "Hosting + SSL (https)", "Backup rutin"],
};

const shopRenewal: Renewal = {
  price: "Rp 989rb / tahun",
  items: ["Domain .com atau .co.id", "Hosting + SSL (https)", "Backup rutin data toko", "Perbaikan kalau ada error"],
};

export type Tier = {
  slug: "silver" | "gold" | "gold-plus" | "platinum";
  name: string;
  forWho: string;
  price: string;
  items: string[];
  renewal: Renewal;
};

export const tiers: Tier[] = [
  {
    slug: "silver",
    name: "Silver",
    forWho: "Buat usaha yang baru mulai online",
    price: "Rp 1,7 juta",
    items: ["Landing page satu halaman", "Tampilan rapi di HP", "Tombol WhatsApp langsung chat", "Iklan Meta Ads buat usaha lo", "Desain materi iklan"],
    renewal: siteRenewal,
  },
  {
    slug: "gold",
    name: "Gold",
    forWho: "Buat usaha yang mau tampil serius",
    price: "Rp 2,5 juta",
    items: [
      "Website beberapa halaman",
      "Desain sesuai brand",
      "SEO dasar biar muncul di Google",
      "Iklan Meta Ads di Instagram dan Facebook",
      "Riset target pembeli",
      "Laporan hasil iklan",
    ],
    renewal: siteRenewal,
  },
  {
    slug: "gold-plus",
    name: "Gold+",
    forWho: "Buat usaha yang mau jualan dari web",
    price: "Rp 3,3 juta",
    items: ["Semua isi website Gold", "Toko online dengan katalog dan keranjang", "Pesanan langsung masuk WhatsApp", "Iklan Meta Ads ke halaman produk"],
    renewal: shopRenewal,
  },
  {
    slug: "platinum",
    name: "Platinum",
    forWho: "Buat usaha yang siap digas penuh",
    price: "Rp 4,9 juta",
    items: [
      "Toko online lengkap",
      "Panel admin untuk kelola produk",
      "Iklan Meta Ads dan retargeting",
      "Pemasangan Meta Pixel",
      "Riset target pembeli",
      "Laporan hasil iklan",
    ],
    renewal: shopRenewal,
  },
];
