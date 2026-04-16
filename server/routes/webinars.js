import { Router } from 'express';
import { getDB } from '../db.js';
import { requireAdmin } from '../auth.js';

const router = Router();

function enrichWebinar(db, webinar) {
  const topics = db.prepare('SELECT * FROM webinar_topics WHERE webinar_page_id = ? ORDER BY sort_order ASC').all(webinar.id);
  const documents = db.prepare('SELECT * FROM webinar_documents WHERE webinar_page_id = ? ORDER BY sort_order ASC').all(webinar.id);
  return {
    ...webinar,
    image: webinar.image_key ? `/api/files/${webinar.image_key}` : null,
    topics: topics.map(t => t.topic),
    documents: documents.map(d => ({ name: d.name, file: `/api/files/${d.file_key}`, file_key: d.file_key }))
  };
}

// GET /api/webinars
router.get('/', (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM webinar_pages ORDER BY id DESC').all();
  res.json(rows.map(r => ({ ...r, image: r.image_key ? `/api/files/${r.image_key}` : null })));
});

// GET /api/webinars/:slug
router.get('/:slug', (req, res) => {
  const db = getDB();
  const webinar = db.prepare('SELECT * FROM webinar_pages WHERE slug = ?').get(req.params.slug);
  if (!webinar) return res.status(404).json({ error: 'Not found' });
  res.json(enrichWebinar(db, webinar));
});

// POST /api/webinars (admin)
router.post('/', requireAdmin, (req, res) => {
  const db = getDB();
  const { slug, tag, title, subtitle, format, date, price, is_free, speakers, image_key, topics, documents } = req.body;

  const result = db.prepare(
    `INSERT INTO webinar_pages (slug, tag, title, subtitle, format, date, price, is_free, speakers, image_key)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(slug, tag, title, subtitle || null, format, date, price || null, is_free ? 1 : 0, speakers || null, image_key || null);

  const webinarId = result.lastInsertRowid;

  if (topics && topics.length) {
    const stmt = db.prepare('INSERT INTO webinar_topics (webinar_page_id, topic, sort_order) VALUES (?, ?, ?)');
    for (let i = 0; i < topics.length; i++) {
      stmt.run(webinarId, topics[i], i + 1);
    }
  }

  if (documents && documents.length) {
    const stmt = db.prepare('INSERT INTO webinar_documents (webinar_page_id, name, file_key, sort_order) VALUES (?, ?, ?, ?)');
    for (let i = 0; i < documents.length; i++) {
      stmt.run(webinarId, documents[i].name, documents[i].file_key, i + 1);
    }
  }

  res.status(201).json({ ok: true, id: webinarId });
});

// PUT /api/webinars/:slug (admin)
router.put('/:slug', requireAdmin, (req, res) => {
  const db = getDB();
  const webinar = db.prepare('SELECT id FROM webinar_pages WHERE slug = ?').get(req.params.slug);
  if (!webinar) return res.status(404).json({ error: 'Not found' });

  const { slug, tag, title, subtitle, format, date, price, is_free, speakers, image_key, topics, documents } = req.body;

  db.prepare(
    `UPDATE webinar_pages SET slug = ?, tag = ?, title = ?, subtitle = ?, format = ?, date = ?, price = ?, is_free = ?, speakers = ?, image_key = ?, updated_at = datetime('now')
     WHERE id = ?`
  ).run(slug || req.params.slug, tag, title, subtitle || null, format, date, price || null, is_free ? 1 : 0, speakers || null, image_key || null, webinar.id);

  if (topics !== undefined) {
    db.prepare('DELETE FROM webinar_topics WHERE webinar_page_id = ?').run(webinar.id);
    if (topics.length) {
      const stmt = db.prepare('INSERT INTO webinar_topics (webinar_page_id, topic, sort_order) VALUES (?, ?, ?)');
      for (let i = 0; i < topics.length; i++) {
        stmt.run(webinar.id, topics[i], i + 1);
      }
    }
  }

  if (documents !== undefined) {
    db.prepare('DELETE FROM webinar_documents WHERE webinar_page_id = ?').run(webinar.id);
    if (documents.length) {
      const stmt = db.prepare('INSERT INTO webinar_documents (webinar_page_id, name, file_key, sort_order) VALUES (?, ?, ?, ?)');
      for (let i = 0; i < documents.length; i++) {
        stmt.run(webinar.id, documents[i].name, documents[i].file_key, i + 1);
      }
    }
  }

  res.json({ ok: true });
});

// DELETE /api/webinars/:slug (admin)
router.delete('/:slug', requireAdmin, (req, res) => {
  const db = getDB();
  db.prepare('DELETE FROM webinar_pages WHERE slug = ?').run(req.params.slug);
  res.json({ ok: true });
});

export default router;
