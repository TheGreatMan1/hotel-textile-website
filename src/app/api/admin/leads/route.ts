import { requireAdmin } from "@/lib/server/auth";
import { getDb } from "@/lib/server/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { db } = await getDb();
  const result = db.exec(
    "SELECT * FROM quote_leads ORDER BY datetime(created_at) DESC LIMIT 200"
  );
  const columns = result[0]?.columns || [];
  const values = result[0]?.values || [];

  return NextResponse.json({
    leads: values.map((row) =>
      Object.fromEntries(columns.map((column, index) => [column, row[index]]))
    )
  });
}
