"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./motion";

const INGREDIENTS = ["Website", "SEO", "Iklan", "Konten"];
const EMPTY = 490;
const FULL = 120;

// One wave period is 100 units wide, so translating the path by -100 loops without a jump.
const WAVE =
  "M-100 0" + " q25 -12 50 0 t50 0".repeat(13) + " V620 H-100 Z";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const vessel = section.querySelector<HTMLElement>(".vessel")!;
    const liquid = section.querySelector<SVGGElement>(".liquid")!;

    if (prefersReducedMotion()) {
      liquid.setAttribute("transform", `translate(0 ${FULL})`);
      vessel.classList.add("is-full");
      return;
    }

    const ctx = gsap.context(() => {
      const chips = gsap.utils.toArray<HTMLElement>(".chip", section);
      const step = (EMPTY - FULL) / chips.length;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => vessel.classList.toggle("is-full", self.progress > 0.9),
        },
      });

      tl.to({}, { duration: 0.25 });
      chips.forEach((chip, i) => {
        const toMouth = {
          x: () => vessel.offsetWidth / 2 - (chip.offsetLeft + chip.offsetWidth / 2),
          y: () => vessel.offsetHeight * 0.04 - (chip.offsetTop + chip.offsetHeight / 2),
        };
        tl.to(chip, { ...toMouth, rotate: i % 2 ? 8 : -8, duration: 0.55, ease: "power2.inOut" })
          .to(chip, { y: () => `+=${vessel.offsetHeight * 0.22}`, scale: 0.35, autoAlpha: 0, duration: 0.3, ease: "power2.in" })
          .to(liquid, { y: EMPTY - step * (i + 1), duration: 0.45, ease: "power1.out" }, "<0.1");
      });
      tl.fromTo(".result", { autoAlpha: 0, y: 24, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(2)" }).to(
        {},
        { duration: 0.35 },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <div className="wrap hero__stage">
        <div className="hero__copy">
          <p className="mono hero__eyebrow">Web development + digital marketing</p>
          <h1 className="display">
            Call on Duty
            <span className="accent hero__h1-line">always call for website</span>
          </h1>
          <p className="hero__sub">Website + iklan Meta buat bisnis lo, beres sekali bayar.</p>
          <div className="hero__actions">
            <a className="btn btn--accent" href="#kontak">
              Call kita <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a className="textlink" href="#paket">Lihat paket</a>
          </div>
        </div>

        <div className="vessel" aria-hidden="true">
          <svg viewBox="0 0 300 520">
            <defs>
              <clipPath id="vessel-inside">
                <path d="M60 44V456a24 24 0 0 0 24 24H216a24 24 0 0 0 24-24V44Z" />
              </clipPath>
            </defs>
            <g clipPath="url(#vessel-inside)">
              <g className="liquid" transform={`translate(0 ${EMPTY})`}>
                <g transform="translate(-40 -6)">
                  <path className="vessel__wave vessel__wave--back" d={WAVE} fill="#ff5a1f" />
                </g>
                <path className="vessel__wave" d={WAVE} fill="#ff5a1f" />
              </g>
              <g fill="#f3f5f9">
                <circle className="bubble" cx="96" cy="462" r="7" />
                <circle className="bubble" cx="150" cy="470" r="5" />
                <circle className="bubble" cx="196" cy="458" r="8" />
                <circle className="bubble" cx="124" cy="466" r="4" />
              </g>
            </g>
            <path
              fill="#021042"
              fillRule="evenodd"
              d="M40 40H260V456a44 44 0 0 1-44 44H84a44 44 0 0 1-44-44ZM60 40V456a24 24 0 0 0 24 24H216a24 24 0 0 0 24-24V40Z"
            />
            <path fill="#021042" d="M34 8H266a18 18 0 0 1 0 36H34a18 18 0 0 1 0-36Z" />
          </svg>
          {INGREDIENTS.map((label, i) => (
            <span className="chip" data-i={i} key={label}>
              {label}
            </span>
          ))}
          <span className="result">
            = bisnis yang <span>tumbuh</span>
          </span>
        </div>
      </div>
    </section>
  );
}
