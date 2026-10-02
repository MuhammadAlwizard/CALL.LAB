// Prices set by the owner (2026-09-30). Every package bundles a website with promotion through Meta Ads,
// paid once. The item lists are still a DRAFT for the owner to confirm before launch.
// Yearly renewal set by the owner (2026-10-02): the first year is in the package price, same price for .com or .co.id.
// Specs (delivery time, revisions, scope, ads, support) were left to Claude by the owner on 2026-10-02, from market norms.

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
  /** Same price in rupiah, for structured data. */
  amount: number;
  items: string[];
  /** Same labels in the same order on every card, so the tiers compare side by side. */
  specs: { label: string; value: string }[];
  renewal: Renewal;
};

export const tiers: Tier[] = [
  {
    slug: "silver",
    name: "Silver",
    forWho: "Buat usaha yang baru mulai online",
    price: "Rp 1,7 juta",
    amount: 1700000,
    items: ["Landing page satu halaman", "Tampilan rapi di HP", "Tombol WhatsApp langsung chat", "Iklan Meta Ads buat usaha lo", "Desain materi iklan"],
    specs: [
      { label: "Pengerjaan", value: "3-5 hari kerja" },
      { label: "Revisi", value: "2x" },
      { label: "Cakupan", value: "1 halaman" },
      { label: "Iklan Meta", value: "1 campaign, 7 hari" },
      { label: "Support gratis", value: "14 hari" },
    ],
    renewal: siteRenewal,
  },
  {
    slug: "gold",
    name: "Gold",
    forWho: "Buat usaha yang mau tampil serius",
    price: "Rp 2,5 juta",
    amount: 2500000,
    items: [
      "Website beberapa halaman",
      "Desain sesuai brand",
      "SEO dasar biar muncul di Google",
      "Iklan Meta Ads di Instagram dan Facebook",
      "Riset target pembeli",
      "Laporan hasil iklan",
    ],
    specs: [
      { label: "Pengerjaan", value: "7-10 hari kerja" },
      { label: "Revisi", value: "3x" },
      { label: "Cakupan", value: "Sampai 5 halaman" },
      { label: "Iklan Meta", value: "1 campaign, 14 hari" },
      { label: "Support gratis", value: "30 hari" },
    ],
    renewal: siteRenewal,
  },
  {
    slug: "gold-plus",
    name: "Gold+",
    forWho: "Buat usaha yang mau jualan dari web",
    price: "Rp 3,3 juta",
    amount: 3300000,
    items: ["Semua isi website Gold", "Toko online dengan katalog dan keranjang", "Pesanan langsung masuk WhatsApp", "Iklan Meta Ads ke halaman produk"],
    specs: [
      { label: "Pengerjaan", value: "14-21 hari kerja" },
      { label: "Revisi", value: "3x" },
      { label: "Cakupan", value: "5 halaman + 30 produk" },
      { label: "Iklan Meta", value: "1 campaign, 14 hari" },
      { label: "Support gratis", value: "30 hari" },
    ],
    renewal: shopRenewal,
  },
  {
    slug: "platinum",
    name: "Platinum",
    forWho: "Buat usaha yang siap digas penuh",
    price: "Rp 4,9 juta",
    amount: 4900000,
    items: [
      "Toko online lengkap",
      "Panel admin untuk kelola produk",
      "Iklan Meta Ads dan retargeting",
      "Pemasangan Meta Pixel",
      "Riset target pembeli",
      "Laporan hasil iklan",
    ],
    specs: [
      { label: "Pengerjaan", value: "21-30 hari kerja" },
      { label: "Revisi", value: "4x" },
      { label: "Cakupan", value: "Toko online + 50 produk" },
      { label: "Iklan Meta", value: "2 campaign, 30 hari" },
      { label: "Support gratis", value: "60 hari" },
    ],
    renewal: shopRenewal,
  },
];
