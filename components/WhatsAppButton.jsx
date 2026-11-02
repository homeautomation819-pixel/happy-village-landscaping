import { waLink } from "../lib/site";

export default function WhatsAppButton({ site }) {
  const href = waLink(site.whatsappNumber || site.phone, site.whatsappGreeting);
  return (
    <a
      href={href}
      className="wa-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.businessName} on WhatsApp`}
    >
      <svg width="30" height="30" viewBox="0 0 32 32" fill="#fff" aria-hidden="true">
        <path d="M16 2C8.3 2 2 8.3 2 16c0 2.5.7 4.8 1.8 6.9L2 30l7.3-1.7c2 1.1 4.3 1.7 6.7 1.7 7.7 0 14-6.3 14-14S23.7 2 16 2zm0 25.5c-2.1 0-4.2-.6-6-1.6l-.4-.2-4.3 1 1.2-4.2-.3-.4C5 20.5 4.3 18.3 4.3 16 4.3 9.5 9.5 4.3 16 4.3S27.7 9.5 27.7 16 22.5 27.7 16 27.7zm6.4-8.6c-.4-.2-2.1-1-2.4-1.1-.3-.1-.6-.2-.8.2-.2.4-.9 1.1-1.1 1.3-.2.2-.4.3-.8.1-.4-.2-1.5-.6-2.9-1.8-1.1-1-1.8-2.1-2-2.5-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.7.1-.3.1-.5 0-.7-.1-.2-.8-2-1.1-2.8-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.9c.2.2 2.6 4 6.3 5.6.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.1-.9 2.4-1.7.3-.9.3-1.6.2-1.7-.1-.2-.3-.3-.7-.5z" />
      </svg>
    </a>
  );
}
