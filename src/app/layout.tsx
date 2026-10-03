import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import { tiers } from "@/content/packages";
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
  // Search Console ownership, as a backup to public/googlef2d3649a721c65cf.html. Keep both.
  verification: { google: "eHCJo8CP8wYEe0_rJP0OaeznKO21iROf7LYHDSG05o0" },
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
  priceRange: "Rp 1,7 juta - Rp 4,9 juta",
  knowsAbout: ["Jasa pembuatan website", "Website UMKM", "Toko online", "SEO dasar", "Meta Ads"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Paket website + iklan Meta",
    itemListElement: tiers.map((t) => ({
      "@type": "Offer",
      name: `Paket ${t.name}`,
      description: t.items.join(", "),
      price: t.amount,
      priceCurrency: "IDR",
    })),
  },
  ...(site.email ? { email: site.email } : {}),
  ...(site.whatsapp ? { telephone: `+${site.whatsapp}` } : {}),
  ...(site.nib ? { identifier: { "@type": "PropertyValue", propertyID: "NIB", value: site.nib } } : {}),
  sameAs: site.socials.map((s) => s.url).filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${cabinet.variable} ${mono.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
      {site.gaId && <GoogleAnalytics gaId={site.gaId} />}
    </html>
  );
}
