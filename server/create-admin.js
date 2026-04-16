// Usage: node server/create-admin.js admin@example.com yourpassword
import { initDB, getDB } from './db.js';
import { hashPassword } from './auth.js';

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('Usage: node server/create-admin.js <email> <password>');
  process.exit(1);
}

initDB();
const db = getDB();
const hashed = hashPassword(password);

try {
  db.prepare('INSERT INTO admins (email, password_hash) VALUES (?, ?)').run(email, hashed);
  console.log(`Admin user created: ${email}`);
} catch (err) {
  if (err.message.includes('UNIQUE')) {
    console.error(`Admin with email ${email} already exists.`);
  } else {
    throw err;
  }
}
