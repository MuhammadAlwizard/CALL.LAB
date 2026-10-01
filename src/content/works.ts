export type Work = {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  tags: string[];
  image: string;
  width: number;
  height: number;
  alt: string;
};

export const works: Work[] = [
  {
    slug: "enjaz",
    name: "Enjaz Instan Properti",
    kind: "Website + panel admin",
    summary: "Website tiga bahasa (Indonesia, Inggris, Arab) untuk sewa villa, kendaraan dan paket tour, lengkap dengan panel admin. Setiap pertanyaan pengunjung langsung masuk ke WhatsApp.",
    tags: ["Next.js", "MariaDB", "3 bahasa"],
    image: "/img/works/enjaz.webp",
    width: 1600,
    height: 908,
    alt: "Tampilan website Enjaz Instan Properti",
  },
  {
    slug: "lumiera",
    name: "Lumiera Shine",
    kind: "Toko online",
    summary: "Toko online untuk brand hijab premium: katalog, keranjang, panduan cara beli, dan panel admin untuk kelola produk dan stok.",
    tags: ["Next.js", "MariaDB", "E-commerce"],
    image: "/img/works/lumiera.webp",
    width: 1600,
    height: 901,
    alt: "Tampilan toko online Lumiera Shine",
  },
  {
    slug: "rayn-gym",
    name: "Rayn Gym",
    kind: "Website + sistem member",
    summary: "Website gym dengan portal member untuk check-in pakai QR, poin dan rank tiap kunjungan, plus panel admin untuk membership, trainer dan kelas.",
    tags: ["Next.js", "QR check-in", "MariaDB"],
    image: "/img/works/rayngym.webp",
    width: 1600,
    height: 818,
    alt: "Tampilan website Rayn Gym",
  },
  {
    slug: "yasbutiii",
    name: "Yasbutiii",
    kind: "Landing page",
    summary: "Landing page dengan video layar penuh untuk sewa gaun pengantin, dekorasi dan baju wisuda. Tombol konsultasi WhatsApp selalu satu klik.",
    tags: ["Next.js", "Video hero", "WhatsApp"],
    image: "/img/works/yasbutiii.webp",
    width: 1600,
    height: 998,
    alt: "Tampilan landing page Yasbutiii",
  },
  {
    slug: "warung-wifi",
    name: "Warung WiFi",
    kind: "Dashboard pendapatan",
    summary: "Dashboard pendapatan harian usaha voucher WiFi yang menggantikan spreadsheet terpisah. Laporan Excel cukup sekali klik.",
    tags: ["Python", "Streamlit", "Excel"],
    image: "/img/works/warungwifi.webp",
    width: 1600,
    height: 906,
    alt: "Tampilan dashboard Warung WiFi",
  },
  {
    slug: "foxsay",
    name: "Foxsay",
    kind: "Asisten AI",
    summary: "Asisten AI untuk chat, baca dokumen, analisis data Excel dan input suara. Sudah dicoba 100 pengguna.",
    tags: ["Python", "Streamlit", "AI"],
    image: "/img/works/foxsay.webp",
    width: 1600,
    height: 902,
    alt: "Tampilan aplikasi Foxsay",
  },
];
