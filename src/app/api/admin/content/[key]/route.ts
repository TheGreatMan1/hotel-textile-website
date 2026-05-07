import {
  getContentDocument,
  isContentDocumentKey,
  setContentDocument
} from "@/lib/server/contentStore";
import { requireAdmin } from "@/lib/server/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Params = {
  params: {
    key: string;
  };
};

export async function GET(_request: Request, { params }: Params) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isContentDocumentKey(params.key)) {
    return NextResponse.json({ error: "Unknown content key" }, { status: 404 });
  }

  return NextResponse.json(await getContentDocument(params.key));
}

export async function PUT(request: Request, { params }: Params) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isContentDocumentKey(params.key)) {
    return NextResponse.json({ error: "Unknown content key" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  await setContentDocument(params.key, body);
  return NextResponse.json({ ok: true });
}
