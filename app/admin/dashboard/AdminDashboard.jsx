"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* ---------- Small field primitives ---------- */

function Field({ label, value, onChange, textarea, help, type }) {
  return (
    <div>
      <label>{label}</label>
      {textarea ? (
        <textarea value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type={type || "text"} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      )}
      {help ? <p className="admin-help">{help}</p> : null}
    </div>
  );
}

function ImageField({ label, value, onChange, help }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    setBusy(false);
    if (res.ok) onChange(data.path);
    else setErr(data.error || "Upload failed");
  }

  return (
    <div>
      <label>{label}</label>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input value={value ?? ""} onChange={(e) => onChange(e.target.value)} style={{ flex: 1 }} />
        <label className="btn btn-outline" style={{ borderColor: "var(--botanical)", color: "var(--botanical)", padding: "10px 16px", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
          {busy ? "Uploading..." : "Upload"}
          <input type="file" accept="image/*" onChange={upload} style={{ display: "none" }} />
        </label>
      </div>
      {value ? <img src={value} alt="" style={{ marginTop: 8, maxWidth: 220, borderRadius: 8 }} /> : null}
      {err ? <p className="admin-msg err" style={{ marginTop: 8 }}>{err}</p> : null}
      {help ? <p className="admin-help">{help}</p> : null}
    </div>
  );
}

/* Generic editor for arrays of { key: string } items */
function ArrayEditor({ label, items, onChange, fields, newItem }) {
  const list = Array.isArray(items) ? items : [];
  const update = (i, key, val) => {
    const next = list.map((it, idx) => (idx === i ? { ...it, [key]: val } : it));
    onChange(next);
  };
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div style={{ border: "1px dashed #d9d0bd", borderRadius: 10, padding: 16, marginBottom: 18 }}>
      <label style={{ display: "block", marginBottom: 10 }}>{label}</label>
      {list.map((item, i) => (
        <div key={i} style={{ background: "var(--cream)", borderRadius: 10, padding: 14, marginBottom: 12 }}>
          <div style={{ display: "grid", gap: 10 }}>
            {fields.map((f) => (
              <Field
                key={f.key}
                label={f.label}
                value={item[f.key]}
                textarea={f.textarea}
                onChange={(v) => update(i, f.key, v)}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button type="button" className="btn btn-outline" style={{ borderColor: "#ddd4c2", color: "var(--bark)", padding: "6px 14px", fontSize: "0.82rem" }} onClick={() => move(i, -1)}>↑</button>
            <button type="button" className="btn btn-outline" style={{ borderColor: "#ddd4c2", color: "var(--bark)", padding: "6px 14px", fontSize: "0.82rem" }} onClick={() => move(i, 1)}>↓</button>
            <button type="button" className="btn btn-outline" style={{ borderColor: "#e0b4a6", color: "#a4442c", padding: "6px 14px", fontSize: "0.82rem" }} onClick={() => onChange(list.filter((_, idx) => idx !== i))}>Remove</button>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-primary" style={{ padding: "9px 18px", fontSize: "0.88rem" }} onClick={() => onChange([...list, { ...newItem }])}>
        + Add Item
      </button>
    </div>
  );
}

/* Editor for arrays of plain strings */
function StringArrayEditor({ label, items, onChange, placeholder }) {
  const list = Array.isArray(items) ? items : [];
  return (
    <div style={{ border: "1px dashed #d9d0bd", borderRadius: 10, padding: 16, marginBottom: 18 }}>
      <label style={{ display: "block", marginBottom: 10 }}>{label}</label>
      {list.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input value={item} placeholder={placeholder} onChange={(e) => onChange(list.map((x, idx) => (idx === i ? e.target.value : x)))} />
          <button type="button" className="btn btn-outline" style={{ borderColor: "#e0b4a6", color: "#a4442c", padding: "6px 14px", fontSize: "0.82rem" }} onClick={() => onChange(list.filter((_, idx) => idx !== i))}>×</button>
        </div>
      ))}
      <button type="button" className="btn btn-primary" style={{ padding: "9px 18px", fontSize: "0.88rem" }} onClick={() => onChange([...list, ""])}>+ Add</button>
    </div>
  );
}

/* ---------- Collection list + edit (services / locations / blog) ---------- */

function CollectionEditor({ title, items, fields, arrayFields, stringArrayFields, onSave, nameOf, newItem }) {
  const [editing, setEditing] = useState(null); // index or "new"
  const [draft, setDraft] = useState(null);
  const [msg, setMsg] = useState("");

  const startEdit = (i) => { setEditing(i); setDraft(JSON.parse(JSON.stringify(items[i]))); setMsg(""); };
  const startNew = () => { setEditing("new"); setDraft(JSON.parse(JSON.stringify(newItem))); setMsg(""); };

  const saveItem = () => {
    let next;
    if (editing === "new") next = [...items, draft];
    else next = items.map((it, i) => (i === editing ? draft : it));
    persist(next);
    setEditing(null);
  };

  const removeItem = (i) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    persist(items.filter((_, idx) => idx !== i));
  };

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    persist(next);
  };

  async function persist(next) {
    const res = await onSave(next);
    setMsg(res ? "Saved — live site and sitemap updated." : "Save failed.");
  }

  if (editing !== null) {
    const set = (key) => (v) => setDraft({ ...draft, [key]: v });
    return (
      <div>
        <button className="btn btn-outline" style={{ borderColor: "var(--botanical)", color: "var(--botanical)", marginBottom: 18 }} onClick={() => setEditing(null)}>← Back to list</button>
        <div className="form">
          {fields.map((f) =>
            f.image ? (
              <ImageField key={f.key} label={f.label} value={draft[f.key]} onChange={set(f.key)} help={f.help} />
            ) : (
              <Field key={f.key} label={f.label} value={draft[f.key]} onChange={set(f.key)} textarea={f.textarea} help={f.help} />
            )
          )}
          {arrayFields.map((af) => (
            <ArrayEditor
              key={af.key}
              label={af.label}
              items={draft[af.key]}
              onChange={(v) => setDraft({ ...draft, [af.key]: v })}
              fields={af.fields}
              newItem={af.newItem}
            />
          ))}
          {(stringArrayFields || []).map((sf) => (
            <StringArrayEditor
              key={sf.key}
              label={sf.label}
              items={draft[sf.key]}
              placeholder={sf.placeholder}
              onChange={(v) => setDraft({ ...draft, [sf.key]: v })}
            />
          ))}
          {msg ? <p className={`admin-msg ${msg.startsWith("Saved") ? "ok" : "err"}`}>{msg}</p> : null}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-primary" onClick={saveItem}>Save</button>
            <button className="btn btn-outline" style={{ borderColor: "#ddd4c2", color: "var(--bark)" }} onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-list">
        {items.map((item, i) => (
          <div className="admin-list-item" key={i}>
            <span><strong>{nameOf(item)}</strong></span>
            <span className="actions">
              <button onClick={() => move(i, -1)} aria-label="Move up">↑</button>
              <button onClick={() => move(i, 1)} aria-label="Move down">↓</button>
              <button onClick={() => startEdit(i)}>Edit</button>
              <button onClick={() => removeItem(i)} style={{ color: "#a4442c" }}>Delete</button>
            </span>
          </div>
        ))}
      </div>
      {msg ? <p className={`admin-msg ${msg.startsWith("Saved") ? "ok" : "err"}`}>{msg}</p> : null}
      <button className="btn btn-primary" onClick={startNew}>+ Add New {title.replace(/s$/, "")}</button>
    </div>
  );
}

/* ---------- Main dashboard ---------- */

const TABS = [
  "Appointment Requests",
  "Global Settings",
  "Schema Markup Data",
  "Services",
  "Locations",
  "Pages",
  "Blog",
  "Inbox",
  "Password",
];

const BUSINESS_TYPES = [
  "LandscapingBusiness", "LocalBusiness", "GeneralContractor", "HomeAndConstructionBusiness", "ProfessionalService",
];

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState(TABS[0]);
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/data").then(async (res) => {
      if (res.status === 401) router.push("/admin");
      else setData(await res.json());
    });
  }, [router]);

  async function saveFile(file, payload) {
    const res = await fetch("/api/admin/data", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file, data: payload }),
    });
    if (res.ok) setData({ ...data, [file.replace(".json", "")]: payload });
    return res.ok;
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  if (!data) return <div className="admin-wrap"><p>Loading admin panel…</p></div>;
  const { site, services, locations, pages, blog, submissions, appointments } = data;
  const setSite = (patch) => setData({ ...data, site: { ...site, ...patch } });

  const flash = (text) => { setMsg(text); setTimeout(() => setMsg(""), 4000); };

  return (
    <div className="admin-wrap">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: "1.6rem" }}>Happy Village Landscaping — Admin</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <a className="btn btn-outline" style={{ borderColor: "var(--botanical)", color: "var(--botanical)", padding: "9px 18px" }} href="/" target="_blank" rel="noreferrer">View Site</a>
          <button className="btn btn-outline" style={{ borderColor: "#ddd4c2", color: "var(--bark)", padding: "9px 18px" }} onClick={logout}>Log Out</button>
        </div>
      </div>
      <div className="admin-tabs">
        {TABS.map((t) => (
          <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      {msg ? <p className={`admin-msg ${msg.startsWith("Saved") ? "ok" : "err"}`}>{msg}</p> : null}

      {/* ---------------- Appointment Requests ---------------- */}
      {tab === "Appointment Requests" && (
        <div className="admin-panel">
          <h2>Appointment Requests</h2>
          <p style={{ color: "var(--muted)", marginBottom: 18, fontSize: "0.92rem" }}>
            Booking requests from the homepage and service-page scheduling forms. Call the customer back to confirm, then update the status.
          </p>
          {(appointments || []).length === 0 ? (
            <p style={{ color: "var(--muted)" }}>No appointment requests yet. New booking requests appear here instantly.</p>
          ) : (
            <div className="admin-list">
              {appointments.map((a, i) => (
                <div className="admin-list-item" key={i} style={{ alignItems: "flex-start" }}>
                  <span style={{ flex: 1 }}>
                    <strong>{a.name}</strong> — <a href={`tel:${a.phone}`}>{a.phone}</a>
                    {a.email ? <> · <a href={`mailto:${a.email}`}>{a.email}</a></> : null}
                    <br />
                    <strong>{a.service}</strong>
                    {a.town ? <> · {a.town}</> : null}
                    {a.preferredDate ? <> · {a.preferredDate}</> : null}
                    {a.preferredWindow ? <> ({a.preferredWindow})</> : null}
                    {a.address ? <><br /><span style={{ fontSize: "0.9rem" }}>📍 {a.address}</span></> : null}
                    {a.answers && Object.keys(a.answers).length > 0 ? (
                      <>
                        <br />
                        <span style={{ fontSize: "0.9rem", color: "var(--bark)" }}>
                          {Object.entries(a.answers).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                        </span>
                      </>
                    ) : null}
                    {a.message ? <><br /><span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{a.message}</span></> : null}
                    <br />
                    <span style={{ color: "var(--muted)", fontSize: "0.8rem" }}>Requested {new Date(a.date).toLocaleString()}</span>
                  </span>
                  <span className="actions" style={{ alignItems: "center" }}>
                    <select
                      value={a.status || "New"}
                      onChange={async (e) => {
                        const next = appointments.map((x, idx) => (idx === i ? { ...x, status: e.target.value } : x));
                        flash((await saveFile("appointments.json", next)) ? "Saved — status updated." : "Save failed.");
                      }}
                      style={{ padding: "8px 10px", borderRadius: 8, border: "1.5px solid #ddd4c2", fontWeight: 700, fontSize: "0.85rem", minHeight: 40 }}
                      aria-label="Appointment status"
                    >
                      {["New", "Confirmed", "Completed", "Cancelled"].map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button onClick={async () => {
                      if (!confirm("Delete this appointment request?")) return;
                      const next = appointments.filter((_, idx) => idx !== i);
                      flash((await saveFile("appointments.json", next)) ? "Saved — request deleted." : "Delete failed.");
                    }} style={{ color: "#a4442c" }}>Delete</button>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ---------------- Global Settings ---------------- */}
      {tab === "Global Settings" && (
        <div className="admin-panel">
          <h2>Global Settings</h2>
          <p style={{ color: "var(--muted)", marginBottom: 18, fontSize: "0.92rem" }}>
            One input updates the footer, contact page, llm.txt and schema site-wide.
          </p>
          <div className="form">
            <Field label="Business Name" value={site.businessName} onChange={(v) => setSite({ businessName: v })} />
            <Field label="Founder Name (feeds schema, footer, bylines)" value={site.founder || ""} onChange={(v) => setSite({ founder: v })} />
            <Field label="Tagline" value={site.tagline} onChange={(v) => setSite({ tagline: v })} />
            <div className="admin-row">
              <Field label="Phone (tel: format, e.g. +14388354350)" value={site.phone} onChange={(v) => setSite({ phone: v })} help="Updates all tel: links site-wide automatically." />
              <Field label="Phone (display format)" value={site.phoneDisplay} onChange={(v) => setSite({ phoneDisplay: v })} />
            </div>
            <div className="admin-row">
              <Field label="WhatsApp Number (country code + number)" value={site.whatsappNumber} onChange={(v) => setSite({ whatsappNumber: v })} help="The wa.me link and floating button are auto-built from this number only." />
              <Field label="WhatsApp Pre-filled Greeting" value={site.whatsappGreeting} onChange={(v) => setSite({ whatsappGreeting: v })} />
            </div>
            <Field label="Email (optional — omitted everywhere if empty)" value={site.email} onChange={(v) => setSite({ email: v })} />
            <div className="admin-row">
              <Field label="Street Address" value={site.address.street} onChange={(v) => setSite({ address: { ...site.address, street: v } })} />
              <Field label="City" value={site.address.city} onChange={(v) => setSite({ address: { ...site.address, city: v } })} />
            </div>
            <div className="admin-row">
              <Field label="Province / Region" value={site.address.region} onChange={(v) => setSite({ address: { ...site.address, region: v } })} />
              <Field label="Postal Code" value={site.address.postalCode} onChange={(v) => setSite({ address: { ...site.address, postalCode: v } })} />
            </div>
            <Field label="Business Hours Label" value={site.hours.label} onChange={(v) => setSite({ hours: { ...site.hours, label: v } })} />
            <ArrayEditor
              label="Opening Hours Per Day (feeds LocalBusiness schema)"
              items={site.hours.days}
              onChange={(v) => setSite({ hours: { ...site.hours, days: v } })}
              fields={[
                { key: "day", label: "Day" },
                { key: "opens", label: "Opens (HH:MM)" },
                { key: "closes", label: "Closes (HH:MM)" },
              ]}
              newItem={{ day: "", opens: "09:00", closes: "17:00" }}
            />
            <div className="admin-row">
              <Field label="Google Rating (e.g. 5.0)" value={site.googleRating} onChange={(v) => setSite({ googleRating: v })} />
              <Field label="Website Domain (e.g. https://www.example.ca)" value={site.domain} onChange={(v) => setSite({ domain: v })} help="Used for sitemap, schema and llm.txt URLs." />
            </div>
            <Field label="Google Business Profile Link (optional)" value={site.gbpLink} onChange={(v) => setSite({ gbpLink: v })} />
            <Field label="Google Reviews Link (optional — footer shows rating badge)" value={site.googleReviewLink || ""} onChange={(v) => setSite({ googleReviewLink: v })} />
            <ImageField label="Hero Image" value={site.heroImage} onChange={(v) => setSite({ heroImage: v })} />
            <div className="admin-row">
              <Field label="Facebook URL" value={site.social.facebook} onChange={(v) => setSite({ social: { ...site.social, facebook: v } })} />
              <Field label="Instagram URL" value={site.social.instagram} onChange={(v) => setSite({ social: { ...site.social, instagram: v } })} />
            </div>
            <div className="admin-row">
              <Field label="LinkedIn URL" value={site.social.linkedin} onChange={(v) => setSite({ social: { ...site.social, linkedin: v } })} />
              <Field label="YouTube URL" value={site.social.youtube} onChange={(v) => setSite({ social: { ...site.social, youtube: v } })} />
            </div>
            <div className="admin-row">
              <Field label="X (Twitter) URL" value={site.social.x || ""} onChange={(v) => setSite({ social: { ...site.social, x: v } })} />
              <div />
            </div>
            <Field label="Last Updated Date (auto-refreshes on content edits)" value={site.lastUpdated} onChange={(v) => setSite({ lastUpdated: v })} />
            <button className="btn btn-primary" onClick={async () => flash((await saveFile("site.json", site)) ? "Saved — settings live site-wide." : "Save failed.")}>Save Global Settings</button>
          </div>
        </div>
      )}

      {/* ---------------- Schema Markup Data ---------------- */}
      {tab === "Schema Markup Data" && (
        <div className="admin-panel">
          <h2>Schema Markup Data</h2>
          <p style={{ color: "var(--muted)", marginBottom: 18, fontSize: "0.92rem" }}>
            Enter business details once — every JSON-LD schema (LocalBusiness, Organization, Service, FAQPage, BreadcrumbList, Article, ImageObject) re-renders automatically across the whole site. Empty fields are omitted from schema rather than printed blank. Editing NAP here also updates the footer, contact page and llm.txt.
          </p>
          <div className="form">
            <div>
              <label>Business Type (schema @type)</label>
              <select value={site.schema.businessType} onChange={(e) => setSite({ schema: { ...site.schema, businessType: e.target.value } })}>
                {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <p className="admin-help" style={{ marginTop: -6 }}>Name, address, phone and email feed schema from the Global Settings tab — one input, everywhere.</p>
            <ImageField label="Logo (feeds Organization & LocalBusiness schema)" value={site.schema.logo} onChange={(v) => setSite({ schema: { ...site.schema, logo: v } })} />
            <div className="admin-row">
              <Field label="Geo Latitude (optional)" value={site.schema.geoLat} onChange={(v) => setSite({ schema: { ...site.schema, geoLat: v } })} />
              <Field label="Geo Longitude (optional)" value={site.schema.geoLng} onChange={(v) => setSite({ schema: { ...site.schema, geoLng: v } })} />
            </div>
            <Field label="Google Maps Link (optional)" value={site.schema.googleMapsLink} onChange={(v) => setSite({ schema: { ...site.schema, googleMapsLink: v } })} />
            <div className="admin-row">
              <Field label="Price Range (e.g. $$)" value={site.schema.priceRange} onChange={(v) => setSite({ schema: { ...site.schema, priceRange: v } })} />
              <Field label="Currencies Accepted" value={site.schema.currenciesAccepted} onChange={(v) => setSite({ schema: { ...site.schema, currenciesAccepted: v } })} />
            </div>
            <ArrayEditor
              label="Service Area — cities/suburbs (feeds areaServed everywhere)"
              items={(site.schema.serviceArea || []).map((name) => ({ name }))}
              onChange={(v) => setSite({ schema: { ...site.schema, serviceArea: v.map((x) => x.name).filter(Boolean) } })}
              fields={[{ key: "name", label: "City / Suburb" }]}
              newItem={{ name: "" }}
            />
            <div className="admin-row">
              <Field label="Aggregate Rating Value (optional)" value={site.schema.aggregateRatingValue} onChange={(v) => setSite({ schema: { ...site.schema, aggregateRatingValue: v } })} />
              <Field label="Review Count (optional)" value={site.schema.reviewCount} onChange={(v) => setSite({ schema: { ...site.schema, reviewCount: v } })} help="Both required for AggregateRating to appear; left empty it is omitted." />
            </div>
            <p className="admin-help">
              Services schemas auto-generate from the Services tab (one Service schema per service page). FAQPage schemas auto-generate from each page's visible FAQ block. Social profile URLs feed Organization sameAs from Global Settings.
            </p>
            <button className="btn btn-primary" onClick={async () => flash((await saveFile("site.json", site)) ? "Saved — all schema re-rendered site-wide." : "Save failed.")}>Save Schema Data</button>
          </div>
        </div>
      )}

      {/* ---------------- Services ---------------- */}
      {tab === "Services" && (
        <div className="admin-panel">
          <h2>Services (add, edit, reorder, delete)</h2>
          <p style={{ color: "var(--muted)", marginBottom: 18, fontSize: "0.92rem" }}>Changes regenerate the service page, services index, footer links and sitemap automatically.</p>
          <CollectionEditor
            title="Services"
            items={services}
            onSave={(next) => saveFile("services.json", next)}
            nameOf={(s) => s.name}
            newItem={{
              slug: "new-service", name: "New Service", category: "Landscaping Services",
              shortDescription: "", image: "", imageAlt: "", title: "", metaDescription: "", h1: "", intro: "",
              sections: [], benefits: [], problems: [], process: [], whyChoose: [],
              pricingRows: [], pricingNote: "", faqs: [], relatedServices: [],
            }}
            fields={[
              { key: "slug", label: "URL Slug (hyphenated)", help: "e.g. landscape-design — becomes /services/landscape-design" },
              { key: "name", label: "Service Name" },
              { key: "category", label: "Category (Landscaping Services / Home Renovation Services / Commercial Services / Seasonal Services)" },
              { key: "shortDescription", label: "Card Short Description", textarea: true },
              { key: "image", label: "Service Image", image: true },
              { key: "imageAlt", label: "Image Alt Text (under 125 chars, keyword-rich)" },
              { key: "title", label: "SEO Title (50–60 chars)" },
              { key: "metaDescription", label: "Meta Description (150–160 chars)", textarea: true },
              { key: "h1", label: "H1 (keyword + CTA)" },
              { key: "intro", label: "Intro (150–200 words, keyword + location in first 100 words)", textarea: true },
              { key: "pricingNote", label: "Pricing Note", textarea: true },
            ]}
            arrayFields={[
              { key: "sections", label: "Detail Sections (H2 + body)", fields: [{ key: "h2", label: "Section H2" }, { key: "body", label: "Body", textarea: true }], newItem: { h2: "", body: "" } },
              { key: "benefits", label: "Benefits", fields: [{ key: "title", label: "Title" }, { key: "text", label: "Text", textarea: true }], newItem: { title: "", text: "" } },
              { key: "problems", label: "Common Problems", fields: [{ key: "title", label: "Title" }, { key: "text", label: "Text", textarea: true }], newItem: { title: "", text: "" } },
              { key: "process", label: "Process Steps", fields: [{ key: "step", label: "Step Name" }, { key: "text", label: "Text", textarea: true }], newItem: { step: "", text: "" } },
              { key: "pricingRows", label: "Pricing Rows", fields: [{ key: "item", label: "Item" }, { key: "range", label: "Typical Range" }], newItem: { item: "", range: "" } },
              { key: "faqs", label: "FAQs (auto-generates FAQPage schema)", fields: [{ key: "q", label: "Question" }, { key: "a", label: "Answer", textarea: true }], newItem: { q: "", a: "" } },
            ]}
            stringArrayFields={[
              { key: "whyChoose", label: "Why Choose Us — bullet list", placeholder: "e.g. Free itemized quotes" },
              { key: "relatedServices", label: "Related Service Slugs", placeholder: "e.g. hardscaping" },
            ]}
          />
          <p className="admin-help" style={{ marginTop: 10 }}>Every field above renders live on the service page; FAQs also generate the page's FAQPage schema automatically.</p>
        </div>
      )}

      {/* ---------------- Locations ---------------- */}
      {tab === "Locations" && (
        <div className="admin-panel">
          <h2>Locations (add, edit, reorder, delete)</h2>
          <p style={{ color: "var(--muted)", marginBottom: 18, fontSize: "0.92rem" }}>Each location gets its own fully-templated page, sitemap entry and breadcrumb automatically.</p>
          <CollectionEditor
            title="Locations"
            items={locations}
            onSave={(next) => saveFile("locations.json", next)}
            nameOf={(l) => l.name}
            newItem={{
              slug: "new-location", name: "New Location", isHomeBase: false, image: "", imageAlt: "",
              title: "", metaDescription: "", h1: "", intro: "", localBody: "", landmarks: "", faqs: [],
            }}
            fields={[
              { key: "slug", label: "URL Slug (hyphenated)" },
              { key: "name", label: "Location Name" },
              { key: "image", label: "Location Card Image", image: true },
              { key: "imageAlt", label: "Image Alt Text (under 125 chars)" },
              { key: "title", label: "SEO Title (50–60 chars)" },
              { key: "metaDescription", label: "Meta Description (150–160 chars)", textarea: true },
              { key: "h1", label: "H1" },
              { key: "intro", label: "Intro (location keyword in first 100 words)", textarea: true },
              { key: "localBody", label: "Local Body Copy (unique to this location)", textarea: true },
              { key: "landmarks", label: "Local Landmarks / Neighbourhoods" },
            ]}
            arrayFields={[
              { key: "faqs", label: "Location FAQs (local permits, pricing, response time)", fields: [{ key: "q", label: "Question" }, { key: "a", label: "Answer", textarea: true }], newItem: { q: "", a: "" } },
            ]}
          />
        </div>
      )}

      {/* ---------------- Pages ---------------- */}
      {tab === "Pages" && (
        <div className="admin-panel">
          <h2>Page Content (Home, About, Contact, Gallery, Services Index)</h2>
          <p style={{ color: "var(--muted)", marginBottom: 18, fontSize: "0.92rem" }}>
            Page content is stored as structured JSON. Edit titles, meta descriptions, H1s and body blocks here — invalid JSON is rejected so the live site never breaks.
            Homepage Google reviews live at <code>home.reviews</code> — add entries like <code>{'{"name":"Sarah L.","area":"North York","rating":5,"text":"..."}'}</code> (only add real Google reviews). Gallery images are editable at <code>gallery.items</code> (upload new images via any image field, then paste the path here).
          </p>
          <PagesEditor pages={pages} onSave={async (next) => flash((await saveFile("pages.json", next)) ? "Saved — pages updated." : "Save failed.")} />
        </div>
      )}

      {/* ---------------- Blog ---------------- */}
      {tab === "Blog" && (
        <div className="admin-panel">
          <h2>Blog Posts (add, edit, reorder, delete)</h2>
          <CollectionEditor
            title="Blog Posts"
            items={blog}
            onSave={(next) => saveFile("blog.json", next)}
            nameOf={(p) => p.title}
            newItem={{
              slug: "new-post", title: "New Post", metaDescription: "", excerpt: "", image: "", imageAlt: "",
              date: new Date().toISOString().slice(0, 10), category: "Cost Guides", relatedService: "", h1: "", intro: "", sections: [], faqs: [], cta: "",
            }}
            fields={[
              { key: "slug", label: "URL Slug (hyphenated)" },
              { key: "title", label: "Post Title (SEO)" },
              { key: "image", label: "Post Card Image", image: true },
              { key: "imageAlt", label: "Image Alt Text (under 125 chars)" },
              { key: "metaDescription", label: "Meta Description", textarea: true },
              { key: "excerpt", label: "Card Excerpt", textarea: true },
              { key: "date", label: "Publish Date (YYYY-MM-DD)" },
              { key: "category", label: "Category" },
              { key: "relatedService", label: "Related Service Slug (optional)" },
              { key: "h1", label: "H1" },
              { key: "intro", label: "Intro", textarea: true },
              { key: "cta", label: "Closing CTA Line", textarea: true },
            ]}
            arrayFields={[
              { key: "sections", label: "Article Sections", fields: [{ key: "h2", label: "Section H2" }, { key: "body", label: "Body", textarea: true }], newItem: { h2: "", body: "" } },
              { key: "faqs", label: "FAQs (auto-generates FAQPage schema)", fields: [{ key: "q", label: "Question" }, { key: "a", label: "Answer", textarea: true }], newItem: { q: "", a: "" } },
            ]}
          />
        </div>
      )}

      {/* ---------------- Inbox ---------------- */}
      {tab === "Inbox" && (
        <div className="admin-panel">
          <h2>Contact Form Submissions</h2>
          {submissions.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>No submissions yet. New quote requests appear here instantly.</p>
          ) : (
            <div className="admin-list">
              {submissions.map((s, i) => (
                <div className="admin-list-item" key={i} style={{ alignItems: "flex-start" }}>
                  <span>
                    <strong>{s.name}</strong> — <a href={`tel:${s.phone}`}>{s.phone}</a>
                    {s.email ? <> · <a href={`mailto:${s.email}`}>{s.email}</a></> : null}
                    {s.service ? <> · <em>{s.service}</em></> : null}
                    <br />
                    <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{s.message}</span>
                    <br />
                    <span style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{new Date(s.date).toLocaleString()}</span>
                  </span>
                  <span className="actions">
                    <button onClick={async () => {
                      if (!confirm("Delete this submission?")) return;
                      const next = submissions.filter((_, idx) => idx !== i);
                      flash((await saveFile("submissions.json", next)) ? "Saved — submission deleted." : "Delete failed.");
                    }} style={{ color: "#a4442c" }}>Delete</button>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ---------------- Password ---------------- */}
      {tab === "Password" && (
        <div className="admin-panel">
          <h2>Change Admin Password</h2>
          <PasswordForm onDone={(m) => flash(m)} />
        </div>
      )}
    </div>
  );
}

function PagesEditor({ pages, onSave }) {
  const [draft, setDraft] = useState(JSON.stringify(pages, null, 2));
  const [err, setErr] = useState("");
  return (
    <div className="form">
      <textarea
        style={{ minHeight: 420, fontFamily: "monospace", fontSize: "0.85rem" }}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        spellCheck="false"
      />
      {err ? <p className="admin-msg err">{err}</p> : null}
      <button className="btn btn-primary" onClick={() => {
        try {
          const parsed = JSON.parse(draft);
          setErr("");
          onSave(parsed);
        } catch (e) {
          setErr(`Invalid JSON — nothing was saved. ${e.message}`);
        }
      }}>Save Pages</button>
    </div>
  );
}

function PasswordForm({ onDone }) {
  const [err, setErr] = useState("");
  async function submit(e) {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current: e.target.current.value, next: e.target.next.value }),
    });
    const data = await res.json();
    if (res.ok) {
      onDone("Saved — password changed.");
      e.target.reset();
    } else {
      setErr(data.error || "Failed");
    }
  }
  return (
    <form className="form" onSubmit={submit} style={{ maxWidth: 420 }}>
      <div><label>Current Password</label><input name="current" type="password" required /></div>
      <div><label>New Password (min 8 characters)</label><input name="next" type="password" required minLength={8} /></div>
      {err ? <p className="admin-msg err">{err}</p> : null}
      <button className="btn btn-primary">Change Password</button>
    </form>
  );
}
