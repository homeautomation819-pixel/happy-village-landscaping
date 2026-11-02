import { isAuthed, changePassword, verifyPassword } from "../../../../lib/auth";

export async function POST(request) {
  if (!(await isAuthed())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { current, next } = await request.json();
    if (!current || !(await verifyPassword(current))) {
      return Response.json({ error: "Current password is incorrect" }, { status: 400 });
    }
    if (!next || next.length < 8) {
      return Response.json({ error: "New password must be at least 8 characters" }, { status: 400 });
    }
    await changePassword(next);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
