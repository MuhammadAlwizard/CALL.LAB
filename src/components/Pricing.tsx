import { tiers } from "@/content/packages";
import { whatsappLink } from "@/content/site";

export function Pricing() {
  return (
    <section className="pricing wrap" id="paket">
      <div className="pricing__head" data-reveal>
        <p className="mono">Paket</p>
        <h2 className="display">Pilih racikan lo.</h2>
        <p>Satu paket sudah termasuk website dan promosi lewat Meta Ads. Sekali bayar, tanpa langganan bulanan.</p>
      </div>

      <div className="tiers">
        {tiers.map((tier) => (
          <article className={`tier tier--${tier.slug}`} key={tier.slug}>
            <div className="tier__top">
              <div>
                <h3 className="display tier__name">{tier.name}</h3>
                <p className="tier__for">{tier.forWho}</p>
              </div>
              {tier.slug === "gold-plus" && <span className="mono tier__badge">Rekomendasi kita</span>}
            </div>
            <p className="tier__price">{tier.price}</p>
            <ul className="tier__list">
              {tier.items.map((item) => (
                <li key={item}>
                  <span className="plus" aria-hidden="true">+</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              className="btn btn--ink"
              href={whatsappLink(`Halo call.lab, saya tertarik dengan paket ${tier.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pilih {tier.name} <span className="arrow" aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
      <p className="pricing__note">Harga belum termasuk budget iklan Meta Ads, yang dibayar langsung ke Meta sesuai kemampuan lo.</p>
    </section>
  );
}
