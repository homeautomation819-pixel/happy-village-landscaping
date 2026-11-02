import Image from "next/image";
import Link from "next/link";
import { getSite, getServices, getLocations, getPages, getBlog } from "../lib/content";
import ServiceCard from "../components/ServiceCard";
import FAQ from "../components/FAQ";
import CTABand from "../components/CTABand";
import JsonLd, { faqSchema } from "../components/JsonLd";
import BookingForm from "../components/BookingForm";

import { ogFor } from "../lib/site";

export async function generateMetadata() {
  const pages = getPages();
  const site = getSite();
  return {
    title: pages.home.title,
    description: pages.home.metaDescription,
    alternates: { canonical: "/" },
    openGraph: ogFor(site, { title: pages.home.title, description: pages.home.metaDescription, image: site.heroImage, path: "/" }),
  };
}

const CATEGORY_ORDER = [
  "Landscaping Services",
  "Home Renovation Services",
  "Commercial Services",
  "Seasonal Services",
];

export default function HomePage() {
  const site = getSite();
  const pages = getPages();
  const services = getServices();
  const locations = getLocations();
  const blog = getBlog();
  const h = pages.home;

  return (
    <>
      <JsonLd data={[faqSchema(h.faqs)]} />

      {/* Hero with embedded scheduling form */}
      <section className="hero">
        <Image
          src={site.heroImage}
          alt="Landscaped North York property with lawn and gardens designed by Happy Village Landscaping"
          fill
          priority
          fetchPriority="high"
          className="hero-img"
          sizes="100vw"
        />
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="kicker">{h.heroKicker}</span>
              <h1>{h.heroTitle}</h1>
              <p className="hero-sub">{h.heroSubtitle}</p>
              <div className="btn-row">
                <a href="#book" className="btn btn-light">Schedule an Appointment</a>
                <a href={`tel:${site.phone}`} className="btn btn-outline">Call {site.phoneDisplay}</a>
              </div>
              <div className="trust-badges">
                {h.trustBadges.map((b) => <span key={b}>{b}</span>)}
              </div>
            </div>
            <div className="book-card" id="book">
              <span className="book-card-kicker">Free On-Site Quote</span>
              <span className="book-card-badge">No Obligation</span>
              <h2>Schedule an Appointment</h2>
              <p className="book-card-sub">We typically call back quickly to confirm your time.</p>
              <BookingForm services={services} locations={locations} compact />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="container split">
          <div>
            <span className="kicker">{h.aboutTitle}</span>
            <h2>One Local Crew for Your Whole Property</h2>
            {h.aboutBody.map((p, i) => <p key={i}>{p}</p>)}
            <div className="btn-row">
              <Link href="/about" className="btn btn-primary">More About Us</Link>
            </div>
          </div>
          <div className="split-img">
            <Image
              src="/images/about-happy-village-landscaping.jpg"
              alt="Happy Village Landscaping crew member shaking hands with a North York homeowner"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Answer-first keyword intro */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <h2>{h.introSection.h2}</h2>
          {h.introSection.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>

      {/* Services — all 16, grouped by category */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">What We Do</span>
            <h2>{h.servicesTitle}</h2>
            <p>{h.servicesSubtitle}</p>
          </div>
          {CATEGORY_ORDER.map((cat) => {
            const list = services.filter((s) => s.category === cat);
            if (!list.length) return null;
            return (
              <div key={cat} style={{ marginBottom: 40 }}>
                <h3 style={{ borderBottom: "3px solid var(--mint)", paddingBottom: 8, marginBottom: 20 }}>{cat}</h3>
                <div className="grid grid-4">
                  {list.map((s) => <ServiceCard key={s.slug} service={s} />)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="section section-green">
        <div className="container">
          <div className="stats">
            {h.stats.map((s) => (
              <div key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Why Happy Village</span>
            <h2>{h.whyTitle}</h2>
            <p>{h.whySubtitle}</p>
          </div>
          <div className="checklist grid-2">
            {h.whyItems.map((w, i) => (
              <div className="check-item good" key={i}>
                <span className="icon">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">How It Works</span>
            <h2>{h.processTitle}</h2>
          </div>
          <div className="steps">
            {h.processSteps.map((s, i) => (
              <div className="step" key={i}>
                <span className="step-num">{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Local &amp; Accountable</span>
            <h2>{h.locationsTitle}</h2>
            <p>{h.locationsBody}</p>
          </div>
          <div className="grid grid-4">
            {locations.map((l) => (
              <Link href={`/locations/${l.slug}`} className="card" key={l.slug}>
                <div className="card-img">
                  <Image src={l.image} alt={l.imageAlt} fill sizes="(max-width: 620px) 100vw, 25vw" loading="lazy" />
                </div>
                <div className="card-body">
                  <h3>Landscaping {l.name}</h3>
                  <p>{l.isHomeBase ? "Our home base — fastest response in our service area." : `Full service across ${l.name}, minutes from our North York base.`}</p>
                  <span className="card-link">View services in {l.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Google Reviews</span>
            <h2>{h.reviewsTitle}</h2>
            <p>{h.reviewsSubtitle}</p>
          </div>
          <div style={{ display: "grid", gap: 24, gridTemplateColumns: "minmax(260px, 340px) 1fr", alignItems: "start" }} className="reviews-grid">
            <div className="card" style={{ padding: "30px 28px", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--forest-deep)", lineHeight: 1 }}>{site.googleRating}</div>
              <div style={{ color: "#f5a524", fontSize: "1.4rem", letterSpacing: 2, margin: "8px 0" }} aria-label={`${site.googleRating} out of 5 stars`}>★★★★★</div>
              {site.schema?.reviewCount ? <p style={{ color: "var(--muted)" }}>Based on {site.schema.reviewCount} Google reviews</p> : <p style={{ color: "var(--muted)" }}>Rated on our Google Business Profile</p>}
              <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
                {site.googleReviewLink ? (
                  <a className="btn btn-primary" href={site.googleReviewLink} target="_blank" rel="noopener noreferrer">Read Our Google Reviews</a>
                ) : null}
                {site.gbpLink ? (
                  <a className="btn btn-outline" style={{ borderColor: "var(--forest)", color: "var(--forest)" }} href={site.gbpLink} target="_blank" rel="noopener noreferrer">Visit Our Google Profile</a>
                ) : null}
                {!site.googleReviewLink && !site.gbpLink ? (
                  <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Ask us for our Google review link when we visit for your free quote.</p>
                ) : null}
              </div>
            </div>
            <div className="grid grid-2" style={{ gap: 18 }}>
              {(h.reviews || []).length === 0 ? (
                <div className="check-item good" style={{ gridColumn: "1 / -1" }}>
                  <span className="icon">★</span>
                  <div>
                    <h3>A perfect 5.0 — and we intend to keep it that way</h3>
                    <p>Every customer review on our Google Business Profile is five stars. We protect that rating the only honest way: itemized written quotes, clean job sites, and a final walkthrough on every project before we call it done.</p>
                  </div>
                </div>
              ) : (
                h.reviews.map((r, i) => (
                  <div className="card" style={{ padding: "22px 24px" }} key={i}>
                    <div style={{ color: "#f5a524", letterSpacing: 2, marginBottom: 8 }} aria-label={`${r.rating || 5} out of 5 stars`}>{"★".repeat(r.rating || 5)}</div>
                    <p style={{ color: "var(--ink)", fontSize: "0.97rem" }}>“{r.text}”</p>
                    <p style={{ marginTop: 10, fontWeight: 700, color: "var(--forest-deep)", fontSize: "0.9rem" }}>{r.name}{r.area ? ` · ${r.area}` : ""}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">FAQ</span>
            <h2>{h.faqsTitle}</h2>
          </div>
          <FAQ faqs={h.faqs} />
        </div>
      </section>

      {/* Blog teaser */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">From the Blog</span>
            <h2>Local Guides Written by the Crew That Does the Work</h2>
          </div>
          <div className="grid grid-4">
            {blog.map((p) => (
              <Link href={`/blog/${p.slug}`} className="card" key={p.slug}>
                <div className="card-img">
                  <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 620px) 100vw, 25vw" loading="lazy" />
                </div>
                <div className="card-body">
                  <span className="card-cat">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="card-link">Read the guide</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <CTABand site={site} />
        </div>
      </section>
    </>
  );
}
