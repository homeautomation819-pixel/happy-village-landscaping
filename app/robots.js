import { getSite } from "../lib/content";

export const dynamic = "force-dynamic";

export default async function robots() {
  const site = await getSite();
  const base = site.domain.replace(/\/$/, "");
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
