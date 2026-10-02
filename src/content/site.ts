// Contact details are public on the page, but they stay out of git: set them in .env.local (see .env.example).
const env = (value: string | undefined) => (value ?? "").trim();

const whatsapp = env(process.env.NEXT_PUBLIC_WHATSAPP).replace(/\D/g, "");
const email = env(process.env.NEXT_PUBLIC_EMAIL);

export const site = {
  name: "call.lab",
  url: env(process.env.NEXT_PUBLIC_SITE_URL).replace(/\/$/, "") || "http://localhost:3000",
  title: "Jasa Bikin Website + Iklan Meta untuk UMKM | call.lab",
  description:
    "Jasa bikin website UMKM plus iklan Meta, dikerjain online buat bisnis di seluruh Indonesia. Paket mulai Rp 1,7 juta, domain + hosting tahun pertama termasuk.",
  email,
  whatsapp,
  /** GA4 measurement ID. Set only on the server, so local runs are not counted. */
  gaId: env(process.env.NEXT_PUBLIC_GA_ID),
  socials: [
    { key: "instagram", label: "Instagram", url: env(process.env.NEXT_PUBLIC_INSTAGRAM_URL) },
    { key: "threads", label: "Threads", url: env(process.env.NEXT_PUBLIC_THREADS_URL) },
    { key: "tiktok", label: "TikTok", url: env(process.env.NEXT_PUBLIC_TIKTOK_URL) },
    { key: "x", label: "X (Twitter)", url: env(process.env.NEXT_PUBLIC_X_URL) },
  ] as const,
};

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return whatsapp ? `https://wa.me/${whatsapp}?text=${text}` : `https://wa.me/?text=${text}`;
}

export function mailLink(subject: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
