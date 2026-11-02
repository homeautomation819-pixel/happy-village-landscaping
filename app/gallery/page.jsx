import Image from "next/image";
import { getPages, getSite } from "../../lib/content";
import Breadcrumbs from "../../components/Breadcrumbs";
import CTABand from "../../components/CTABand";
import JsonLd, { breadcrumbSchema, imageSchema } from "../../components/JsonLd";
import { ogFor } from "../../lib/site";

export async function generateMetadata() {
  const pages = await getPages();
  const site = await getSite();
  return {
    title: pages.gallery.title,
    description: pages.gallery.metaDescription,
    alternates: { canonical: "/gallery" },
    openGraph: ogFor(site, { title: pages.gallery.title, description: pages.gallery.metaDescription, image: "/images/hardscaping-interlock-toronto.jpg", path: "/gallery" }),
  };
}

export default async function GalleryPage() {
  const pages = await getPages();
  const site = await getSite();
  const g = pages.gallery;
  const crumbs = [{ label: "Home", href: "/" }, { label: "Gallery" }];
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema(site, crumbs),
        ...g.items.slice(0, 6).map((it) => imageSchema(site, it.src, it.alt)),
      ]} />
      <Breadcrumbs items={crumbs} />
      <section className="page-hero" style={{ marginTop: 16 }}>
        <div className="container">
          <span className="kicker">Project Gallery</span>
          <h1>{g.h1}</h1>
          <p>{g.subtitle}</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {g.items.map((item, i) => (
              <figure className="gallery-item" key={i}>
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw" loading="lazy" />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <CTABand
            site={site}
            title="Want Results Like These?"
            text={`Your property could be next. Book a free on-site quote anywhere in North York, Toronto or the GTA — call ${site.phoneDisplay}, open 24 hours.`}
          />
        </div>
      </section>
    </>
  );
}
