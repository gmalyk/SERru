import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '..', 'data.db');

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

  // Check if tables already exist
  const tableExists = database.prepare(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='news'"
  ).get();

  if (!tableExists) {
    console.log('Initializing database...');

    // Run schema migration
    const schema = fs.readFileSync(
      path.join(__dirname, '..', 'migrations', '0001_initial_schema.sql'),
      'utf-8'
    );
    database.exec(schema);

    // Run seed data
    const seed = fs.readFileSync(
      path.join(__dirname, '..', 'migrations', '0002_seed_data.sql'),
      'utf-8'
    );
    database.exec(seed);

    console.log('Database initialized with schema and seed data.');
  }
}
