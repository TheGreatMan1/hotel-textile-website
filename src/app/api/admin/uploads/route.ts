import fs from "fs";
import path from "path";
import { requireAdmin } from "@/lib/server/auth";
import { getDb, saveDb } from "@/lib/server/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function safeName(name: string) {
  const extension = path.extname(name).toLowerCase();
  const base = path
    .basename(name, extension)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

  return `${base || "upload"}-${Date.now()}${extension}`;
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const kind = formData.get("kind") === "catalog" ? "catalog" : "images";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const uploadRoot = path.resolve(
    process.cwd(),
    process.env.UPLOAD_DIR || "public/uploads"
  );
  const folder = path.join(uploadRoot, kind);
  fs.mkdirSync(folder, { recursive: true });

  const filename = safeName(file.name);
  const bytes = Buffer.from(await file.arrayBuffer());
  const fullPath = path.join(folder, filename);
  fs.writeFileSync(fullPath, bytes);

  const publicPath = `/uploads/${kind}/${filename}`;
  const { db } = await getDb();
  db.run(
    "INSERT INTO uploads (kind, original_name, public_path, created_at) VALUES (?, ?, ?, ?)",
    [kind, file.name, publicPath, new Date().toISOString()]
  );
  await saveDb();

  return NextResponse.json({ publicPath });
}
