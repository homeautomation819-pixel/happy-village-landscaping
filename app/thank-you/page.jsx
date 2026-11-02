import Link from "next/link";
import { getSite } from "../../lib/content";

export async function generateMetadata() {
  return { title: "Thank You | Happy Village Landscaping", robots: { index: false } };
}

export default function ThankYouPage() {
  const site = getSite();
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 680, textAlign: "center", paddingTop: 60, paddingBottom: 60 }}>
        <div style={{ fontSize: "3.4rem", marginBottom: 10 }}>🌿</div>
        <h1>Thank You — Your Quote Request Is In</h1>
        <p style={{ color: "var(--muted)", marginTop: 16 }}>
          We've received your message and will be in touch shortly to book your free on-site quote.
          Need us sooner? Our phone line is open 24 hours.
        </p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <a href={`tel:${site.phone}`} className="btn btn-primary">Call {site.phoneDisplay}</a>
          <Link href="/" className="btn btn-outline" style={{ borderColor: "var(--forest)", color: "var(--forest)" }}>Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
