# Happy Village Landscaping — Website

Complete SEO-first website for Happy Village Landscaping (North York, Toronto), built with Next.js (App Router) per `Master_Prompt_Complete_Website_Builder.md`.

## Stack

- Next.js 15 + React 19, no CSS/JS framework bloat — one hand-written design system (`app/globals.css`)
- Flat-file content store in `data/` (JSON) — no database required, cPanel-friendly
- Server mode (`next start`) so admin edits go live instantly and images optimize on demand (WebP/AVIF via `next/image`)

## Run

```bash
npm install
npm run build
npm start        # production on http://localhost:3000
npm run dev      # development
```

## Admin Panel

- URL: `/admin` — default password `happyvillage2026` (**change it in the Password tab after first login**)
- Optional: set `ADMIN_SECRET` env var to harden session signing
- Tabs: Global Settings (NAP, hours, social, WhatsApp), **Schema Markup Data** (one form → all JSON-LD site-wide), Services / Locations / Blog (full add-edit-reorder-delete), Pages (structured JSON editor with validation), Inbox (contact submissions), Password

## Content Model

| File | Feeds |
|---|---|
| `data/site.json` | Global settings + schema markup data (single source of truth) |
| `data/services.json` | All 16 service pages, cards, footer, sitemap |
| `data/locations.json` | 8 GTA location pages |
| `data/pages.json` | Home, about, contact, gallery, services index |
| `data/blog.json` | Blog posts |
| `data/submissions.json` | Contact form inbox (auto-created) |
| `data/appointments.json` | Appointment requests from booking forms (auto-created) |

## Key Features

- Original color identity: deep petrol + copper palette (distinct from any reference site), applied consistently across nav, footer, buttons, cards and forms
- **Appointment booking system**: one scheduling form on the homepage covering all 16 services; a dedicated preselected booking form with service-specific questions on every service page; requests land in the admin **Appointment Requests** tab with status management (New / Confirmed / Completed / Cancelled)
- 16 service pages + 8 location pages from template systems, all admin-editable
- JSON-LD: LocalBusiness, Organization, Service, FAQPage, BreadcrumbList, Article, ImageObject — auto-generated, empty fields omitted
- WhatsApp floating button + mobile sticky bar auto-built from the configured number
- `sitemap.xml`, `robots.txt`, `llm.txt` generated live from content
- FAQ blocks are plain-text `<details>` elements — extractable without JavaScript
- All photography: licensed Unsplash stock, service-matched, keyword-rich filenames, served as WebP/AVIF via `next/image`

## Research Deliverables

See `research/` for the keyword matrix, competitor gap analysis and content briefs.
