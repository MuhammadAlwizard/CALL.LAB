"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./motion";

const STEPS = [
  { word: "Create", text: "Bisnis, pesaing, dan calon pembeli dibedah dulu, baru website dan materi iklannya dibuat." },
  { word: "Adapt", text: "Desain dan isi disesuaikan dengan karakter brand dan masukan langsung dari pemilik bisnis." },
  { word: "Launch", text: "Website tayang, iklan Meta mulai jalan. Semuanya dicek ulang sebelum dan sesudah rilis." },
  { word: "Learn", text: "Hasil iklan dibaca bareng, lalu ditutup dengan laporan dan rekomendasi langkah berikutnya." },
];

export function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const track = section.querySelector<HTMLElement>(".process__track")!;
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true },
      });
      gsap.utils.toArray<HTMLElement>(".step__word", section).forEach((word) => {
        gsap.fromTo(
          word,
          { xPercent: 10 },
          {
            xPercent: 0,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: true },
          },
        );
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section className="process" id="proses" ref={root}>
      <div className="process__stage">
        <div className="process__track">
          <div className="step step--intro">
            <h2 className="display">
              Cara kerja
              <br />
              di lab kita.
            </h2>
            <div className="photo">
              <img src="/img/proses.webp" alt="Tangan menyusun alur halaman website di papan kerja" loading="lazy" width={1400} height={933} />
            </div>
          </div>
          {STEPS.map((step, i) => (
            <article className={`step${i === STEPS.length - 1 ? " step--last" : ""}`} key={step.word}>
              <h3 className="display step__word">{step.word}</h3>
              <p className="step__text">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
