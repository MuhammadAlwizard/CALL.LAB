"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Nav() {
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
        <a href="#top" aria-label="call.lab, kembali ke atas">
          <Logo className="nav__logo" />
        </a>
        <nav className="nav__links" aria-label="Navigasi utama">
          <a className="textlink" href="#layanan">Layanan</a>
          <a className="textlink" href="#karya">Karya</a>
          <a className="textlink" href="#proses">Proses</a>
          <a className="textlink" href="#paket">Paket</a>
          <a className="btn btn--ink" href="#kontak">Kontak</a>
        </nav>
      </div>
    </header>
  );
}
