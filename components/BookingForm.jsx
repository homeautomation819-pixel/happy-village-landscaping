"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getServiceQuestions } from "../lib/serviceQuestions";

export default function BookingForm({ services, locations, defaultService, compact, includeQuestions }) {
  const router = useRouter();
  const [selected, setSelected] = useState(defaultService || "");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const questions = !compact || includeQuestions ? getServiceQuestions(selected) : [];

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.target;
    const serviceName = services.find((s) => s.slug === form.service.value)?.name || form.service.value;
    const answers = {};
    questions.forEach((q) => {
      if (form[q.key]?.value) answers[q.label] = form[q.key].value;
    });
    const data = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email?.value || "",
      service: serviceName,
      serviceSlug: form.service.value,
      town: form.town?.value || "",
      preferredDate: form.preferredDate?.value || "",
      preferredWindow: form.preferredWindow.value,
      address: form.address?.value || "",
      answers,
      message: form.message.value,
      website: form.website.value,
    };
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push("/thank-you");
    } catch {
      setStatus("idle");
      setError("Something went wrong sending your request. Please call us instead — we're open 24 hours.");
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label>Website <input name="website" tabIndex="-1" autoComplete="off" /></label>
      </div>

      <div className="admin-row" style={{ gap: 12 }}>
        <div>
          <label htmlFor="bf-name">Name *</label>
          <input id="bf-name" name="name" required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="bf-phone">Phone *</label>
          <input id="bf-phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
      </div>

      <div>
        <label htmlFor="bf-service">Service needed *</label>
        <select
          id="bf-service"
          name="service"
          required
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="" disabled>Choose a service…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="admin-row" style={{ gap: 12 }}>
        <div>
          <label htmlFor="bf-town">Your town</label>
          <select id="bf-town" name="town">
            <option value="">Select…</option>
            {(locations || []).map((l) => (
              <option key={l.slug} value={l.name}>{l.name}</option>
            ))}
            <option value="Other GTA">Other GTA</option>
          </select>
        </div>
        <div>
          <label htmlFor="bf-window">Preferred time</label>
          <select id="bf-window" name="preferredWindow">
            <option value="Any time">Any time</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>
      </div>

      {questions.map((q) => (
        <div key={q.key}>
          <label htmlFor={`bf-${q.key}`}>{q.label}</label>
          {q.type === "select" ? (
            <select id={`bf-${q.key}`} name={q.key}>
              <option value="">Select…</option>
              {q.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input id={`bf-${q.key}`} name={q.key} type="text" />
          )}
        </div>
      ))}

      {!compact && (
        <>
          <div className="admin-row" style={{ gap: 12 }}>
            <div>
              <label htmlFor="bf-date">Preferred appointment date</label>
              <input id="bf-date" name="preferredDate" type="date" />
            </div>
            <div>
              <label htmlFor="bf-email">Email</label>
              <input id="bf-email" name="email" type="email" autoComplete="email" />
            </div>
          </div>
          <div>
            <label htmlFor="bf-address">Property address / neighbourhood</label>
            <input id="bf-address" name="address" autoComplete="street-address" placeholder="Helps us plan your on-site visit" />
          </div>
        </>
      )}

      <div>
        <label htmlFor="bf-message">Project details</label>
        <textarea
          id="bf-message"
          name="message"
          style={{ minHeight: compact ? 76 : 120 }}
          placeholder="Briefly — size, timeline…"
        />
      </div>

      {error ? <p className="admin-msg err">{error}</p> : null}
      <button className="btn btn-primary" type="submit" disabled={status === "sending"} style={{ width: "100%" }}>
        {status === "sending" ? "Sending..." : "Request My Free Appointment"}
      </button>
      <p className="form-note" style={{ textAlign: "center" }}>No obligation. Your details are only used to arrange your quote.</p>
    </form>
  );
}
