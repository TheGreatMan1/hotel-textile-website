import { createAdminSession, getAdminCredentials } from "@/lib/server/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    email?: string;
    password?: string;
  } | null;
  const credentials = getAdminCredentials();

  if (
    body?.email !== credentials.email ||
    body?.password !== credentials.password
  ) {
    return NextResponse.json({ error: "Invalid login" }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
