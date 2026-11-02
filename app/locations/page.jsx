import Image from "next/image";
import Link from "next/link";
import { getLocations, getSite } from "../../lib/content";
import Breadcrumbs from "../../components/Breadcrumbs";
import CTABand from "../../components/CTABand";
import JsonLd, { breadcrumbSchema } from "../../components/JsonLd";
import { ogFor } from "../../lib/site";

export async function generateMetadata() {
  const site = getSite();
  const title = `Areas We Serve | ${site.businessName} — North York, Toronto & GTA`;
  const description = "Happy Village Landscaping serves North York, Toronto, Scarborough, Etobicoke, York, East York, Vaughan & Markham. Free quotes: +1 (438) 835-4350.";
  return {
    title,
    description,
    alternates: { canonical: "/locations" },
    openGraph: ogFor(site, { title, description, image: "/images/toronto-skyline-service-area.jpg", path: "/locations" }),
  };
}

export default function LocationsPage() {
  const locations = getLocations();
  const site = getSite();
  const crumbs = [{ label: "Home", href: "/" }, { label: "Areas We Serve" }];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(site, crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <section className="page-hero" style={{ marginTop: 16 }}>
        <div className="container">
          <span className="kicker">Service Area</span>
          <h1>Areas We Serve Across the Greater Toronto Area</h1>
          <p>Based at 25 Stubbs Dr in North York, we serve eight GTA communities with free on-site quotes and one accountable local crew.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid grid-4">
            {locations.map((l) => (
              <Link href={`/locations/${l.slug}`} className="card" key={l.slug}>
                <div className="card-img">
                  <Image src={l.image} alt={l.imageAlt} fill sizes="(max-width: 620px) 100vw, 25vw" loading="lazy" />
                </div>
                <div className="card-body">
                  <h3>Landscaping {l.name}</h3>
                  <p>{l.isHomeBase ? "Our home base — fastest response in our service area." : `Landscaping, renovations & snow removal across ${l.name}.`}</p>
                  <span className="card-link">View {l.name} services</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container"><CTABand site={site} /></div>
      </section>
    </>
  );
}
