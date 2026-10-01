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
    const mm = gsap.matchMedia(section);

    // Laptop: scrolling down slides the cards sideways.
    mm.add("(min-width: 861px)", () => {
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
    });

    // Phone: sideways movement confuses people who try to swipe, so the cards stack downwards
    // and the one underneath shrinks back while the next slides over it, like the services cards.
    mm.add("(max-width: 860px)", () => {
      const steps = gsap.utils.toArray<HTMLElement>(".step:not(.step--intro)", section);
      // Only the text fades: with four cards stacked, fading the whole card would show the ones beneath through it.
      steps.slice(0, -1).forEach((step, i) => {
        const scrollTrigger = { trigger: steps[i + 1], start: "top bottom", end: "top 20%", scrub: true };
        gsap.to(step, { scale: 0.93, ease: "none", scrollTrigger });
        gsap.to(step.children, { opacity: 0.45, ease: "none", scrollTrigger });
      });
    });

    return () => mm.revert();
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
