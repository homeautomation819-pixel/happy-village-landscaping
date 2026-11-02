import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocation, getLocations, getServices, getSite } from "../../../lib/content";
import Breadcrumbs from "../../../components/Breadcrumbs";
import FAQ from "../../../components/FAQ";
import CTABand from "../../../components/CTABand";
import ServiceCard from "../../../components/ServiceCard";
import JsonLd, { faqSchema, breadcrumbSchema, imageSchema } from "../../../components/JsonLd";
import { ogFor } from "../../../lib/site";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};
  const site = getSite();
  return {
    title: loc.title,
    description: loc.metaDescription,
    alternates: { canonical: `/locations/${loc.slug}` },
    openGraph: ogFor(site, { title: loc.title, description: loc.metaDescription, image: loc.image, path: `/locations/${loc.slug}` }),
  };
}

const FEATURED_SLUGS = [
  "landscape-design", "hardscaping", "sod-installation", "lawn-care",
  "irrigation-systems", "basement-finishing", "kitchen-bath-remodeling", "snow-removal",
];

export default async function LocationPage({ params }) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();
  const site = getSite();
  const locations = getLocations();
  const services = getServices();
  const featured = FEATURED_SLUGS.map((s) => services.find((x) => x.slug === s)).filter(Boolean);
  const nearby = locations.filter((l) => l.slug !== loc.slug);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Areas We Serve", href: "/locations" },
    { label: loc.name },
  ];

  return (
    <>
      <JsonLd data={[
        faqSchema(loc.faqs),
        breadcrumbSchema(site, crumbs),
        imageSchema(site, loc.image, loc.imageAlt),
      ]} />
      <Breadcrumbs items={crumbs} />

      <section className="page-hero" style={{ marginTop: 16 }}>
        <div className="container">
          <span className="kicker">Service Area{loc.isHomeBase ? " · Our Home Base" : ""}</span>
          <h1>{loc.h1}</h1>
          <div className="btn-row">
            <a href={`tel:${site.phone}`} className="btn btn-light">Call {site.phoneDisplay}</a>
            <Link href="/contact" className="btn btn-outline">Free Quote in {loc.name}</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <span className="kicker">Landscaping {loc.name}</span>
            <h2>Landscaping &amp; Renovations in {loc.name}</h2>
            <p>{loc.intro}</p>
            <p style={{ marginTop: 14 }}>{loc.localBody}</p>
          </div>
          <div className="split-img">
            <Image src={loc.image} alt={loc.imageAlt} fill sizes="(max-width: 860px) 100vw, 50vw" priority />
          </div>
        </div>
        <div className="container" style={{ marginTop: 26 }}>
          <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
            <strong>Serving neighbourhoods around:</strong> {loc.landmarks}.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Our Services in {loc.name}</span>
            <h2>What We Do in {loc.name}</h2>
            <p>All 16 services are available in {loc.name} — here are the ones {loc.name} properties call for most. Every service page has full details, pricing guidance and FAQs.</p>
          </div>
          <div className="grid grid-4">
            {featured.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Link href="/services" className="btn btn-primary">View All 16 Services</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="section-head">
            <span className="kicker">Local FAQ</span>
            <h2>{loc.name} Questions, Answered</h2>
          </div>
          <FAQ faqs={loc.faqs} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Nearby Areas</span>
            <h2>Nearby Areas We Serve</h2>
          </div>
          <div className="grid grid-4">
            {nearby.map((l) => (
              <Link href={`/locations/${l.slug}`} className="card" key={l.slug}>
                <div className="card-img">
                  <Image src={l.image} alt={l.imageAlt} fill sizes="(max-width: 620px) 100vw, 25vw" loading="lazy" />
                </div>
                <div className="card-body">
                  <h3>Landscaping {l.name}</h3>
                  <span className="card-link">View {l.name} services</span>
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
            title={`Get a Free Quote in ${loc.name}`}
            text={`We visit your ${loc.name} property, measure, discuss options and leave an itemized written price — free, no obligation. Call ${site.phoneDisplay}, open 24 hours.`}
          />
          {site.lastUpdated ? <p className="updated-date">Last updated: {site.lastUpdated}</p> : null}
        </div>
      </section>
    </>
  );
}
