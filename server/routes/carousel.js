import { Router } from 'express';
import { getDB } from '../db.js';
import { requireAdmin } from '../auth.js';

const router = Router();

// GET /api/carousel-seminars
router.get('/', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM carousel_seminars ORDER BY sort_order ASC').all();
  res.json(rows.map(r => ({
    ...r,
    image: r.image_key ? `/api/files/${r.image_key}` : null
  })));
});

// POST /api/carousel-seminars (admin)
router.post('/', requireAdmin, (req, res) => {
  const db = getDB();
  const { tag, title, format, external_link, internal_link, year, image_key, sort_order } = req.body;
  const result = db.prepare(
    `INSERT INTO carousel_seminars (tag, title, format, external_link, internal_link, year, image_key, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(tag, title, format, external_link || null, internal_link || null, year, image_key || null, sort_order || 0);
  res.status(201).json({ ok: true, id: result.lastInsertRowid });
});

// PUT /api/carousel-seminars/:id (admin)
router.put('/:id', requireAdmin, (req, res) => {
  const db = getDB();
  const { tag, title, format, external_link, internal_link, year, image_key, sort_order } = req.body;
  db.prepare(
    `UPDATE carousel_seminars SET tag = ?, title = ?, format = ?, external_link = ?, internal_link = ?, year = ?, image_key = ?, sort_order = ?
     WHERE id = ?`
  ).run(tag, title, format, external_link || null, internal_link || null, year, image_key || null, sort_order || 0, req.params.id);
  res.json({ ok: true });
});

// DELETE /api/carousel-seminars/:id (admin)
router.delete('/:id', requireAdmin, (req, res) => {
  const db = getDB();
  db.prepare('DELETE FROM carousel_seminars WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
