"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./motion";

// Words wrapped in *stars* get the accent color.
const LEAD =
  "Setiap ide berawal dari sebuah *call:* kebutuhan, masalah, atau visi yang ingin diwujudkan menjadi sesuatu yang nyata.";

const ACRONYM = ["Create.", "Adapt.", "Launch.", "Learn."];

// Splits text into words that light up one by one while scrolling.
function Words({ text }: { text: string }) {
  return text.split(" ").map((word, i) => {
    const hl = word.startsWith("*");
    return (
      <span key={i}>
        <span className={`w${hl ? " hl" : ""}`}>{word.replace(/\*/g, "")}</span>{" "}
      </span>
    );
  });
}

export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.5 },
      });
      tl.to(".w", { opacity: 1, stagger: 0.1, duration: 0.3, ease: "none" }).fromTo(
        ".manifesto__photo",
        { clipPath: "inset(100% 0 0 0 round 28px)", y: 60 },
        { clipPath: "inset(0% 0 0 0 round 28px)", y: 0, duration: 1.2, ease: "power2.out" },
        0.6,
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section className="manifesto" ref={root} aria-labelledby="manifesto-title">
      <div className="wrap manifesto__stage">
        <div className="manifesto__copy">
          <h2 className="mono manifesto__eyebrow" id="manifesto-title">
            Tentang CALL.LAB
          </h2>
          <p className="manifesto__text">
            <Words text={LEAD} />
          </p>

          <div className="manifesto__more">
            <p className="manifesto__acronym" aria-label="CALL: Create, Adapt, Launch, Learn">
              {ACRONYM.map((word) => (
                <span className="w" key={word}>
                  <b>{word[0]}</b>
                  {word.slice(1)}
                </span>
              ))}
            </p>
            <div className="manifesto__defs">
              <div>
                <h3 className="display">
                  <span className="w">CALL</span>
                </h3>
                <p>
                  <Words text="Koneksi: menghubungkan bisnis dengan audiens, ide dengan eksekusi, dan brand dengan dunia digital." />
                </p>
              </div>
              <div>
                <h3 className="display">
                  <span className="w">LAB</span>
                </h3>
                <p>
                  <Words text="Ruang untuk bereksperimen, mencoba, membangun, dan terus menyempurnakan ide." />
                </p>
              </div>
            </div>
            <p className="manifesto__belief">
              <Words text="Di CALL.LAB, kami percaya solusi digital yang baik bukan hanya dibuat, tetapi dieksplorasi, dikembangkan, dan terus beradaptasi." />
            </p>
            <p className="mono manifesto__sign">
              <Words text="We turn ideas into digital experiences that connect, create, and grow." />
            </p>
          </div>
        </div>
        <figure className="manifesto__photo" style={{ margin: 0 }}>
          <img src="/img/kolaborasi.webp" alt="Tim sedang bekerja bersama di satu meja dengan laptop" loading="lazy" width={1400} height={934} />
        </figure>
      </div>
    </section>
  );
}
