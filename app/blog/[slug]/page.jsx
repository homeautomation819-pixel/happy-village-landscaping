import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getBlog, getSite, getService } from "../../../lib/content";
import Breadcrumbs from "../../../components/Breadcrumbs";
import FAQ from "../../../components/FAQ";
import CTABand from "../../../components/CTABand";
import JsonLd, { articleSchema, faqSchema, breadcrumbSchema } from "../../../components/JsonLd";
import { ogFor } from "../../../lib/site";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const site = getSite();
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { ...ogFor(site, { title: post.title, description: post.metaDescription, image: post.image, path: `/blog/${post.slug}` }), type: "article" },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const site = getSite();
  const blog = getBlog();
  const relatedService = post.relatedService ? getService(post.relatedService) : null;
  const more = blog.filter((p) => p.slug !== post.slug).slice(0, 2);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  return (
    <>
      <JsonLd data={[articleSchema(site, post), faqSchema(post.faqs), breadcrumbSchema(site, crumbs)]} />
      <Breadcrumbs items={crumbs} />

      <article className="section" style={{ paddingTop: 34 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="kicker">{post.category} · {post.date}{site.founder ? ` · By ${site.founder}, Founder` : ""}</span>
          <h1>{post.h1}</h1>
          <p style={{ fontSize: "1.12rem", marginTop: 16 }}>{post.intro}</p>
          <div className="split-img" style={{ marginTop: 30, aspectRatio: "16/9" }}>
            <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 860px) 100vw, 820px" priority />
          </div>
          {post.sections.map((sec, i) => (
            <section key={i} style={{ marginTop: 40 }}>
              <h2>{sec.h2}</h2>
              <p>{sec.body}</p>
            </section>
          ))}
          <section style={{ marginTop: 44 }}>
            <h2>Frequently Asked Questions</h2>
            <div style={{ marginTop: 16 }}><FAQ faqs={post.faqs} /></div>
          </section>
          {relatedService ? (
            <p style={{ marginTop: 30 }}>
              Related service:{" "}
              <Link href={`/services/${relatedService.slug}`} style={{ fontWeight: 700 }}>
                {relatedService.name} in North York &amp; Toronto
              </Link>
            </p>
          ) : null}
          {site.lastUpdated ? <p className="updated-date">Last updated: {site.lastUpdated}</p> : null}
        </div>
      </article>

      {more.length ? (
        <section className="section section-alt">
          <div className="container">
            <div className="section-head"><h2>More Local Guides</h2></div>
            <div className="grid grid-2">
              {more.map((p) => (
                <Link href={`/blog/${p.slug}`} className="card" key={p.slug}>
                  <div className="card-img">
                    <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 620px) 100vw, 50vw" loading="lazy" />
                  </div>
                  <div className="card-body">
                    <span className="card-cat">{p.category}</span>
                    <h3>{p.title}</h3>
                    <span className="card-link">Read the guide</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <CTABand site={site} title="Questions About Your Project?" text={`${post.cta} Call ${site.phoneDisplay} — open 24 hours.`} />
        </div>
      </section>
    </>
  );
}
