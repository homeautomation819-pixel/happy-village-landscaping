// Seeds Supabase with all content from data/*.json.
// Usage: fill .env.local (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY), then:
//   node scripts/seed-supabase.js
require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const FILES = ["site", "services", "locations", "pages", "blog", "admin"];

async function main() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local first.");
    process.exit(1);
  }
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
  for (const key of FILES) {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", `${key}.json`), "utf8"));
    const { error } = await supabase.from("content").upsert({ key, data });
    if (error) {
      console.error(`FAILED ${key}:`, error.message);
      process.exit(1);
    }
    console.log(`seeded: ${key}`);
  }
  console.log("Done — all content is now in Supabase.");
}

main();
