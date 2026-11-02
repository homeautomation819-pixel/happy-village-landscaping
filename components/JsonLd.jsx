import { absUrl, fullAddress } from "../lib/site";

function prune(obj) {
  if (Array.isArray(obj)) {
    const arr = obj.map(prune).filter((v) => v !== undefined && v !== null);
    return arr.length ? arr : undefined;
  }
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      const pv = prune(v);
      if (pv !== undefined && pv !== null && pv !== "") out[k] = pv;
    }
    return Object.keys(out).length ? out : undefined;
  }
  return obj === "" || obj === undefined || obj === null ? undefined : obj;
}

export function localBusinessSchema(site) {
  const s = site.schema || {};
  const sameAs = Object.values(site.social || {}).filter(Boolean);
  return prune({
    "@context": "https://schema.org",
    "@type": s.businessType || "LandscapingBusiness",
    "@id": absUrl(site, "/#business"),
    name: site.businessName,
    founder: site.founder ? { "@type": "Person", name: site.founder, jobTitle: "Founder" } : undefined,
    url: absUrl(site, "/"),
    telephone: site.phone,
    email: site.email || undefined,
    image: absUrl(site, site.heroImage),
    logo: absUrl(site, s.logo),
    priceRange: s.priceRange,
    currenciesAccepted: s.currenciesAccepted,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: s.geoLat && s.geoLng ? { "@type": "GeoCoordinates", latitude: s.geoLat, longitude: s.geoLng } : undefined,
    hasMap: s.googleMapsLink || undefined,
    openingHoursSpecification: (site.hours?.days || []).map((d) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: d.day,
      opens: d.opens,
      closes: d.closes,
    })),
    areaServed: (s.serviceArea || []).map((a) => ({ "@type": "City", name: a })),
    sameAs,
    aggregateRating:
      s.aggregateRatingValue && s.reviewCount
        ? { "@type": "AggregateRating", ratingValue: s.aggregateRatingValue, reviewCount: s.reviewCount }
        : undefined,
  });
}

export function organizationSchema(site) {
  const s = site.schema || {};
  const sameAs = Object.values(site.social || {}).filter(Boolean);
  if (site.gbpLink) sameAs.push(site.gbpLink);
  return prune({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absUrl(site, "/#organization"),
    name: site.businessName,
    url: absUrl(site, "/"),
    logo: { "@type": "ImageObject", url: absUrl(site, s.logo) },
    telephone: site.phone,
    email: site.email || undefined,
    founder: site.founder ? { "@type": "Person", name: site.founder, jobTitle: "Founder" } : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs,
  });
}

export function serviceSchema(site, service) {
  return prune({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription,
    url: absUrl(site, `/services/${service.slug}`),
    image: absUrl(site, service.image),
    provider: { "@id": absUrl(site, "/#business") },
    areaServed: (site.schema?.serviceArea || []).map((a) => ({ "@type": "City", name: a })),
  });
}

export function faqSchema(faqs) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(site, items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? absUrl(site, item.href) : undefined,
    })),
  };
}

export function articleSchema(site, post) {
  return prune({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: absUrl(site, post.image),
    datePublished: post.date,
    dateModified: site.lastUpdated || post.date,
    author: site.founder
      ? { "@type": "Person", name: site.founder, jobTitle: "Founder", worksFor: { "@id": absUrl(site, "/#organization") } }
      : { "@id": absUrl(site, "/#organization") },
    publisher: { "@id": absUrl(site, "/#organization") },
    mainEntityOfPage: absUrl(site, `/blog/${post.slug}`),
  });
}

export function imageSchema(site, src, alt) {
  return prune({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: absUrl(site, src),
    name: alt,
  });
}

export default function JsonLd({ data }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
  return (
    <>
      {items.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
    </>
  );
}
