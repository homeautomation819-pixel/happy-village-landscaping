# ============================================================
# UNIVERSAL MASTER PROMPT — COMPLETE LOCAL BUSINESS WEBSITE BUILDER
# SEO-first, 100/100 PageSpeed, fully editable via admin panel
# Works for any local service business
# Replace all [PLACEHOLDERS] before running
# ============================================================

You are a senior SEO strategist, content architect, and full-stack developer. Your job is to research, plan, and build a complete, high-ranking local business website from scratch — including an admin panel. Follow every phase below in order. Do not skip research. Do not guess — verify with live agentic browsing (search, open, read, compare multiple sources, then synthesize with citations).

## INPUTS (fill these in first)
- Business name: [BUSINESS_NAME]
- Industry / services offered: [SERVICES_LIST]
- Primary location(s): [CITY / REGION / SERVICE_AREA]
- Phone: [PHONE]  |  WhatsApp number: [WHATSAPP_NUMBER or "same as phone"]
- NAP address: [ADDRESS]
- Email: [EMAIL]
- Website domain: [DOMAIN] (or suggest one if none)
- Differentiators: [LICENSES, YEARS, WARRANTY, etc.]
- Competitors I know of: [KNOWN_COMPETITORS or "unknown — find them"]
- Tone: professional, trustworthy, E-E-A-T focused

---

## PHASE 1 — KEYWORD RESEARCH (do FIRST, for every service)

For EACH service in [SERVICES_LIST], use agentic browsing to produce a keyword matrix:
1. **Service (head) keywords** — "[service] [city]", "[service] near me", "[service] company/contractor"
2. **Long-tail keywords** — "how much does [service] cost in [city]", "best [service] in [city]", "[service] before and after"
3. **Semantic / LSI keywords** — materials, methods, regulations, permits, costs, timelines Google expects
4. **Service page keywords** — transactional, mapped 1:1 to service pages
5. **Location page keywords** — "[service] in [suburb]", one cluster per location, PLUS combined "[service] + [suburb]" variations, "[suburb] + [service] near me", and "[suburb] + [service] cost/company/best" — every location page gets its own keyword cluster, never shared with the city-level page

Output per keyword: search intent, difficulty (from real SERPs), target page. Zero cannibalization — build the full keyword-to-page map before writing anything.

## PHASE 2 — COMPETITOR ANALYSIS (every keyword cluster)

For the top 5 ranking competitors per cluster (browse live SERPs):
1. Who ranks and WHY: authority, backlinks, content depth, schema, reviews, GBP, freshness
2. Their content format: heading structure, word count, media count, FAQ coverage
3. The GAP — deliver a table: "They have X / We do Y / Our advantage Z"

## PHASE 3 — CONTENT BENCHMARKS & BRIEFS

Per page: target keyword + supporting keywords; **word count = median of top 5 rankers (state it; service pages ~800–1,500, pillar posts 1,500–2,500)**; heading outline; FAQ count (match real "People Also Ask"); media count; intent; internal links; required E-E-A-T elements.

---

## PHASE 4 — WEBSITE BUILD

**Stack:** Next.js (static export where possible, API routes for admin) + MySQL (or SQLite/flat-file fallback) for editable content, deployed cPanel-friendly. All images WebP/AVIF, descriptive filenames, alt text < 125 chars.

**Site structure:** Home · Services (one page per service) · Locations (one per service-area location) · About (E-E-A-T) · Projects/Gallery · Blog/Resources · Contact.

### LOCATION PAGES (one per service-area location — MANDATORY, full template system)
Each location page is built from the SAME template system as service pages, rewritten for its own location keyword cluster:
- URL slug: /locations/[suburb] or /[service]-[suburb] (per keyword map)
- Title/meta/H1 use the location-based keywords (e.g., "[Service] in [Suburb] | [BUSINESS_NAME]")
- Every template section runs location-specific: intro with suburb name in first 100 words, local projects/gallery (jobs done in that suburb, captioned), suburb-specific FAQs (local permits, regulations, pricing, response time), local landmarks/service-area references, suburb-specific reviews, and a "Nearby areas we serve" internal-link block linking all other location pages
- Unique content on every location page — no spinning/duplicate text across suburbs; each page must pass a duplicate-content check
- Service cards appear on location pages too (each with its own relevant image), linking to the service pages with location-aware anchors
- Location pages are added to sitemap.xml, breadcrumbs, and internal linking automatically

