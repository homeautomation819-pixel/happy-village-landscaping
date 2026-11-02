import { dbRead, dbWrite } from "./db";

// All content access goes through here. Async because the store may be
// Supabase (production) or flat JSON files (local fallback).

export const getSite = () => dbRead("site");
export const getServices = async () => (await dbRead("services")) || [];
export const getService = async (slug) => (await getServices()).find((s) => s.slug === slug);
export const getLocations = async () => (await dbRead("locations")) || [];
export const getLocation = async (slug) => (await getLocations()).find((l) => l.slug === slug);
export const getPages = () => dbRead("pages");
export const getBlog = async () => (await dbRead("blog")) || [];
export const getPost = async (slug) => (await getBlog()).find((p) => p.slug === slug);
export const getAdmin = () => dbRead("admin");

export const writeSite = (data) => dbWrite("site", data);
export const writeAdmin = (data) => dbWrite("admin", data);

export async function writeContentFile(file, data) {
  const key = file.replace(".json", "");
  await dbWrite(key, data);
}

export async function getSubmissions() {
  return (await dbRead("submissions")) || [];
}

export async function addSubmission(entry) {
  const subs = await getSubmissions();
  subs.unshift({ ...entry, date: new Date().toISOString(), read: false });
  await dbWrite("submissions", subs);
}

export async function getAppointments() {
  return (await dbRead("appointments")) || [];
}

export async function addAppointment(entry) {
  const appts = await getAppointments();
  appts.unshift({ ...entry, date: new Date().toISOString(), status: "New" });
  await dbWrite("appointments", appts);
}
