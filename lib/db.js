import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const DATA_DIR = path.join(process.cwd(), "data");

// Key <-> flat-file mapping (fallback when Supabase is not configured)
const FILE_FOR = {
  site: "site.json",
  services: "services.json",
  locations: "locations.json",
  pages: "pages.json",
  blog: "blog.json",
  admin: "admin.json",
  submissions: "submissions.json",
  appointments: "appointments.json",
};

let _client = null;
export function useSupabase() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function client() {
  if (!_client) {
    _client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });
  }
  return _client;
}

export async function dbRead(key) {
  if (useSupabase()) {
    try {
      const { data, error } = await client().from("content").select("data").eq("key", key).maybeSingle();
      if (error) throw new Error(error.message);
      if (data) return data.data;
      // Key missing in Supabase — seed from the flat file if one exists
      const fallback = fileRead(key);
      if (fallback !== undefined) {
        await dbWrite(key, fallback);
        return fallback;
      }
      return undefined;
    } catch (e) {
      if (/invalid api key/i.test(e.message)) {
        console.warn(`Supabase credentials invalid — falling back to flat-file content for "${key}". Fix SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in your env.`);
        return fileRead(key);
      }
      throw new Error(`Supabase read failed for ${key}: ${e.message}`);
    }
  }
  return fileRead(key);
}

export async function dbWrite(key, value) {
  if (useSupabase()) {
    const { error } = await client().from("content").upsert({ key, data: value });
    if (error) throw new Error(`Supabase write failed for ${key}: ${error.message}`);
    return;
  }
  fileWrite(key, value);
}

function fileRead(key) {
  const file = FILE_FOR[key];
  if (!file) return undefined;
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf8"));
  } catch {
    return undefined;
  }
}

function fileWrite(key, value) {
  const file = FILE_FOR[key];
  if (!file) throw new Error(`Unknown content key: ${key}`);
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(value, null, 2));
}
