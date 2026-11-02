import Link from "next/link";
import Image from "next/image";

export default function ServiceCard({ service }) {
  return (
    <Link href={`/services/${service.slug}`} className="card" aria-label={`${service.name} — learn more`}>
      <div className="card-img">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      <div className="card-body">
        <span className="card-cat">{service.category}</span>
        <h3>{service.name}</h3>
        <p>{service.shortDescription}</p>
        <span className="card-link">Learn more</span>
      </div>
    </Link>
  );
}
