import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf8"));
}

export function writeJson(file, data) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

export const getSite = () => readJson("site.json");
export const getServices = () => readJson("services.json");
export const getService = (slug) => getServices().find((s) => s.slug === slug);
export const getLocations = () => readJson("locations.json");
export const getLocation = (slug) => getLocations().find((l) => l.slug === slug);
export const getPages = () => readJson("pages.json");
export const getBlog = () => readJson("blog.json");
export const getPost = (slug) => getBlog().find((p) => p.slug === slug);

export function getSubmissions() {
  try {
    return readJson("submissions.json");
  } catch {
    return [];
  }
}

export function addSubmission(entry) {
  const subs = getSubmissions();
  subs.unshift({ ...entry, date: new Date().toISOString(), read: false });
  writeJson("submissions.json", subs);
}

export function getAppointments() {
  try {
    return readJson("appointments.json");
  } catch {
    return [];
  }
}

export function addAppointment(entry) {
  const appts = getAppointments();
  appts.unshift({ ...entry, date: new Date().toISOString(), status: "New" });
  writeJson("appointments.json", appts);
}

export function getLastUpdated() {
  try {
    return readJson("site.json").lastUpdated;
  } catch {
    return null;
  }
}
