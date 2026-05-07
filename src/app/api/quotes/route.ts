import { saveDb, getDb } from "@/lib/server/db";
import { sendQuoteNotification } from "@/lib/server/email";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type QuotePayload = Record<string, string | undefined>;

const fields = [
  "company_name",
  "contact_person",
  "phone",
  "email",
  "product_interest",
  "selected_material",
  "selected_price",
  "selected_unit",
  "quantity",
  "message",
  "quote_source",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term"
] as const;

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as QuotePayload | null;

  if (!payload?.phone && !payload?.email) {
    return NextResponse.json(
      { error: "Phone or email is required" },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const { db } = await getDb();
  db.run(
    `INSERT INTO quote_leads (${fields.join(", ")}, status, created_at, updated_at)
     VALUES (${fields.map(() => "?").join(", ")}, ?, ?, ?)`,
    [...fields.map((field) => payload[field] || ""), "new", now, now]
  );
  await saveDb();

  await sendQuoteNotification(payload).catch(() => undefined);

  return NextResponse.json({ ok: true });
}
