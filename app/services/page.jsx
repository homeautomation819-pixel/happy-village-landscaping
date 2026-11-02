import { getServices, getPages, getSite } from "../../lib/content";
import ServiceCard from "../../components/ServiceCard";
import Breadcrumbs from "../../components/Breadcrumbs";
import CTABand from "../../components/CTABand";
import JsonLd, { breadcrumbSchema } from "../../components/JsonLd";
import { ogFor } from "../../lib/site";

export async function generateMetadata() {
  const pages = getPages();
  const site = getSite();
  return {
    title: pages.servicesIndex.title,
    description: pages.servicesIndex.metaDescription,
    alternates: { canonical: "/services" },
    openGraph: ogFor(site, { title: pages.servicesIndex.title, description: pages.servicesIndex.metaDescription, path: "/services" }),
  };
}

const CATEGORY_ORDER = [
  "Landscaping Services",
  "Home Renovation Services",
  "Commercial Services",
  "Seasonal Services",
];

export default function ServicesPage() {
  const services = getServices();
  const pages = getPages();
  const site = getSite();
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Services" },
  ];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(site, crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <section className="page-hero" style={{ marginTop: 16 }}>
        <div className="container">
          <span className="kicker">{pages.servicesIndex.kicker}</span>
          <h1>{pages.servicesIndex.h1}</h1>
          <p>{pages.servicesIndex.subtitle}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {CATEGORY_ORDER.map((cat) => {
            const list = services.filter((s) => s.category === cat);
            if (!list.length) return null;
            return (
              <div key={cat} style={{ marginBottom: 56 }}>
                <h2 style={{ borderBottom: "3px solid var(--mint)", paddingBottom: 10 }}>{cat}</h2>
                <div className="grid grid-3" style={{ marginTop: 26 }}>
                  {list.map((s) => <ServiceCard key={s.slug} service={s} />)}
                </div>
              </div>
            );
          })}
          <CTABand
            site={site}
            title="Not Sure Which Service You Need?"
            text="Describe the problem — we'll diagnose it on-site and quote the right fix. Free, itemized, no obligation."
          />
        </div>
      </section>
    </>
  );
}
