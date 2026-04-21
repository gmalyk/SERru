import { Router } from 'express';
import { getDB } from '../db.js';
import { requireAdmin } from '../auth.js';

const router = Router();

// GET /api/about/documents?section=documents|join
router.get('/documents', (req, res) => {
  const db = getDB();
  const { section } = req.query;
  let rows;
  if (section) {
    rows = db.prepare('SELECT * FROM about_documents WHERE section = ? ORDER BY sort_order ASC, id ASC').all(section);
  } else {
    rows = db.prepare('SELECT * FROM about_documents ORDER BY section ASC, sort_order ASC, id ASC').all();
  }
  res.json(rows);
});

// POST /api/about/documents
router.post('/documents', requireAdmin, (req, res) => {
  const db = getDB();
  const { section, title, file_key, type, sort_order } = req.body;
  const result = db.prepare(
    'INSERT INTO about_documents (section, title, file_key, type, sort_order) VALUES (?, ?, ?, ?, ?)'
  ).run(section, title, file_key, type, sort_order || 0);
  res.status(201).json({ ok: true, id: result.lastInsertRowid });
});

// PUT /api/about/documents/:id
router.put('/documents/:id', requireAdmin, (req, res) => {
  const db = getDB();
  const { section, title, file_key, type, sort_order } = req.body;
  db.prepare(
    `UPDATE about_documents SET section = ?, title = ?, file_key = ?, type = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(section, title, file_key, type, sort_order || 0, req.params.id);
  res.json({ ok: true });
});

// DELETE /api/about/documents/:id
router.delete('/documents/:id', requireAdmin, (req, res) => {
  const db = getDB();
  db.prepare('DELETE FROM about_documents WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
