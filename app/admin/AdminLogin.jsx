"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: e.target.password.value }),
    });
    setBusy(false);
    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect password. Try again.");
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <div>
        <label htmlFor="admin-password">Password</label>
        <input id="admin-password" name="password" type="password" required autoFocus />
        <p className="admin-help">Default: happyvillage2026 — change it in Settings after first login.</p>
      </div>
      {error ? <p className="admin-msg err">{error}</p> : null}
      <button className="btn btn-primary" disabled={busy}>{busy ? "Signing in..." : "Sign In"}</button>
    </form>
  );
}
