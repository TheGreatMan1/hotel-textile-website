import fs from "fs";
import path from "path";
import initSqlJs, { type Database, type SqlJsStatic } from "sql.js";
import {
  contentDocumentKeys,
  defaultContentDocuments,
  type ContentDocumentKey
} from "./defaultContent";

type DbState = {
  db: Database;
  filePath: string;
};

let sqlPromise: Promise<SqlJsStatic> | null = null;
let dbStatePromise: Promise<DbState> | null = null;

function databasePath() {
  return path.resolve(process.cwd(), process.env.DATABASE_PATH || "data/luxetex.sqlite");
}

function ensureDir(filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

async function getSql() {
  if (!sqlPromise) {
    const wasmPath = path.resolve(
      process.cwd(),
      "node_modules/sql.js/dist/sql-wasm.wasm"
    );
    sqlPromise = initSqlJs({
      wasmBinary: fs.readFileSync(wasmPath)
    });
  }

  return sqlPromise;
}

function runMigrations(db: Database) {
  db.run(`
    CREATE TABLE IF NOT EXISTS content_documents (
      key TEXT PRIMARY KEY,
      json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS uploads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kind TEXT NOT NULL,
      original_name TEXT NOT NULL,
      public_path TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS quote_leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_name TEXT,
      contact_person TEXT,
      phone TEXT,
      email TEXT,
      product_interest TEXT,
      selected_material TEXT,
      selected_price TEXT,
      selected_unit TEXT,
      quantity TEXT,
      message TEXT,
      quote_source TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_content TEXT,
      utm_term TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_sessions (
      token_hash TEXT PRIMARY KEY,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
}

function seedContent(db: Database) {
  const now = new Date().toISOString();
  const statement = db.prepare(
    "INSERT OR IGNORE INTO content_documents (key, json, updated_at) VALUES (?, ?, ?)"
  );

  contentDocumentKeys.forEach((key) => {
    statement.run([key, JSON.stringify(defaultContentDocuments[key], null, 2), now]);
  });
  statement.free();
}

export async function getDb() {
  if (!dbStatePromise) {
    dbStatePromise = (async () => {
      const SQL = await getSql();
      const filePath = databasePath();
      ensureDir(filePath);
      const db = fs.existsSync(filePath)
        ? new SQL.Database(fs.readFileSync(filePath))
        : new SQL.Database();

      runMigrations(db);
      seedContent(db);
      persistDb(db, filePath);

      return { db, filePath };
    })();
  }

  return dbStatePromise;
}

export function persistDb(db: Database, filePath: string) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, Buffer.from(db.export()));
}

export async function saveDb() {
  const state = await getDb();
  persistDb(state.db, state.filePath);
}

export function isContentDocumentKey(key: string): key is ContentDocumentKey {
  return (contentDocumentKeys as readonly string[]).includes(key);
}
