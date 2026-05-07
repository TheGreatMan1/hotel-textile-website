import { requireAdmin } from "@/lib/server/auth";
import { getDb, saveDb } from "@/lib/server/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Params = {
  params: {
    id: string;
  };
};

export async function PATCH(request: Request, { params }: Params) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    status?: string;
  } | null;
  const status = body?.status || "new";

  const { db } = await getDb();
  db.run("UPDATE quote_leads SET status = ?, updated_at = ? WHERE id = ?", [
    status,
    new Date().toISOString(),
    Number(params.id)
  ]);
  await saveDb();

  return NextResponse.json({ ok: true });
}
