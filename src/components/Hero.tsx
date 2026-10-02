"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "./motion";

const INGREDIENTS = ["Website", "SEO", "Iklan", "Konten"];

// Finger layers cut from one photo (public/img/hand). Each finger is two pieces: the base turns at the
// knuckle (pivot) and the tip bends at the middle joint. Points are % of the 900x952 image.
// Each chip hangs on its own finger: Website on the index, SEO on the little finger. f1 holds no string.
type Finger = { id: string; chip: number | null; pivot: number[]; joint: number[]; tip: number[] };
const FINGERS: Finger[] = [
  { id: "f1", chip: null, pivot: [13.59, 44.96], joint: [11.1, 57.11], tip: [6.38, 82.4] },
  { id: "f2", chip: 0, pivot: [30.76, 47.86], joint: [29.87, 63.94], tip: [31.96, 97.53] },
  { id: "f3", chip: 2, pivot: [47.68, 47.32], joint: [51.65, 59.64], tip: [50.8, 86.71] },
  { id: "f4", chip: 3, pivot: [67.32, 45.13], joint: [70.36, 60.55], tip: [70.14, 92.95] },
  { id: "f5", chip: 1, pivot: [85.94, 43.89], joint: [87.6, 54.41], tip: [92.17, 76.3] },
];
const STRUNG = FINGERS.filter((f) => f.chip !== null);
const FACTS = ["8 project udah jalan", "Mulai Rp 1,7 jt", "Domain + hosting tahun 1 termasuk"];
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
    const rig = section.querySelector<HTMLElement>(".rig")!;
    const vessel = section.querySelector<HTMLElement>(".vessel")!;
    const liquid = section.querySelector<SVGGElement>(".liquid")!;

    if (prefersReducedMotion()) {
      liquid.setAttribute("transform", `translate(0 ${FULL})`);
      vessel.classList.add("is-full");
      return;
    }

    const body = rig.querySelector<HTMLElement>(".hand__body")!;
    const chips = gsap.utils.toArray<HTMLElement>(".chip", section);
    const fingers = FINGERS.map((f) => rig.querySelector<HTMLElement>(`.finger[data-f="${f.id}"]`)!);
    const segs = fingers.map((finger) => finger.querySelector<HTMLElement>(".finger__seg")!);
    const tips = STRUNG.map((f) => rig.querySelector<HTMLElement>(`.finger[data-f="${f.id}"] .finger__tip`)!);
    const silks = gsap.utils.toArray<SVGGElement>(".silk", rig);
    // sag 1 = slack string hanging in a curve, 0 = pulled tight.
    const strings = STRUNG.map(() => ({ sag: 1, alpha: 1 }));

    // Redraw every string from its fingertip to the top of its chip. The tip is a marker inside the
    // finger, so it already carries the hand float, the hand tilt, the finger sway and the finger pull.
    const draw = () => {
      const box = rig.getBoundingClientRect();
      STRUNG.forEach((f, i) => {
        const tb = tips[i].getBoundingClientRect();
        const tx = tb.left - box.left;
        const ty = tb.top - box.top;
        const cb = chips[f.chip!].getBoundingClientRect();
        const cx = cb.left - box.left + cb.width / 2;
        const cy = cb.top - box.top + 2;
        const sag = strings[i].sag * Math.hypot(cx - tx, cy - ty) * 0.22;
        const d = `M${tx.toFixed(1)} ${ty.toFixed(1)} Q${((tx + cx) / 2).toFixed(1)} ${((ty + cy) / 2 + sag).toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)}`;
        silks[i].querySelectorAll("path").forEach((path) => path.setAttribute("d", d));
        silks[i].style.opacity = String(strings[i].alpha);
      });
    };

    // Only redraw while the hero is on screen.
    let visible = false;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(section);
    const tick = () => {
      if (visible) draw();
    };
    gsap.ticker.add(tick);

    const ctx = gsap.context(() => {
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
        const k = FINGERS.findIndex((f) => f.chip === i);
        const string = strings[STRUNG.findIndex((f) => f.chip === i)];
        // A chip on the left pulls its fingertip left, and the other way round.
        const lean = chip.offsetLeft + chip.offsetWidth / 2 < vessel.offsetWidth / 2 ? 5 : -5;
        const toMouth = {
          x: () => vessel.offsetWidth / 2 - (chip.offsetLeft + chip.offsetWidth / 2),
          y: () => vessel.offsetHeight * 0.04 - (chip.offsetTop + chip.offsetHeight / 2),
        };
        // The pulling finger bends mostly at its middle joint. Fingers share tendons, so the ones
        // beside it follow a little.
        const near = [k - 1, k + 1].filter((n) => n >= 0 && n < FINGERS.length);
        const pull = { duration: 0.18, ease: "power2.out" };
        const release = { rotation: 0, duration: 0.35, ease: "back.out(3)" };
        tl.to(string, { sag: 0, ...pull })
          .to(fingers[k], { rotation: lean * 0.6, ...pull }, "<")
          .to(segs[k], { rotation: lean * 2.4, ...pull }, "<")
          .to(near.map((n) => fingers[n]), { rotation: lean * 0.2, ...pull }, "<")
          .to(near.map((n) => segs[n]), { rotation: lean * 0.8, ...pull }, "<")
          // The whole hand lifts and leans toward the chip, as if it had weight.
          .to(body, { y: -14, rotation: lean * 0.45, ...pull }, "<")
          .to(chip, { ...toMouth, rotate: i % 2 ? 8 : -8, duration: 0.55, ease: "power2.inOut" })
          .to(body, { y: -6, rotation: lean * 0.2, duration: 0.55, ease: "sine.inOut" }, "<")
          .to(chip, { y: () => `+=${vessel.offsetHeight * 0.22}`, scale: 0.35, autoAlpha: 0, duration: 0.3, ease: "power2.in" })
          .to(string, { alpha: 0, duration: 0.2 }, "<0.1")
          .to([k, ...near].flatMap((n) => [fingers[n], segs[n]]), release, "<")
          .to(body, { y: 0, rotation: 0, duration: 0.4, ease: "back.out(2.5)" }, "<")
          .to(liquid, { y: EMPTY - step * (i + 1), duration: 0.45, ease: "power1.out" }, "<");
      });
      tl.fromTo(".result", { autoAlpha: 0, y: 24, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(2)" }).to(
        {},
        { duration: 0.35 },
      );
    }, section);

    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <div className="wrap hero__stage">
        <div className="hero__copy">
          <p className="mono hero__eyebrow">Halo, selamat datang di call.lab</p>
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
          <div className="hero__service">
            <h2 className="display hero__service-title">Jasa Bikin Website + Iklan</h2>
            <ul className="mono hero__facts">
              {FACTS.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rig" aria-hidden="true">
          <div className="hand">
            <div className="hand__body">
              <img className="hand__palm" src="/img/hand/hand-palm.webp" alt="" width={900} height={952} />
              {FINGERS.map((f, i) => (
                <div
                  className="finger"
                  data-f={f.id}
                  key={f.id}
                  // Each finger sways on its own beat so the resting hand never freezes.
                  style={{
                    transformOrigin: `${f.pivot[0]}% ${f.pivot[1]}%`,
                    animationDuration: `${2.6 + i * 0.55}s`,
                    animationDelay: `${i * -0.8}s`,
                  }}
                >
                  <img src={`/img/hand/hand-${f.id}.webp`} alt="" width={900} height={952} />
                  <div
                    className="finger__seg"
                    style={{
                      transformOrigin: `${f.joint[0]}% ${f.joint[1]}%`,
                      animationDuration: `${2.1 + i * 0.4}s`,
                      animationDelay: `${i * -0.6}s`,
                    }}
                  >
                    <img src={`/img/hand/hand-${f.id}-tip.webp`} alt="" width={900} height={952} />
                    <span className="finger__tip" style={{ left: `${f.tip[0]}%`, top: `${f.tip[1]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <svg className="strings">
            {/* Spider silk: a faint shade so it reads on the light page, a silver core and a glint that runs along it. */}
            {STRUNG.map((f, i) => (
              <g className="silk" key={f.id} style={{ animationDelay: `${i * -0.9}s` }}>
                <path className="silk__shade" />
                <path className="silk__core" />
                <path className="silk__glint" pathLength={100} />
              </g>
            ))}
          </svg>
          <div className="vessel">
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
      </div>
    </section>
  );
}
