import Link from "next/link";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <div className="container">
        <ol>
          {items.map((item, i) =>
            i === items.length - 1 ? (
              <li key={i} aria-current="page">{item.label}</li>
            ) : (
              <li key={i}><Link href={item.href}>{item.label}</Link></li>
            )
          )}
        </ol>
      </div>
    </nav>
  );
}
