import { addAppointment } from "../../../lib/content";

export async function POST(request) {
  try {
    const data = await request.json();
    if (data.website) {
      return Response.json({ ok: true });
    }
    if (!data.name || !data.phone || !data.serviceSlug) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }
    addAppointment({
      name: String(data.name).slice(0, 120),
      phone: String(data.phone).slice(0, 40),
      email: String(data.email || "").slice(0, 120),
      service: String(data.service || "").slice(0, 80),
      serviceSlug: String(data.serviceSlug || "").slice(0, 80),
      town: String(data.town || "").slice(0, 80),
      preferredDate: String(data.preferredDate || "").slice(0, 20),
      preferredWindow: String(data.preferredWindow || "").slice(0, 40),
      address: String(data.address || "").slice(0, 200),
      answers: typeof data.answers === "object" && data.answers ? data.answers : {},
      message: String(data.message || "").slice(0, 2000),
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
