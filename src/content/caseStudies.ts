// Case study pages at /karya/<slug>/. On purpose there is NO link to the client's live site: the client's design
// taste is theirs, and some client businesses should not sit next to the call.lab brand (owner, 2026-10-02).
// Only facts known from the projects are written here. No invented results; add real numbers only from the owner.

export type CaseStudy = {
  /** One or two sentences: what the client does and what they needed. */
  intro: string;
  /** What call.lab built, in plain words. */
  built: string[];
  /** The tools used, each explained for a business owner. */
  stack: { name: string; why: string }[];
  /** Closest package, or null when the work goes beyond the packages. */
  pkg: string | null;
};

const NEXT = { name: "Next.js", why: "Kerangka website yang bikin halaman kebuka cepat dan gampang dibaca Google." };
const MARIADB = { name: "MariaDB", why: "Database buat nyimpan data yang berubah-ubah, kayak produk, member atau pesanan." };
const PYTHON = { name: "Python", why: "Bahasa pemrograman yang kuat buat ngolah data dan AI." };
const STREAMLIT = { name: "Streamlit", why: "Bikin aplikasi data dari Python jadi halaman web yang bisa dibuka di browser." };
const WA = { name: "WhatsApp", why: "Pengunjung langsung nyambung ke chat, tanpa form yang ribet." };

export const caseStudies: Record<string, CaseStudy> = {
  enjaz: {
    intro:
      "Enjaz Instan Properti menyewakan villa, kendaraan dan paket tour. Mereka butuh website yang bisa dibaca tamu berbahasa Indonesia, Inggris dan Arab, dengan isi yang bisa diurus sendiri dari panel admin.",
    built: [
      "Website publik dalam tiga bahasa: Indonesia, Inggris dan Arab",
      "Halaman villa, kendaraan dan paket tour yang diisi dari panel admin",
      "Panel admin terpisah buat kelola listing, testimoni dan pengaturan situs",
      "Form pemesanan dengan upload bukti pembayaran",
      "Setiap pertanyaan pengunjung langsung diteruskan ke WhatsApp",
    ],
    stack: [NEXT, MARIADB, WA],
    pkg: null,
  },
  lumiera: {
    intro:
      "Lumiera Shine adalah brand hijab premium yang butuh toko online sendiri, lengkap dengan cara ngatur produk dan stok.",
    built: [
      "Katalog produk dengan foto dan detail tiap varian",
      "Keranjang belanja",
      "Halaman panduan cara beli buat pembeli yang baru pertama kali",
      "Panel admin buat nambah produk dan ngatur stok sendiri",
    ],
    stack: [NEXT, MARIADB],
    pkg: "Platinum",
  },
  "rayn-gym": {
    intro:
      "Rayn Gym butuh website sekaligus sistem buat ngurus member, dari absen kunjungan sampai trainer dan kelas.",
    built: [
      "Website gym untuk calon member",
      "Portal member dengan check-in pakai kode QR",
      "Poin dan rank yang naik tiap kali member datang",
      "Panel admin buat kelola membership, trainer dan kelas",
    ],
    stack: [NEXT, MARIADB, { name: "QR check-in", why: "Member cukup scan kode di HP, absen tercatat otomatis." }],
    pkg: null,
  },
  yasbutiii: {
    intro:
      "Yasbutiii menyewakan gaun pengantin, dekorasi dan baju wisuda. Produknya visual banget, jadi halaman pertamanya harus langsung bikin orang kebayang.",
    built: [
      "Landing page dengan video layar penuh di bagian atas",
      "Bagian layanan untuk gaun pengantin, dekorasi dan baju wisuda",
      "Tombol konsultasi WhatsApp yang selalu cuma satu klik",
    ],
    stack: [NEXT, { name: "Video hero", why: "Video di bagian atas halaman, dioptimasi biar tetap ringan di HP." }, WA],
    pkg: "Gold",
  },
  "maison-la-vida": {
    intro:
      "Maison La Vida bikin event pool party bertema 2016 Rewind dan butuh satu halaman yang bangun suasana sekaligus ngatur reservasi meja.",
    built: [
      "Pintu masuk dengan suara yang langsung bangun suasana event",
      "Denah lokasi yang bisa diperbesar biar tamu lihat posisi meja",
      "Pilihan meja dengan kapasitas dan minimum charge",
      "Bagian tanya jawab dan reservasi langsung lewat WhatsApp",
    ],
    stack: [
      { name: "HTML, CSS, JavaScript", why: "Tanpa kerangka tambahan, jadi halaman satu event tetap ringan dan cepat." },
      { name: "GSAP", why: "Animasi halus yang jalan seiring halaman di-scroll." },
      WA,
    ],
    pkg: "Silver",
  },
  "warung-wifi": {
    intro:
      "Usaha voucher WiFi ini sebelumnya nyatat pendapatan harian di beberapa spreadsheet terpisah, dan butuh satu tempat buat lihat semuanya.",
    built: [
      "Dashboard pendapatan harian yang gantiin spreadsheet terpisah",
      "Ringkasan pendapatan yang langsung kebaca tanpa ngitung manual",
      "Laporan Excel yang cukup sekali klik",
      "Akses pakai login, karena datanya data keuangan",
    ],
    stack: [PYTHON, STREAMLIT, { name: "Excel", why: "Laporan tetap bisa dibuka dan dibagi pakai aplikasi yang udah biasa dipakai." }],
    pkg: null,
  },
  foxsay: {
    intro: "Foxsay adalah asisten AI yang dibikin buat bantu kerja sehari-hari: ngobrol, baca dokumen dan ngolah data.",
    built: [
      "Chat dengan AI",
      "Baca dan rangkum dokumen",
      "Analisis data dari file Excel",
      "Input pakai suara",
      "Sudah dicoba 100 pengguna",
    ],
    stack: [PYTHON, STREAMLIT, { name: "AI", why: "Model bahasa yang ngerti pertanyaan dan isi dokumen." }],
    pkg: null,
  },
};
