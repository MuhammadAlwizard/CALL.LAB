import { site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer wrap">
      <Logo className="footer__mark" />
      <div className="footer__row">
        <p>© {new Date().getFullYear()} call.lab. Web development dan digital marketing.</p>
        <a className="textlink" href="#top">Kembali ke atas ↑</a>
      </div>
      {site.nib && <p className="footer__note">Usaha terdaftar di OSS, NIB {site.nib}.</p>}
      {site.gaId && (
        <p className="footer__note">
          Situs ini pakai Google Analytics (dengan cookie) buat ngitung kunjungan. Yang kita lihat cuma angka gabungan, bukan
          identitas lo.
        </p>
      )}
    </footer>
  );
}
