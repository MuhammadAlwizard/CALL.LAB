"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

// On a subpage the links point back into the home page.
export function Nav({ home = true }: { home?: boolean }) {
  const to = (id: string) => (home ? `#${id}` : `/#${id}`);
  const [scrolled, setScrolled] = useState(false);

  // An observer on a sentinel at the top of the page, not a scroll listener.
  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap nav__inner">
        <a href={home ? "#top" : "/"} aria-label={home ? "call.lab, kembali ke atas" : "call.lab, ke halaman utama"}>
          <Logo className="nav__logo" />
        </a>
        <nav className="nav__links" aria-label="Navigasi utama">
          <a className="textlink" href={to("layanan")}>Layanan</a>
          <a className="textlink" href={to("karya")}>Karya</a>
          <a className="textlink" href={to("proses")}>Proses</a>
          <a className="textlink" href={to("paket")}>Paket</a>
          <a className="btn btn--ink" href={to("kontak")}>Kontak</a>
        </nav>
      </div>
    </header>
  );
}
