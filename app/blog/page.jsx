import Image from "next/image";
import Link from "next/link";
import { getBlog, getSite } from "../../lib/content";
import Breadcrumbs from "../../components/Breadcrumbs";
import CTABand from "../../components/CTABand";
import JsonLd, { breadcrumbSchema } from "../../components/JsonLd";
import { ogFor } from "../../lib/site";

export async function generateMetadata() {
  const site = await getSite();
  const title = "Landscaping & Renovation Guides | Happy Village Landscaping Blog";
  const description = "Toronto landscaping and renovation cost guides, seasonal tips and local advice from the Happy Village Landscaping crew. Call +1 (438) 835-4350.";
  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    openGraph: ogFor(site, { title, description, image: "/images/blog-sod-cost-toronto.jpg", path: "/blog" }),
  };
}

export default async function BlogPage() {
  const blog = await getBlog();
  const site = await getSite();
  const crumbs = [{ label: "Home", href: "/" }, { label: "Blog" }];
  return (
    <>
      <JsonLd data={[breadcrumbSchema(site, crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <section className="page-hero" style={{ marginTop: 16 }}>
        <div className="container">
          <span className="kicker">Blog &amp; Resources</span>
          <h1>Local Guides Written by the Crew That Does the Work</h1>
          <p>Real Toronto pricing, seasonal timing and honest advice — no fluff.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {blog.map((p) => (
              <Link href={`/blog/${p.slug}`} className="card" key={p.slug}>
                <div className="card-img">
                  <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 620px) 100vw, 50vw" loading="lazy" />
                </div>
                <div className="card-body">
                  <span className="card-cat">{p.category} · {p.date}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="card-link">Read the guide</span>
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
