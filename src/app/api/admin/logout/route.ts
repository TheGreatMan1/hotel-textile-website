import { destroyAdminSession } from "@/lib/server/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  await destroyAdminSession();
  return NextResponse.json({ ok: true });
}
