import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const cabinet = localFont({
  src: [
    { path: "../fonts/CabinetGrotesk-400.woff2", weight: "400" },
    { path: "../fonts/CabinetGrotesk-500.woff2", weight: "500" },
    { path: "../fonts/CabinetGrotesk-700.woff2", weight: "700" },
    { path: "../fonts/CabinetGrotesk-800.woff2", weight: "800" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Logo call.lab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = { themeColor: "#f3f5f9" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  logo: `${site.url}/logo.svg`,
  image: `${site.url}/og.png`,
  areaServed: { "@type": "Country", name: "Indonesia" },
  knowsAbout: ["Web development", "Digital marketing", "SEO", "Social media marketing", "Meta Ads", "Google Ads"],
  ...(site.email ? { email: site.email } : {}),
  ...(site.whatsapp ? { telephone: `+${site.whatsapp}` } : {}),
  sameAs: site.socials.map((s) => s.url).filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${cabinet.variable} ${mono.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
