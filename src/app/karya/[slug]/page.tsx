import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { caseStudies } from "@/content/caseStudies";
import { site, whatsappLink } from "@/content/site";
import { works } from "@/content/works";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

function find(slug: string) {
  const index = works.findIndex((work) => work.slug === slug);
  if (index < 0 || !caseStudies[slug]) return null;
  return { work: works[index], study: caseStudies[slug], index };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = find((await params).slug);
  if (!found) return {};
  const { work, study } = found;
  const title = `${work.name}: ${work.kind} | Karya call.lab`;
  const description = study.intro;
  const url = `/karya/${work.slug}/`;
  const images = [{ url: work.image, width: work.width, height: work.height, alt: work.alt }];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", locale: "id_ID", url, siteName: site.name, title, description, images },
    twitter: { card: "summary_large_image", title, description, images: [work.image] },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const found = find((await params).slug);
  if (!found) notFound();
  const { work, study, index } = found;
  const next = works[(index + 1) % works.length];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: work.name,
      description: study.intro,
      genre: work.kind,
      image: `${site.url}${work.image}`,
      url: `${site.url}/karya/${work.slug}/`,
      creator: { "@type": "Organization", name: site.name, url: site.url },
      keywords: study.stack.map((s) => s.name).join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "call.lab", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Karya", item: `${site.url}/#karya` },
        { "@type": "ListItem", position: 3, name: work.name, item: `${site.url}/karya/${work.slug}/` },
      ],
    },
  ];

  return (
    <>
      <div id="top-sentinel" style={{ position: "absolute", top: 0, height: 40, width: 1 }} aria-hidden="true" />
      <Nav home={false} />
      <main className="case wrap" id="top">
        <nav className="case__crumbs mono" aria-label="Lokasi halaman">
          <a href="/">call.lab</a>
          <span aria-hidden="true">/</span>
          <a href="/#karya">Karya</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{work.name}</span>
        </nav>

        <header className="case__head">
          <p className="mono case__kind">{work.kind}</p>
          <h1 className="display">{work.name}</h1>
          <p className="case__intro">{study.intro}</p>
        </header>

        <figure className="case__shot">
          <img src={work.image} alt={work.alt} width={work.width} height={work.height} />
        </figure>

        <div className="case__body">
          <section className="case__built">
            <h2 className="display">Yang kita bikin</h2>
            <ul>
              {study.built.map((item) => (
                <li key={item}>
                  <span className="plus" aria-hidden="true">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <aside className="case__side">
            <h2 className="mono">Dibikin pakai</h2>
            <dl className="case__stack">
              {study.stack.map((tool) => (
                <div key={tool.name}>
                  <dt>{tool.name}</dt>
                  <dd>{tool.why}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <section className="case__cta">
          <div>
            <h2 className="display">Mau dibikinin yang kayak gini?</h2>
            <p>
              {study.pkg
                ? `Proyek kayak gini paling mirip sama paket ${study.pkg}. Detailnya bisa disesuaiin sama bisnis lo.`
                : "Proyek kayak gini di luar paket standar, jadi kita ngobrol dulu soal kebutuhan lo baru ngitung biayanya."}
            </p>
          </div>
          <div className="case__actions">
            <a
              className="btn btn--accent"
              href={whatsappLink(`Halo call.lab, saya lihat studi kasus ${work.name} dan mau bikin yang mirip.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat WhatsApp <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a className="textlink" href="/#paket">
              Lihat paket
            </a>
          </div>
        </section>

        <a className="case__next" href={`/karya/${next.slug}/`}>
          <span className="mono">Karya berikutnya</span>
          <span className="display">
            {next.name} <span className="arrow" aria-hidden="true">→</span>
          </span>
        </a>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
