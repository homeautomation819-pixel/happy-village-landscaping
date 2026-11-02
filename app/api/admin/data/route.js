import { isAuthed } from "../../../../lib/auth";
import { readJson, writeJson, getSubmissions, getAppointments } from "../../../../lib/content";

const ALLOWED_FILES = ["site.json", "services.json", "locations.json", "pages.json", "blog.json", "submissions.json", "appointments.json"];

export async function GET() {
  if (!(await isAuthed())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({
    site: readJson("site.json"),
    services: readJson("services.json"),
    locations: readJson("locations.json"),
    pages: readJson("pages.json"),
    blog: readJson("blog.json"),
    submissions: getSubmissions(),
    appointments: getAppointments(),
  });
}

export async function PUT(request) {
  if (!(await isAuthed())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { file, data } = await request.json();
    if (!ALLOWED_FILES.includes(file)) {
      return Response.json({ error: "Unknown data section" }, { status: 400 });
    }
    writeJson(file, data);
    if (file !== "site.json") {
      const site = readJson("site.json");
      site.lastUpdated = new Date().toISOString().slice(0, 10);
      writeJson("site.json", site);
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Invalid data" }, { status: 400 });
  }
}
