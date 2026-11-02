import Link from "next/link";
import { fullAddress } from "../lib/site";

export default function Footer({ site, services, locations }) {
  const year = new Date().getFullYear();
  const landscaping = services.filter((s) => s.category === "Landscaping Services");
  const reno = services.filter((s) => s.category !== "Landscaping Services");
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>{site.businessName}</h4>
            <address>
              {fullAddress(site)}
              <br />
              Phone: <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
              {site.email ? (<><br />Email: <a href={`mailto:${site.email}`}>{site.email}</a></>) : null}
              <br />
              Hours: {site.hours?.label || "Open 24 hours"}
            </address>
            <p style={{ marginTop: 14, fontSize: "0.93rem" }}>
              Landscaping, renovations, commercial grounds care and snow removal across
              North York, Toronto and the GTA. Rated {site.googleRating} on Google.
              {site.founder ? ` Founder-led by ${site.founder}.` : ""}
            </p>
            {(Object.values(site.social || {}).some(Boolean) || site.gbpLink || site.googleReviewLink) && (
              <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap", alignItems: "center" }}>
                {site.social?.facebook && (
                  <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ display: "inline-flex", padding: 8 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>
                  </a>
                )}
                {site.social?.instagram && (
                  <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ display: "inline-flex", padding: 8 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.5a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z"/></svg>
                  </a>
                )}
                {site.social?.linkedin && (
                  <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ display: "inline-flex", padding: 8 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5z"/></svg>
                  </a>
                )}
                {site.social?.youtube && (
                  <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ display: "inline-flex", padding: 8 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z"/></svg>
                  </a>
                )}
                {site.social?.x && (
                  <a href={site.social.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" style={{ display: "inline-flex", padding: 8 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.5l4.4 5.9L18.9 2zm-1.1 18h1.7L7.6 3.9H5.8L17.8 20z"/></svg>
                  </a>
                )}
                {site.gbpLink && (
                  <a href={site.gbpLink} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Google Business Profile</a>
                )}
                {site.googleReviewLink && (
                  <a href={site.googleReviewLink} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, fontSize: "0.9rem" }}>★ {site.googleRating} Google Reviews</a>
                )}
              </div>
            )}
          </div>
          <div>
            <h4>Landscaping</h4>
            <ul>
              {landscaping.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>More Services</h4>
            <ul>
              {reno.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Areas We Serve</h4>
            <ul>
              {locations.map((l) => (
                <li key={l.slug}><Link href={`/locations/${l.slug}`}>Landscaping {l.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} {site.businessName}. All rights reserved.</span>
          <span>
            <Link href="/llm.txt">llm.txt</Link> · <Link href="/sitemap.xml">Sitemap</Link> · <Link href="/contact">Contact</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
