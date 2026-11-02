import { getSite, getServices, getLocations, getBlog } from "../lib/content";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const site = await getSite();
  const base = site.domain.replace(/\/$/, "");
  const lastmod = site.lastUpdated || new Date().toISOString().slice(0, 10);
  const urls = [
    { path: "/", priority: 1.0 },
    { path: "/services", priority: 0.9 },
    ...(await getServices()).map((s) => ({ path: `/services/${s.slug}`, priority: 0.85 })),
    { path: "/locations", priority: 0.8 },
    ...(await getLocations()).map((l) => ({ path: `/locations/${l.slug}`, priority: 0.8 })),
    { path: "/about", priority: 0.6 },
    { path: "/gallery", priority: 0.6 },
    { path: "/blog", priority: 0.6 },
    ...(await getBlog()).map((p) => ({ path: `/blog/${p.slug}`, priority: 0.6 })),
    { path: "/contact", priority: 0.7 },
  ];
  return urls.map((u) => ({
    url: `${base}${u.path}`,
    lastModified: lastmod,
    changeFrequency: "monthly",
    priority: u.priority,
  }));
}
