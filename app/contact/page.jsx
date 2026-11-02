import { getPages, getSite, getServices } from "../../lib/content";
import Breadcrumbs from "../../components/Breadcrumbs";
import FAQ from "../../components/FAQ";
import QuoteForm from "../../components/QuoteForm";
import JsonLd, { faqSchema, breadcrumbSchema } from "../../components/JsonLd";
import { fullAddress, waLink, ogFor } from "../../lib/site";

export async function generateMetadata() {
  const pages = await getPages();
  const site = await getSite();
  return {
    title: pages.contact.title,
    description: pages.contact.metaDescription,
    alternates: { canonical: "/contact" },
    openGraph: ogFor(site, { title: pages.contact.title, description: pages.contact.metaDescription, path: "/contact" }),
  };
}

export default async function ContactPage() {
  const pages = await getPages();
  const site = await getSite();
  const services = await getServices();
  const c = pages.contact;
  const crumbs = [{ label: "Home", href: "/" }, { label: "Contact" }];
  return (
    <>
      <JsonLd data={[faqSchema(c.faqs), breadcrumbSchema(site, crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <section className="page-hero" style={{ marginTop: 16 }}>
        <div className="container">
          <span className="kicker">Contact · Free Quotes</span>
          <h1>{c.h1}</h1>
          <p>{c.subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <span className="kicker">Reach Us Directly</span>
            <h2>Call, WhatsApp or Visit</h2>
            <div className="checklist" style={{ marginTop: 18 }}>
              <div className="check-item good">
                <span className="icon">☎</span>
                <div>
                  <h3>Phone — {site.hours?.label}</h3>
                  <p><a href={`tel:${site.phone}`}>{site.phoneDisplay}</a> — answered 24 hours, including weekends and storm nights.</p>
                </div>
              </div>
              <div className="check-item good">
                <span className="icon">✆</span>
                <div>
                  <h3>WhatsApp</h3>
                  <p><a href={waLink(site.whatsappNumber || site.phone, site.whatsappGreeting)} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a> — photos of your property help us quote faster.</p>
                </div>
              </div>
              {site.email ? (
                <div className="check-item good">
                  <span className="icon">✉</span>
                  <div>
                    <h3>Email</h3>
                    <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
                  </div>
                </div>
              ) : null}
              <div className="check-item good">
                <span className="icon">⌂</span>
                <div>
                  <h3>Address</h3>
                  <p><address style={{ fontStyle: "normal" }}>{fullAddress(site)}</address></p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <FAQ faqs={c.faqs} />
            </div>
          </div>
          <div className="admin-panel">
            <h2 style={{ marginBottom: 6 }}>{c.formTitle}</h2>
            <p style={{ color: "var(--muted)", marginBottom: 20, fontSize: "0.95rem" }}>Free, itemized, no obligation. We serve North York, Toronto and the GTA.</p>
            <QuoteForm services={services} />
          </div>
        </div>
      </section>
    </>
  );
}
