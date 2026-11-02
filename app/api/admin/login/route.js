import { verifyPassword, createSession } from "../../../../lib/auth";

export async function POST(request) {
  try {
    const { password } = await request.json();
    if (!password || !verifyPassword(password)) {
      return Response.json({ error: "Incorrect password" }, { status: 401 });
    }
    await createSession();
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
