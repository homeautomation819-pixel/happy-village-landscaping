import Link from "next/link";
import { waLink } from "../lib/site";

export default function CTABand({ site, title, text }) {
  return (
    <div className="cta-band">
      <h2>{title || "Ready to Start Your Project?"}</h2>
      <p>
        {text ||
          `One call covers your whole property — landscaping outdoors, renovations indoors, and snow removal when winter hits. Call ${site.phoneDisplay} or send us a message for your free on-site quote.`}
      </p>
      <div className="btn-row">
        <a className="btn btn-light" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
        <a className="btn btn-outline" href={waLink(site.whatsappNumber || site.phone, site.whatsappGreeting)} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
        <Link className="btn btn-outline" href="/contact">Request a Quote</Link>
      </div>
    </div>
  );
}
