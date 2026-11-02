export function telLink(phone) {
  return `tel:${(phone || "").replace(/[^+\d]/g, "")}`;
}

export function waLink(number, greeting) {
  const n = (number || "").replace(/[^\d]/g, "");
  const text = encodeURIComponent(greeting || "Hi, I'd like a free quote.");
  return `https://wa.me/${n}?text=${text}`;
}

export function fullAddress(site) {
  const a = site.address;
  return `${a.street}, ${a.city}, ${a.region} ${a.postalCode}, Canada`;
}

export function absUrl(site, path = "") {
  return `${(site.domain || "").replace(/\/$/, "")}${path}`;
}

export function truncate(str, max) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max - 3).trimEnd() + "..." : str;
}

export function ogFor(site, { title, description, image, path }) {
  const base = (site.domain || "").replace(/\/$/, "");
  return {
    title,
    description,
    url: `${base}${path}`,
    images: [{ url: `${base}${image || site.heroImage}`, alt: title }],
  };
}
