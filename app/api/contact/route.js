import { addSubmission } from "../../../lib/content";

export async function POST(request) {
  try {
    const data = await request.json();
    if (data.website) {
      return Response.json({ ok: true });
    }
    if (!data.name || !data.phone || !data.message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }
    await addSubmission({
      name: String(data.name).slice(0, 120),
      phone: String(data.phone).slice(0, 40),
      email: String(data.email || "").slice(0, 120),
      service: String(data.service || "").slice(0, 80),
      message: String(data.message).slice(0, 2000),
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
