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

  // If news table already exists but schema_migrations is empty,
  // the DB was initialized before the migration runner — mark 0001 and 0002 as applied
  const migrationsCount = database.prepare('SELECT COUNT(*) as c FROM schema_migrations').get().c;
  if (migrationsCount === 0) {
    const newsExists = database.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='news'"
    ).get();
    if (newsExists) {
      database.prepare("INSERT OR IGNORE INTO schema_migrations (name) VALUES (?)").run('0001_initial_schema.sql');
      database.prepare("INSERT OR IGNORE INTO schema_migrations (name) VALUES (?)").run('0002_seed_data.sql');
      console.log('Bootstrapped schema_migrations with existing migrations.');
    }
  }

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
