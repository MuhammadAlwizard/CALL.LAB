"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./motion";

// Lenis drives the scroll, GSAP's ticker drives Lenis, so ScrollTrigger and the smooth scroll stay in sync.
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    document.documentElement.classList.add("motion");

    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -20 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]").map((el) =>
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }),
    );

    return () => {
      reveals.forEach((t) => t.kill());
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.documentElement.classList.remove("motion");
    };
  }, []);

  return null;
}
