import "./globals.css";
import { getSite, getServices, getLocations } from "../lib/content";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import StickyBar from "../components/StickyBar";
import JsonLd, { localBusinessSchema, organizationSchema } from "../components/JsonLd";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const site = getSite();
  const base = site.domain.replace(/\/$/, "");
  return {
    metadataBase: new URL(site.domain),
    title: {
      default: `${site.businessName} | Landscaping & Renovations in North York, Toronto`,
      template: `%s`,
    },
    description: site.tagline,
    icons: { icon: "/images/happy-village-landscaping-logo.svg" },
    openGraph: {
      siteName: site.businessName,
      type: "website",
      locale: "en_CA",
      images: [{ url: `${base}${site.heroImage}`, width: 1600, height: 1000, alt: `${site.businessName} — landscaping and renovations in North York, Toronto` }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function RootLayout({ children }) {
  const site = getSite();
  const services = getServices();
  const locations = getLocations();
  return (
    <html lang="en-CA">
      <head>
        <JsonLd data={[localBusinessSchema(site), organizationSchema(site)]} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header site={site} />
        <main id="main">{children}</main>
        <Footer site={site} services={services} locations={locations} />
        <WhatsAppButton site={site} />
        <StickyBar site={site} />
      </body>
    </html>
  );
}
