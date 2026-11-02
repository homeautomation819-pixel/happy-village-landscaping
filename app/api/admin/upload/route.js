import fs from "fs";
import path from "path";
import { isAuthed } from "../../../../lib/auth";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/svg+xml": ".svg", "image/gif": ".gif" };

export async function POST(request) {
  if (!(await isAuthed())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!file || !ALLOWED[file.type]) {
      return Response.json({ error: "Unsupported image type (use JPG, PNG, WebP, SVG or GIF)" }, { status: 400 });
    }
    const bytes = Buffer.from(await file.arrayBuffer());
    if (bytes.length > MAX_BYTES) {
      return Response.json({ error: "Image too large (max 8 MB)" }, { status: 400 });
    }
    const base = (file.name || "image")
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "image";
    const dir = path.join(process.cwd(), "public", "images", "uploads");
    fs.mkdirSync(dir, { recursive: true });
    const filename = `${base}-${Date.now()}${ALLOWED[file.type]}`;
    fs.writeFileSync(path.join(dir, filename), bytes);
    return Response.json({ ok: true, path: `/images/uploads/${filename}` });
  } catch {
    return Response.json({ error: "Upload failed" }, { status: 400 });
  }
}
