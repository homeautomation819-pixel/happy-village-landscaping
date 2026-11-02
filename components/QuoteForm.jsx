"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuoteForm({ services, defaultService }) {
  const router = useRouter();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.target;
    const data = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      service: form.service.value,
      message: form.message.value,
      website: form.website.value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push("/thank-you");
    } catch {
      setStatus("idle");
      setError("Something went wrong sending your message. Please call us instead — we're open 24 hours.");
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label>Website <input name="website" tabIndex="-1" autoComplete="off" /></label>
      </div>
      <div>
        <label htmlFor="qf-name">Name *</label>
        <input id="qf-name" name="name" required autoComplete="name" />
      </div>
      <div className="admin-row" style={{ gap: 14 }}>
        <div>
          <label htmlFor="qf-phone">Phone *</label>
          <input id="qf-phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="qf-email">Email</label>
          <input id="qf-email" name="email" type="email" autoComplete="email" />
        </div>
      </div>
      <div>
        <label htmlFor="qf-service">Service Needed</label>
        <select id="qf-service" name="service" defaultValue={defaultService || ""}>
          <option value="">Not sure — help me decide</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="qf-message">Tell us about your project *</label>
        <textarea id="qf-message" name="message" required placeholder="What are you planning? Property address or neighbourhood helps us quote faster." />
      </div>
      {error ? <p className="admin-msg err">{error}</p> : null}
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Request My Free Quote"}
      </button>
      <p className="form-note">No obligation, no pressure. We respond quickly — our phone line is open 24 hours.</p>
    </form>
  );
}
