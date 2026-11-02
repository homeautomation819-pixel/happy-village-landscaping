# Supabase Setup — Happy Village Landscaping

## 1. Create the project
1. Go to https://supabase.com → **New project** (free tier works).
2. Note your **Project URL** and **service_role key** (Project Settings → API).

## 2. Create the content table
In the Supabase dashboard → **SQL Editor**, run:

```sql
create table if not exists content (
  key text primary key,
  data jsonb not null
);

-- No public access: only the server (service role) reads/writes
alter table content enable row level security;
```

## 3. Configure the environment
Copy `.env.example` to `.env.local` (local) or add the same variables in Vercel → Project → Settings → Environment Variables (production):

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_SECRET` (any long random string)

## 4. Seed the database
With `.env.local` filled in, run once:

```bash
node scripts/seed-supabase.js
```

This pushes all content from `data/*.json` (site settings, 16 services, 8 locations, pages, blog, admin password) into Supabase.

## How it works
- With `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` set, the site reads and writes all content in Supabase — admin edits persist on Vercel.
- Without those variables, the site falls back to the local `data/*.json` files, so offline development still works unchanged.
