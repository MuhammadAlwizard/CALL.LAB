import { siGmail, siInstagram, siThreads, siTiktok, siWhatsapp, siX } from "simple-icons";
import { mailLink, site, whatsappLink } from "@/content/site";

const ICONS = { instagram: siInstagram, threads: siThreads, tiktok: siTiktok, x: siX } as const;

function Icon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d={path} />
    </svg>
  );
}

export function Contact() {
  const socials = site.socials.filter((s) => s.url);

  return (
    <section className="contact wrap" id="kontak">
      <div className="contact__grid">
        <h2 className="display" data-reveal>
          Siap
          <br />
          masuk lab?
        </h2>
        <div className="contact__side" data-reveal>
          <p>Ceritain bisnis lo. Kita balas pakai rencana awal, bukan template penawaran.</p>
          <a
            className="channel channel--wa"
            href={whatsappLink("Halo call.lab, saya mau ngobrol soal bisnis saya.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="channel__label">
              <span className="wa-badge">
                <Icon path={siWhatsapp.path} />
              </span>
              <span>
                <strong>Chat WhatsApp</strong>
                <small>Langsung ngobrol sama tim kita</small>
              </span>
            </span>
            <span className="arrow" aria-hidden="true">↗</span>
          </a>
          <a className="channel" href={mailLink("Ngobrol bareng call.lab")}>
            <span className="channel__label">
              <Icon path={siGmail.path} />
              <span>
                <strong>Kirim email</strong>
                <small>{site.email || "Email menyusul"}</small>
              </span>
            </span>
            <span className="arrow" aria-hidden="true">↗</span>
          </a>
          {socials.length > 0 && (
            <ul className="socials" aria-label="Media sosial call.lab">
              {socials.map((s) => (
                <li key={s.key}>
                  <a className="social" href={s.url} target="_blank" rel="noopener noreferrer">
                    <Icon path={ICONS[s.key].path} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
