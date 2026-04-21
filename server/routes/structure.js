import { Router } from 'express';
import { getDB } from '../db.js';
import { requireAdmin } from '../auth.js';

const router = Router();

// --- Board Members ---

// GET /api/structure/board
router.get('/board', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM board_members ORDER BY sort_order ASC, id ASC').all();
  res.json(rows);
});

// POST /api/structure/board
router.post('/board', requireAdmin, (req, res) => {
  const db = getDB();
  const { name, position, sort_order } = req.body;
  const result = db.prepare(
    'INSERT INTO board_members (name, position, sort_order) VALUES (?, ?, ?)'
  ).run(name, position, sort_order || 0);
  res.status(201).json({ ok: true, id: result.lastInsertRowid });
});

// PUT /api/structure/board/:id
router.put('/board/:id', requireAdmin, (req, res) => {
  const db = getDB();
  const { name, position, sort_order } = req.body;
  db.prepare(
    `UPDATE board_members SET name = ?, position = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(name, position, sort_order || 0, req.params.id);
  res.json({ ok: true });
});

// DELETE /api/structure/board/:id
router.delete('/board/:id', requireAdmin, (req, res) => {
  const db = getDB();
  db.prepare('DELETE FROM board_members WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// --- Union Members ---

// GET /api/structure/members
router.get('/members', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM union_members ORDER BY sort_order ASC, id ASC').all();
  res.json(rows);
});

// POST /api/structure/members
router.post('/members', requireAdmin, (req, res) => {
  const db = getDB();
  const { name, address, ogrn, website, position, director, sort_order } = req.body;
  const result = db.prepare(
    'INSERT INTO union_members (name, address, ogrn, website, position, director, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(name, address, ogrn, website || null, position, director, sort_order || 0);
  res.status(201).json({ ok: true, id: result.lastInsertRowid });
});

// PUT /api/structure/members/:id
router.put('/members/:id', requireAdmin, (req, res) => {
  const db = getDB();
  const { name, address, ogrn, website, position, director, sort_order } = req.body;
  db.prepare(
    `UPDATE union_members SET name = ?, address = ?, ogrn = ?, website = ?, position = ?, director = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(name, address, ogrn, website || null, position, director, sort_order || 0, req.params.id);
  res.json({ ok: true });
});

// DELETE /api/structure/members/:id
router.delete('/members/:id', requireAdmin, (req, res) => {
  const db = getDB();
  db.prepare('DELETE FROM union_members WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
