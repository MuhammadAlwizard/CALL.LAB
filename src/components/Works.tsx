"use client";

import { useEffect, useRef, useState } from "react";
import { works } from "@/content/works";
import { prefersReducedMotion } from "./motion";

const AUTOPLAY_MS = 3500;
const SLIDE_MS = 600;

// The track holds a copy of the last slide before the first and a copy of the first after the last,
// so it can keep sliding the same way and then jump silently back onto the real slide.
const SLIDES = [works[works.length - 1], ...works, works[0]];

export function Works() {
  const count = works.length;
  const [pos, setPos] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const settle = useRef<number | undefined>(undefined);
  const index = (pos - 1 + count) % count;

  // A timer rather than transitionend, so a slide that never finishes animating (hidden tab) cannot lock the slider.
  const moveTo = (next: number) => {
    if (settle.current !== undefined) return;
    const real = ((next - 1 + count) % count) + 1;
    if (prefersReducedMotion()) {
      setPos(real);
      return;
    }
    setAnimate(true);
    setPos(next);
    settle.current = window.setTimeout(() => {
      settle.current = undefined;
      if (real !== next) {
        setAnimate(false);
        setPos(real);
      }
    }, SLIDE_MS);
  };
  const go = (i: number) => moveTo(i + 1);

  useEffect(() => () => window.clearTimeout(settle.current), []);

  // Turn the transition back on one frame after the silent jump has been painted.
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  // Only auto-advance while the slider is on screen and nobody is interacting with it.
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible || prefersReducedMotion()) return;
    const id = window.setTimeout(() => moveTo(pos + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [pos, paused, visible]);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) moveTo(pos + (dx < 0 ? 1 : -1));
  };

  return (
    <section className="works wrap" id="karya">
      <div className="works__head">
        <h2 className="display" data-reveal>
          Karya yang
          <br />
          sudah jalan.
        </h2>
        <p data-reveal>Website dan sistem yang kita bangun untuk bisnis nyata, dari toko online sampai dashboard.</p>
      </div>

      <div
        className="slider"
        role="region"
        aria-roledescription="carousel"
        aria-label="Karya call.lab"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="slider__viewport" ref={viewport} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
          <div
            className="slider__track"
            style={{ transform: `translateX(-${pos * 100}%)`, transition: animate ? undefined : "none" }}
          >
            {SLIDES.map((work, i) => (
              <div
                className={`slide${visible && (i - 1 + count) % count === index ? " is-active" : ""}`}
                key={`${work.slug}-${i}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${((i - 1 + count) % count) + 1} dari ${count}: ${work.name}`}
                aria-hidden={i !== pos}
                inert={i !== pos}
              >
                <div className="slide__frame">
                  <img src={work.image} alt={work.alt} width={work.width} height={work.height} loading="lazy" draggable={false} />
                  <img className="slide__gray" src={work.image} alt="" width={work.width} height={work.height} loading="lazy" draggable={false} />
                </div>
                <div className="slide__text">
                  <p className="mono">{work.kind}</p>
                  <h3 className="display">{work.name}</h3>
                  <p>{work.summary}</p>
                  <ul className="slide__tags">
                    {work.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="slider__controls">
          <div className="slider__dots">
            {works.map((work, i) => (
              <button
                key={work.slug}
                type="button"
                className={`slider__dot${i === index ? " is-active" : ""}`}
                aria-label={`Lihat ${work.name}`}
                aria-current={i === index}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <div className="slider__arrows">
            <button type="button" className="slider__arrow" aria-label="Karya sebelumnya" onClick={() => moveTo(pos - 1)}>
              ←
            </button>
            <button type="button" className="slider__arrow" aria-label="Karya berikutnya" onClick={() => moveTo(pos + 1)}>
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
