import crypto from "crypto";
import { cookies } from "next/headers";
import { getDb, saveDb } from "./db";

const sessionCookieName = "luxetex_admin_session";
const sessionDays = 7;

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function getSessionSecret() {
  return process.env.SESSION_SECRET || "development-session-secret-change-me";
}

function signToken(token: string) {
  return crypto
    .createHmac("sha256", getSessionSecret())
    .update(token)
    .digest("hex");
}

function packToken(token: string) {
  return `${token}.${signToken(token)}`;
}

function unpackToken(value?: string) {
  if (!value) return null;
  const [token, signature] = value.split(".");
  if (!token || !signature) return null;
  const expected = signToken(token);
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    ? token
    : null;
}

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || "admin@example.com",
    password: process.env.ADMIN_PASSWORD || "change-me"
  };
}

export async function createAdminSession() {
  const token = crypto.randomBytes(32).toString("hex");
  const now = new Date();
  const expires = new Date(now.getTime() + sessionDays * 24 * 60 * 60 * 1000);
  const { db } = await getDb();

  db.run(
    "INSERT INTO admin_sessions (token_hash, expires_at, created_at) VALUES (?, ?, ?)",
    [hashToken(token), expires.toISOString(), now.toISOString()]
  );
  await saveDb();

  cookies().set(sessionCookieName, packToken(token), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.COOKIE_SECURE === "true",
    path: "/",
    expires
  });
}

export async function destroyAdminSession() {
  const token = unpackToken(cookies().get(sessionCookieName)?.value);

  if (token) {
    const { db } = await getDb();
    db.run("DELETE FROM admin_sessions WHERE token_hash = ?", [hashToken(token)]);
    await saveDb();
  }

  cookies().delete(sessionCookieName);
}

export async function requireAdmin() {
  const token = unpackToken(cookies().get(sessionCookieName)?.value);
  if (!token) return false;

  const { db } = await getDb();
  const statement = db.prepare(
    "SELECT expires_at FROM admin_sessions WHERE token_hash = ?"
  );
  statement.bind([hashToken(token)]);
  const expiresAt = statement.step()
    ? (statement.getAsObject().expires_at as string)
    : undefined;
  statement.free();

  if (!expiresAt || new Date(expiresAt).getTime() <= Date.now()) {
    await destroyAdminSession();
    return false;
  }

  return true;
}
