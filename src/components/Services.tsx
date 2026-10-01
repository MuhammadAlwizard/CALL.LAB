"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./motion";

const WEB = ["Landing page dan company profile", "Toko online", "Desain yang ikut karakter brand", "Kecepatan dan SEO teknis", "Hosting dan perawatan"];
const MARKETING = ["Iklan Meta Ads dan Google Ads", "Konten Instagram dan TikTok", "Threads dan X", "SEO dan artikel", "Riset audiens", "Laporan yang bisa dibaca"];

export function Services() {
  const root = useRef<HTMLElement>(null);

  // The card underneath shrinks back a little while the next one slides over it.
  useEffect(() => {
    const section = root.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const first = section.querySelector(".svc--web");
      const second = section.querySelector(".svc--mkt");
      gsap.to(first, {
        scale: 0.93,
        opacity: 0.55,
        ease: "none",
        scrollTrigger: { trigger: second, start: "top bottom", end: "top 20%", scrub: true },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section className="services wrap" id="layanan" ref={root}>
      <div className="services__head">
        <h2 className="display" data-reveal>
          Dua keahlian.
          <br />
          Paling kuat kalau digabung.
        </h2>
        <p data-reveal>
          Website bagus tanpa pengunjung itu sepi. Iklan ramai tanpa website yang siap itu buang uang. Kita pegang dua-duanya.
        </p>
      </div>

      <div className="stack">
        <article className="svc svc--web">
          <div className="svc__photo">
            <img src="/img/web.webp" alt="Laptop menampilkan kode website di meja kerja" loading="lazy" width={1400} height={932} />
          </div>
          <div className="svc__body">
            <div>
              <h3 className="display svc__title">Web Development</h3>
              <p className="svc__lead">Website yang cepat dibuka, jelas dibaca, dan bikin orang langsung ngehubungin lo.</p>
            </div>
            <ul className="svc__list">
              {WEB.map((item) => (
                <li key={item}>
                  <span className="plus" aria-hidden="true">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="svc svc--mkt">
          <div className="svc__body">
            <div>
              <h3 className="display svc__title">Digital Marketing</h3>
              <p className="svc__lead">Orang yang tepat ngelihat bisnis lo, di tempat mereka sudah menghabiskan waktu.</p>
            </div>
            <ul className="svc__list">
              {MARKETING.map((item) => (
                <li key={item}>
                  <span className="plus" aria-hidden="true">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="svc__photo">
            <img src="/img/marketing.webp" alt="Laptop menampilkan dashboard analitik penjualan" loading="lazy" width={1400} height={997} />
          </div>
        </article>
      </div>
    </section>
  );
}
