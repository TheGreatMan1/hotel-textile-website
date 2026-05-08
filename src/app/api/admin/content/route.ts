import { getAllContentDocuments } from "@/lib/server/contentStore";
import { requireAdmin } from "@/lib/server/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await getAllContentDocuments());
}
