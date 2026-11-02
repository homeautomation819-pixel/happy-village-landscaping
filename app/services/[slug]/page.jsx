import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, getServices, getSite, getLocations } from "../../../lib/content";
import Breadcrumbs from "../../../components/Breadcrumbs";
import FAQ from "../../../components/FAQ";
import CTABand from "../../../components/CTABand";
import JsonLd, { serviceSchema, faqSchema, breadcrumbSchema, imageSchema } from "../../../components/JsonLd";
import BookingForm from "../../../components/BookingForm";
import { ogFor } from "../../../lib/site";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const site = getSite();
  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: ogFor(site, { title: service.title, description: service.metaDescription, image: service.image, path: `/services/${service.slug}` }),
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const site = getSite();
  const services = getServices();
  const locations = getLocations();
  const related = (service.relatedServices || [])
    .map((s) => services.find((x) => x.slug === s))
    .filter(Boolean);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.name },
  ];

  return (
    <>
      <JsonLd data={[
        serviceSchema(site, service),
        faqSchema(service.faqs),
        breadcrumbSchema(site, crumbs),
        imageSchema(site, service.image, service.imageAlt),
      ]} />
      <Breadcrumbs items={crumbs} />

      <section className="page-hero" style={{ marginTop: 16 }}>
        <div className="container">
          <div className="hero-grid" style={{ padding: 0 }}>
            <div>
              <span className="kicker">{service.category} · North York &amp; Toronto</span>
              <h1>{service.h1}</h1>
              <p>{service.shortDescription}</p>
              <div className="btn-row">
                <a href="#book" className="btn btn-light">Schedule an Appointment</a>
                <a href={`tel:${site.phone}`} className="btn btn-outline">Call {site.phoneDisplay}</a>
              </div>
            </div>
            <div className="book-card" id="book">
              <span className="book-card-kicker">Free On-Site Quote</span>
              <span className="book-card-badge">No Obligation</span>
              <h2>Schedule {service.name}</h2>
              <p className="book-card-sub">Preselected for {service.name.toLowerCase()} — we call back to confirm your time.</p>
              <BookingForm services={services} locations={locations} defaultService={service.slug} compact includeQuestions />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="kicker">{service.name} · Overview</span>
            <h2>{service.name} in North York &amp; Toronto</h2>
            <p>{service.intro}</p>
          </div>
          <div className="split-img">
            <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 860px) 100vw, 50vw" priority />
          </div>
        </div>
      </section>

      <section className="section section-alt" style={{ paddingTop: 0 }}>
        <div className="container">
          {service.sections.map((sec, i) => (
            <article key={i} style={{ maxWidth: 820, margin: "0 auto", paddingTop: 56 }}>
              <span className="kicker">{service.name} · {String(i + 1).padStart(2, "0")}</span>
              <h2>{sec.h2}</h2>
              <p>{sec.body}</p>
            </article>
          ))}
        </div>
      </section>

      {service.founderNote ? (
        <section className="section" style={{ paddingTop: 8 }}>
          <div className="container" style={{ maxWidth: 820 }}>
            <div className="check-item good" style={{ padding: "26px 28px" }}>
              <span className="icon" style={{ width: 44, height: 44, fontSize: "1.1rem" }}>AA</span>
              <div>
                <span className="kicker" style={{ marginBottom: 4 }}>A Note From Our Founder</span>
                <p style={{ color: "var(--ink)", fontSize: "1.02rem", fontStyle: "italic" }}>“{service.founderNote}”</p>
                <p style={{ marginTop: 10, fontWeight: 700, color: "var(--forest-deep)", fontSize: "0.95rem" }}>
                  {site.founder} · Founder, {site.businessName}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {service.pricingRows?.length ? (
        <section className="section" style={{ paddingTop: 8 }}>
          <div className="container" style={{ maxWidth: 860 }}>
            <span className="kicker">Transparent Pricing</span>
            <h2>What {service.name.toLowerCase().replace(/^./, (c) => c.toUpperCase())} Costs in Toronto</h2>
            <table className="price-table">
              <thead>
                <tr><th>Item</th><th>Typical Range</th></tr>
              </thead>
              <tbody>
                {service.pricingRows.map((r, i) => (
                  <tr key={i}><td>{r.item}</td><td><strong>{r.range}</strong></td></tr>
                ))}
              </tbody>
            </table>
            {service.pricingNote ? <p className="price-note">{service.pricingNote}</p> : null}
          </div>
        </section>
      ) : null}

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Benefits</span>
            <h2>What You Get With Professional {service.name}</h2>
          </div>
          <div className="checklist grid-2">
            {service.benefits.map((b, i) => (
              <div className="check-item good" key={i}>
                <span className="icon">✓</span>
                <div><h3>{b.title}</h3><p>{b.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Common Problems</span>
            <h2>Common Problems We Fix</h2>
          </div>
          <div className="checklist grid-2">
            {service.problems.map((p, i) => (
              <div className="check-item bad" key={i}>
                <span className="icon">✗</span>
                <div><h3>{p.title}</h3><p>{p.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Our Process</span>
            <h2>How Your {service.name} Project Runs</h2>
            <p>One crew, one schedule, one point of contact. Here's exactly what happens after you book your free on-site appointment.</p>
          </div>
          <div className="steps">
            {service.process.map((s, i) => (
              <div className="step" key={i}>
                <span className="step-num">{i + 1}</span>
                <div><h3>{s.step}</h3><p>{s.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-green">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Why Choose Us</span>
            <h2>Why the GTA Calls Happy Village Landscaping</h2>
          </div>
          <ul style={{ listStyle: "none", display: "grid", gap: 14, maxWidth: 780 }}>
            {service.whyChoose.map((w, i) => (
              <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: "var(--sage)", fontWeight: 800 }}>✓</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="section-head">
            <span className="kicker">FAQ</span>
            <h2>{service.name} Questions, Answered</h2>
          </div>
          <FAQ faqs={service.faqs} />
        </div>
      </section>

      {related.length ? (
        <section className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="kicker">Related Services</span>
              <h2>Related Services</h2>
            </div>
            <div className="grid grid-4">
              {related.map((r) => (
                <Link href={`/services/${r.slug}`} className="card" key={r.slug}>
                  <div className="card-img">
                    <Image src={r.image} alt={r.imageAlt} fill sizes="(max-width: 620px) 100vw, 25vw" loading="lazy" />
                  </div>
                  <div className="card-body">
                    <h3>{r.name}</h3>
                    <p>{r.shortDescription}</p>
                    <span className="card-link">Learn more</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section" style={{ paddingTop: 8 }}>
        <div className="container">
          <CTABand
            site={site}
            title={`Ready to Start Your ${service.name} Project?`}
            text={`Book a free on-site appointment — we'll walk your property, take measurements and leave you a clear, itemized quote. Call ${site.phoneDisplay} — open 24 hours.`}
          />
          {site.lastUpdated ? <p className="updated-date">Last updated: {site.lastUpdated}</p> : null}
        </div>
      </section>
    </>
  );
}
