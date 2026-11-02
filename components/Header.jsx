"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header({ site }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>{site.hours?.label || "Open 24 hours"} · {site.address.city}, {site.address.region}</span>
          <a href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
        </div>
      </div>
      <header className="header">
        <div className="container">
          <Link href="/" className="logo" aria-label="Happy Village Landscaping home">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
              <circle cx="17" cy="17" r="16" fill="#241205" />
              <path d="M17 7c3.5 3 5.5 6.5 5.5 10.5 0 4.5-2.8 7.5-5.5 9.5-2.7-2-5.5-5-5.5-9.5C11.5 13.5 13.5 10 17 7z" fill="#f5b97f" />
              <path d="M17 14v11" stroke="#241205" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Happy Village <span style={{ color: "var(--botanical)" }}>Landscaping</span>
          </Link>
          <button
            className="menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
          <nav className={`nav${open ? " open" : ""}`} aria-label="Main navigation">
            <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
            <Link href="/locations" onClick={() => setOpen(false)}>Areas We Serve</Link>
            <Link href="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <Link href="/contact" className="nav-cta" onClick={() => setOpen(false)}>Free Quote</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