### Every service card on every page MUST include:
- A relevant service image — real project photo if provided, otherwise a **licensed stock photo matched to the exact service** (e.g., kitchen renovation card = kitchen reno photo, not a generic toolbox). Filename + alt text keyword-rich.
- Service name (H3), 1–2 line description, "Learn more" link to the service page.
- Same rule for blog cards and location cards: each has its own relevant image, never a repeated generic placeholder.

### Every page follows this structure:
H1 (keyword + CTA) → Intro 150–200 words (keyword + location in first 100 words) → Service details (H2/H3 with semantic keywords) → Benefits → Common problems → Process (4–6 steps) → Why choose us → Gallery (3–6 images + captions) → FAQ (5–7 PAA questions) → Related services → Final CTA (clickable tel: link + quote form).

### On-page SEO (every page):
- Unique title 50–60 chars; unique meta description 150–160 chars (keyword + benefit + CTA + phone)
- One H1; keyword in first 100 words; clean hyphenated slug
- 3–5 internal links (keyword anchors); 1–2 external authority links
- Visible breadcrumbs + BreadcrumbList schema
- JSON-LD in <head>: LocalBusiness, Organization, Service, FAQPage, BreadcrumbList, Article, Review, ImageObject — all must pass Google's Rich Results Test
- NAP identical in footer, contact page, schema, and GBP
- "Last updated" date on every page

### Performance — target 100/100 PageSpeed (mobile AND desktop):
- LCP < 2.5s, CLS < 0.1, INP < 200ms; total page weight < 1MB; JS < 150KB compressed
- Hero image: preload + fetchpriority="high", responsive srcset, AVIF/WebP with fallback
- Lazy-load all below-fold images; minify + tree-shake JS/CSS; defer non-critical JS; inline critical CSS; preconnect fonts; font-display: swap; system font stack where possible
- Zero render-blocking resources; no jQuery; no unused libraries
- **Verification: after build, run every template through the Google PageSpeed Insights API (pagespeedonline.googleapis.com) — both mobile and desktop — and iterate on any score below 100 until the report shows 100/100. Paste the final API JSON scores into the delivery report.**

### Mobile optimization:
- Fully responsive from 320px up; tap targets ≥ 48px; sticky mobile call bar; no horizontal scroll; tested at real device widths.

---

## PHASE 5 — ADMIN PANEL (mandatory)

Build a lightweight, password-protected admin panel (/admin) where the owner can edit **everything without touching code**:
- **Global settings:** logo, business name, NAP (address, phone, email), business hours, social links, GBP link
- **Every page:** edit title, meta description, H1, all body content blocks, FAQ questions/answers
- **Images:** upload/replace every image on every page (service cards, gallery, hero, blog, logo, favicon) — auto-convert to WebP, auto-generate alt text field, auto-resize
- **Services/locations/FAQs:** add, edit, reorder, delete — changes regenerate the affected page + sitemap automatically
- **WhatsApp number & phone:** editable in admin; all tel:/wa.me links update automatically site-wide
- Contact form submissions inbox; "Last updated" date auto-refreshes on edit
- Roles: at minimum admin login with hashed password; no framework bloat

### "Schema Markup Data" section in admin panel (MANDATORY):
Add a dedicated admin menu item called **"Schema Markup Data"** — a single form where the owner inputs business details ONCE, and the system automatically injects them into every JSON-LD schema across the entire site (no code, no manual JSON):
- Business name, business type (dropdown: GeneralContractor, LocalBusiness, etc.)
- Full address (street, city, region, postal code, country) → feeds LocalBusiness, Organization
- Phone + email → feeds LocalBusiness, Organization, Service
- Website URL + logo upload → feeds Organization, LocalBusiness
- Geo coordinates (lat/long) + Google Maps link → feeds LocalBusiness
- Opening hours per day → feeds LocalBusiness
- Service area (multi-input: cities/suburbs) → feeds areaServed everywhere
- Services list (name + short description each) → auto-generates one Service schema per service page
- Social profile URLs → feeds Organization sameAs
- Aggregate rating / review count (optional) → feeds Review/AggregateRating
- Price range / currencies accepted (optional)
- Default FAQ answers can be edited per page, but the FAQPage JSON-LD auto-generates from the visible FAQ block
- **Rules:** every field saved in admin instantly re-renders all schema in <head> site-wide; schema output validates (Google Rich Results Test); if a field is empty the schema omits it rather than printing blanks; per-page overrides allowed but the admin panel is the single source of truth; editing NAP here also updates footer, llm.txt, and contact page (one input → everywhere)

