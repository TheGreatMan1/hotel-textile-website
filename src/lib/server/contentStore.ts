import type { WebsiteContent } from "@/lib/types";
import { assembleWebsiteContent, contentDocumentKeys, type ContentDocumentKey } from "./defaultContent";
import { getDb, isContentDocumentKey, saveDb } from "./db";

function firstValue<T>(rows: unknown[][], fallback: T): T {
  return (rows[0]?.[0] as T | undefined) ?? fallback;
}

export async function getContentDocument(key: ContentDocumentKey) {
  const { db } = await getDb();
  const statement = db.prepare("SELECT json FROM content_documents WHERE key = ?");
  statement.bind([key]);
  const json = statement.step()
    ? (statement.getAsObject().json as string)
    : "{}";
  statement.free();
  return JSON.parse(json) as unknown;
}

export async function setContentDocument(key: string, value: unknown) {
  if (!isContentDocumentKey(key)) {
    throw new Error("Unknown content document");
  }

  const { db } = await getDb();
  db.run(
    "UPDATE content_documents SET json = ?, updated_at = ? WHERE key = ?",
    [JSON.stringify(value, null, 2), new Date().toISOString(), key]
  );
  await saveDb();
}

export async function getAllContentDocuments() {
  const documents = {} as Record<ContentDocumentKey, unknown>;

  await Promise.all(
    contentDocumentKeys.map(async (key) => {
      documents[key] = await getContentDocument(key);
    })
  );

  return documents;
}

export async function getWebsiteContentFromDb(): Promise<WebsiteContent> {
  return assembleWebsiteContent(await getAllContentDocuments());
}

export { contentDocumentKeys, isContentDocumentKey };
