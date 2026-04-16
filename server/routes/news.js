import { Router } from 'express';
import { getDB } from '../db.js';
import { requireAdmin } from '../auth.js';

const router = Router();

function resolveImage(imageKey) {
  if (!imageKey) return null;
  return `/api/files/${imageKey}`;
}

// GET /api/news
router.get('/', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM news ORDER BY sort_order ASC').all();
  res.json(rows.map(r => ({ ...r, image: resolveImage(r.image_key) })));
});

// GET /api/news/:id
router.get('/:id', (req, res) => {
  const db = getDB();
  const row = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json({ ...row, image: resolveImage(row.image_key) });
});

// POST /api/news (admin)
router.post('/', requireAdmin, (req, res) => {
  const db = getDB();
  const { title, date, category, excerpt, image_key, external_link, sort_order } = req.body;
  const result = db.prepare(
    `INSERT INTO news (title, date, category, excerpt, image_key, external_link, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(title, date || '', category || 'Новости', excerpt || '', image_key || null, external_link || null, sort_order || 0);
  res.status(201).json({ ok: true, id: result.lastInsertRowid });
});

// PUT /api/news/:id (admin)
router.put('/:id', requireAdmin, (req, res) => {
  const db = getDB();
  const { title, date, category, excerpt, image_key, external_link, sort_order } = req.body;
  db.prepare(
    `UPDATE news SET title = ?, date = ?, category = ?, excerpt = ?, image_key = ?, external_link = ?, sort_order = ?, updated_at = datetime('now')
     WHERE id = ?`
  ).run(title, date || '', category, excerpt || '', image_key || null, external_link || null, sort_order || 0, req.params.id);
  res.json({ ok: true });
});

// DELETE /api/news/:id (admin)
router.delete('/:id', requireAdmin, (req, res) => {
  const db = getDB();
  db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
