import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data.db');

let db;

export function getDB() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }
  return db;
}

export function initDB() {
  let database;
  try {
    database = getDB();
    // Test that the db is readable
    database.prepare("SELECT 1").get();
  } catch (err) {
    // Database is corrupt — delete and recreate
    console.log('Database corrupt, recreating...');
    db = null;
    fs.rmSync(DB_PATH, { force: true });
    fs.rmSync(DB_PATH + '-wal', { force: true });
    fs.rmSync(DB_PATH + '-shm', { force: true });
    database = getDB();
  }

  // Ensure schema_migrations tracking table exists
  database.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // Get list of already-applied migrations
  const applied = new Set(
    database.prepare('SELECT name FROM schema_migrations').all().map(r => r.name)
  );

  // Find all migration files sorted numerically
  const migrationsDir = path.join(__dirname, '..', 'migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    if (applied.has(file)) continue;
    console.log(`Applying migration: ${file}`);
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
    database.exec(sql);
    database.prepare('INSERT INTO schema_migrations (name) VALUES (?)').run(file);
    console.log(`Migration applied: ${file}`);
  }
}
