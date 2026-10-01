import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer wrap">
      <Logo className="footer__mark" />
      <div className="footer__row">
        <p>© {new Date().getFullYear()} call.lab. Web development dan digital marketing.</p>
        <a className="textlink" href="#top">Kembali ke atas ↑</a>
      </div>
    </footer>
  );
}