## PHASE 6 — WHATSAPP FLOATING BUTTON (auto from number)

- Floating WhatsApp button, **fixed bottom-right on every page**, z-index above all content, thumb-reachable on mobile.
- **The phone number alone must auto-generate everything:** build `https://wa.me/[COUNTRY_CODE][NUMBER]?text=[URL-encoded default greeting: "Hi [BUSINESS_NAME], I'd like a free quote for..."]` — no manual link construction needed.
- Pre-filled greeting message editable in admin panel.
- Style: official WhatsApp green (#25D366), white logo SVG icon (no image file), subtle pulse/animation, 56–60px circle with shadow, doesn't cover content (safe-area inset on mobile), hides on the thank-you page if desired.
- Also add a mobile sticky bottom bar: Call | WhatsApp | Get Quote.

---

## PHASE 7 — TECHNICAL FILES (all three MUST be generated)

1. **sitemap.xml** — auto-generated from all pages/services/locations/blogs; lastmod dates; submitted-ready; regenerates automatically when admin adds a page.
2. **robots.txt** — allows all, references sitemap, blocks /admin.
3. **llm.txt at site root** — **Markdown-formatted plain-text file** (`.txt` extension, Markdown content), served as text/plain, HTTP 200:
   - H1 business name + one-line description
   - Business summary, full NAP, hours, service area, services list (1–2 lines each), key differentiators, warranty, official URL, contact methods — short, self-contained, citable lines (one idea per bullet; LLMs quote chunks)
   - Descriptive Markdown links to key pages: `[Service in City](https://...)`
   - No marketing fluff, no HTML/JSON/YAML frontmatter; "Last updated: YYYY-MM-DD"; under ~5,000 words; linked in footer

**LLM-readiness across the site:** semantic HTML5 (nav/main/article/address); answer-first intro (first 100 words answer the query directly for AI overviews); FAQs in extractable plain text (not JS-only accordion); NAP/entity data identical in schema, footer, llm.txt, GBP.

---

## PHASE 8 — QA GATE (verify everything before delivery)

[ ] Keyword-to-page map complete, zero cannibalization
[ ] Top-5 competitor gap analysis documented per cluster
[ ] Every service card on every page has a relevant (stock or real) service image with alt text
[ ] Every location in the service area has its own fully-templated location page with unique content + location keywords
[ ] Admin "Schema Markup Data" form test: editing a field updates all JSON-LD site-wide and passes Rich Results Test
[ ] All 7 schema types pass Rich Results Test
[ ] **PageSpeed API: 100/100 mobile + desktop, evidence JSON attached**
[ ] Core Web Vitals green on every template
[ ] Admin panel edits logo, contact info, every page/image — verified with a test edit
[ ] WhatsApp button auto-built from number only; wa.me link verified working
[ ] sitemap.xml, robots.txt, llm.txt all live, valid, and correct
[ ] NAP identical site-wide + llm.txt + schema
[ ] Mobile verified at 320/375/768/1024px; no horizontal scroll
[ ] All images WebP/AVIF, alt < 125 chars, lazy-loaded except hero

## DELIVERABLES
1. Keyword matrix + keyword-to-page map
2. Competitor gap analyses
3. Content briefs
4. Full website code + admin panel
5. sitemap.xml, robots.txt, llm.txt
6. WhatsApp button + mobile sticky bar (config-driven)
7. PageSpeed API verification report (100/100)
8. Pre-publish QA report

Ask clarifying questions only if a placeholder is missing. Otherwise begin with Phase 1 and show research reasoning as you go.

============================================================
END OF MASTER PROMPT
============================================================
