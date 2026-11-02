import { isAuthed } from "../../../../lib/auth";
import { dbRead } from "../../../../lib/db";
import { getSubmissions, getAppointments, writeContentFile, getSite, writeSite } from "../../../../lib/content";

const ALLOWED_FILES = ["site.json", "services.json", "locations.json", "pages.json", "blog.json", "submissions.json", "appointments.json"];

export async function GET() {
  if (!(await isAuthed())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({
    site: await getSite(),
    services: await dbRead("services"),
    locations: await dbRead("locations"),
    pages: await dbRead("pages"),
    blog: await dbRead("blog"),
    submissions: await getSubmissions(),
    appointments: await getAppointments(),
  });
}

export async function PUT(request) {
  if (!(await isAuthed())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { file, data } = await request.json();
    if (!ALLOWED_FILES.includes(file)) {
      return Response.json({ error: "Unknown data section" }, { status: 400 });
    }
    await writeContentFile(file, data);
    if (file !== "site.json") {
      const site = await getSite();
      site.lastUpdated = new Date().toISOString().slice(0, 10);
      await writeSite(site);
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Invalid data" }, { status: 400 });
  }
}
