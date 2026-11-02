import Image from "next/image";
import Link from "next/link";
import { getPages, getSite, getLocations } from "../../lib/content";
import Breadcrumbs from "../../components/Breadcrumbs";
import CTABand from "../../components/CTABand";
import JsonLd, { breadcrumbSchema } from "../../components/JsonLd";
import { ogFor } from "../../lib/site";

export async function generateMetadata() {
  const pages = await getPages();
  const site = await getSite();
  return {
    title: pages.about.title,
    description: pages.about.metaDescription,
    alternates: { canonical: "/about" },
    openGraph: ogFor(site, { title: pages.about.title, description: pages.about.metaDescription, image: "/images/about-happy-village-landscaping.jpg", path: "/about" }),
  };
}

export default async function AboutPage() {
  const pages = await getPages();
  const site = await getSite();
  const locations = await getLocations();
  const a = pages.about;
  const crumbs = [{ label: "Home", href: "/" }, { label: "About" }];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(site, crumbs)]} />
      <Breadcrumbs items={crumbs} />

      <section className="page-hero" style={{ marginTop: 16 }}>
        <div className="container">
          <span className="kicker">About Us</span>
          <h1>{a.h1}</h1>
          <p>{a.subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="kicker">{a.storyTitle}</span>
            <h2>A Working Local Crew With a Standard</h2>
            {a.story.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="split-img">
            <Image src="/images/about-happy-village-landscaping.jpg" alt="Happy Village Landscaping meeting a homeowner for a free on-site quote in North York" fill sizes="(max-width: 860px) 100vw, 50vw" priority />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split">
          <div className="split-img">
            <Image src="/images/about-happy-village-landscaping.jpg" alt={`${a.founder.name}, founder of Happy Village Landscaping, meeting a North York homeowner`} fill sizes="(max-width: 860px) 100vw, 50vw" loading="lazy" />
          </div>
          <div>
            <span className="kicker">Meet the Founder</span>
            <h2>{a.founder.name}</h2>
            <p style={{ fontWeight: 700, color: "var(--leaf)", marginBottom: 12 }}>{a.founder.role}</p>
            <p>{a.founder.bio}</p>
            <p style={{ marginTop: 14, fontStyle: "italic", color: "var(--muted)" }}>“{a.founder.quote}”</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{a.valuesTitle}</span>
            <h2>What We Stand For</h2>
          </div>
          <div className="checklist grid-2">
            {a.values.map((v, i) => (
              <div className="check-item good" key={i}>
                <span className="icon">✓</span>
                <div><h3>{v.title}</h3><p>{v.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="kicker">The Difference</span>
          <h2>{a.differenceTitle}</h2>
          {a.difference.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{a.whereTitle}</span>
            <h2>North York Based, GTA Wide</h2>
            <p>{a.where}</p>
          </div>
          <div className="grid grid-4">
            {locations.map((l) => (
              <Link href={`/locations/${l.slug}`} className="card" key={l.slug}>
                <div className="card-img">
                  <Image src={l.image} alt={l.imageAlt} fill sizes="(max-width: 620px) 100vw, 25vw" loading="lazy" />
                </div>
                <div className="card-body">
                  <h3>{l.name}</h3>
                  <span className="card-link">Services in {l.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <CTABand
            site={site}
            title="Meet Us on Your Property — Not in a Showroom"
            text={`Every quote starts with a free on-site visit. See how we work before you spend a dollar. Call ${site.phoneDisplay} — open 24 hours.`}
          />
        </div>
      </section>
    </>
  );
}
