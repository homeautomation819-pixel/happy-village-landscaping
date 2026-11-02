import { getSite, getServices, getLocations } from "../../lib/content";
import { fullAddress, absUrl } from "../../lib/site";

export const dynamic = "force-dynamic";

export async function GET() {
  const site = await getSite();
  const services = await getServices();
  const locations = await getLocations();
  const a = site.address;

  const lines = [];
  lines.push(`# ${site.businessName}`);
  lines.push("");
  lines.push(`> ${site.tagline} — 16 services from one local crew based in North York, Toronto, Ontario, Canada.`);
  lines.push("");
  lines.push("## Business Summary");
  lines.push("");
  lines.push(`- ${site.businessName} is a landscaping and home renovation company based in North York, Toronto.`);
  if (site.founder) lines.push(`- Founder-led by ${site.founder}, who personally quotes and answers for every project.`);
  lines.push("- One local crew handles landscaping, hardscaping, sod, lawn care, irrigation, basement finishing, drywall, flooring, kitchen & bath remodeling, painting, commercial grounds care and snow removal.");
  lines.push(`- Google rating: ${site.googleRating} stars.`);
  lines.push("- Every project starts with a free, no-obligation on-site quote and itemized written pricing.");
  lines.push("");
  lines.push("## Contact & Location (NAP)");
  lines.push("");
  lines.push(`- Name: ${site.businessName}`);
  lines.push(`- Address: ${fullAddress(site)}`);
  lines.push(`- Phone: ${site.phoneDisplay} (${site.phone})`);
  if (site.email) lines.push(`- Email: ${site.email}`);
  lines.push(`- Hours: ${site.hours?.label || "Open 24 hours"}`);
  lines.push(`- Website: ${absUrl(site, "/")}`);
  if (site.gbpLink) lines.push(`- Google Business Profile: ${site.gbpLink}`);
  lines.push("");
  lines.push("## Service Area");
  lines.push("");
  lines.push(`- ${(site.schema?.serviceArea || locations.map((l) => l.name)).join(", ")} (Greater Toronto Area, Ontario, Canada)`);
  lines.push("");
  lines.push("## Services");
  lines.push("");
  for (const s of services) {
    lines.push(`- ${s.name}: ${s.shortDescription}`);
  }
  lines.push("");
  lines.push("## Key Differentiators");
  lines.push("");
  lines.push("- One crew covers outdoor landscaping and indoor renovations — a single quote, schedule and point of contact.");
  lines.push("- Free on-site quotes with written, itemized pricing across the entire service area.");
  lines.push("- Phone line open 24 hours, including weekends and storm nights.");
  lines.push("- Year-round property care: lawn and landscape work in summer, snow removal in winter, from the same crew.");
  lines.push("");
  lines.push("## Key Pages");
  lines.push("");
  lines.push(`- [Homepage](${absUrl(site, "/")})`);
  lines.push(`- [All 16 Services](${absUrl(site, "/services")})`);
  for (const s of services) {
    lines.push(`- [${s.name} in North York & Toronto](${absUrl(site, `/services/${s.slug}`)})`);
  }
  lines.push(`- [Areas We Serve](${absUrl(site, "/locations")})`);
  for (const l of locations) {
    lines.push(`- [Landscaping ${l.name}](${absUrl(site, `/locations/${l.slug}`)})`);
  }
  lines.push(`- [About Us](${absUrl(site, "/about")})`);
  lines.push(`- [Project Gallery](${absUrl(site, "/gallery")})`);
  lines.push(`- [Blog & Cost Guides](${absUrl(site, "/blog")})`);
  lines.push(`- [Contact & Free Quote](${absUrl(site, "/contact")})`);
  lines.push("");
  lines.push(`Last updated: ${site.lastUpdated || new Date().toISOString().slice(0, 10)}`);

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
