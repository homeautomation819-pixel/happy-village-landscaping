import crypto from "crypto";
import { cookies } from "next/headers";
import { getAdmin, writeAdmin } from "./content";

const SECRET = process.env.ADMIN_SECRET || "hv-landscaping-default-secret-change-me";
const COOKIE = "hv_admin";

function sign(value) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export async function verifyPassword(password) {
  const admin = await getAdmin();
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const expected = Buffer.from(admin.passwordHash);
  const got = Buffer.from(hash);
  return expected.length === got.length && crypto.timingSafeEqual(got, expected);
}

export async function changePassword(newPassword) {
  const admin = await getAdmin();
  admin.passwordHash = crypto.createHash("sha256").update(newPassword).digest("hex");
  await writeAdmin(admin);
}

export async function createSession() {
  const token = `${Date.now()}.${sign("admin")}`;
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isAuthed() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value || "";
  const [ts, sig] = token.split(".");
  if (!ts || !sig) return false;
  const expected = sign("admin");
  return sig.length === expected.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}
