import { faqs } from "@/content/faq";

// FAQPage structured data mirrors the visible questions word for word.
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function Faq() {
  return (
    <section className="faq wrap" id="faq">
      <h2 className="display faq__title" data-reveal>
        Yang sering
        <br />
        ditanya.
      </h2>
      <div className="faq__list" data-reveal>
        {faqs.map((f) => (
          <details className="faq__item" key={f.q}>
            <summary>
              {f.q}
              <span className="faq__icon" aria-hidden="true">
                +
              </span>
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }} />
    </section>
  );
}
