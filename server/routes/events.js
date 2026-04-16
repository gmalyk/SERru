import { Router } from 'express';
import { getDB } from '../db.js';
import { requireAdmin } from '../auth.js';

const router = Router();

function enrichEvent(db, event) {
  const topics = db.prepare('SELECT * FROM event_topics WHERE event_id = ? ORDER BY sort_order ASC').all(event.id);
  const documents = db.prepare('SELECT * FROM event_documents WHERE event_id = ? ORDER BY sort_order ASC').all(event.id);
  return {
    ...event,
    topics: topics.map(t => t.topic),
    documents: documents.map(d => ({ name: d.name, file: `/api/files/${d.file_key}`, file_key: d.file_key }))
  };
}

// GET /api/events?year=2026
router.get('/', (req, res) => {
  const db = getDB();
  const year = req.query.year;

  let events;
  if (year) {
    events = db.prepare('SELECT * FROM events WHERE year = ? ORDER BY sort_order ASC').all(parseInt(year));
    return res.json(events.map(e => enrichEvent(db, e)));
  }

  events = db.prepare('SELECT * FROM events ORDER BY year DESC, sort_order ASC').all();
  const grouped = {};
  for (const event of events) {
    if (!grouped[event.year]) grouped[event.year] = [];
    grouped[event.year].push(enrichEvent(db, event));
  }
  res.json(grouped);
});

// GET /api/events/:id
router.get('/:id', (req, res) => {
  const db = getDB();
  const event = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
  if (!event) return res.status(404).json({ error: 'Not found' });
  res.json(enrichEvent(db, event));
});

// POST /api/events (admin)
router.post('/', requireAdmin, (req, res) => {
  const db = getDB();
  const { year, date, format, title, description, show_buy_button, is_past, is_free, internal_link, sort_order, topics, documents } = req.body;

  const result = db.prepare(
    `INSERT INTO events (year, date, format, title, description, show_buy_button, is_past, is_free, internal_link, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(year, date, format, title, description || null, show_buy_button ? 1 : 0, is_past ? 1 : 0, is_free ? 1 : 0, internal_link || null, sort_order || 0);

  const eventId = result.lastInsertRowid;

  if (topics && topics.length) {
    const stmt = db.prepare('INSERT INTO event_topics (event_id, topic, sort_order) VALUES (?, ?, ?)');
    for (let i = 0; i < topics.length; i++) {
      stmt.run(eventId, topics[i], i + 1);
    }
  }

  if (documents && documents.length) {
    const stmt = db.prepare('INSERT INTO event_documents (event_id, name, file_key, sort_order) VALUES (?, ?, ?, ?)');
    for (let i = 0; i < documents.length; i++) {
      stmt.run(eventId, documents[i].name, documents[i].file_key, i + 1);
    }
  }

  res.status(201).json({ ok: true, id: eventId });
});

// PUT /api/events/:id (admin)
router.put('/:id', requireAdmin, (req, res) => {
  const db = getDB();
  const { year, date, format, title, description, show_buy_button, is_past, is_free, internal_link, sort_order, topics, documents } = req.body;

  db.prepare(
    `UPDATE events SET year = ?, date = ?, format = ?, title = ?, description = ?, show_buy_button = ?, is_past = ?, is_free = ?, internal_link = ?, sort_order = ?, updated_at = datetime('now')
     WHERE id = ?`
  ).run(year, date, format, title, description || null, show_buy_button ? 1 : 0, is_past ? 1 : 0, is_free ? 1 : 0, internal_link || null, sort_order || 0, req.params.id);

  if (topics !== undefined) {
    db.prepare('DELETE FROM event_topics WHERE event_id = ?').run(req.params.id);
    if (topics.length) {
      const stmt = db.prepare('INSERT INTO event_topics (event_id, topic, sort_order) VALUES (?, ?, ?)');
      for (let i = 0; i < topics.length; i++) {
        stmt.run(req.params.id, topics[i], i + 1);
      }
    }
  }

  if (documents !== undefined) {
    db.prepare('DELETE FROM event_documents WHERE event_id = ?').run(req.params.id);
    if (documents.length) {
      const stmt = db.prepare('INSERT INTO event_documents (event_id, name, file_key, sort_order) VALUES (?, ?, ?, ?)');
      for (let i = 0; i < documents.length; i++) {
        stmt.run(req.params.id, documents[i].name, documents[i].file_key, i + 1);
      }
    }
  }

  res.json({ ok: true });
});

// DELETE /api/events/:id (admin)
router.delete('/:id', requireAdmin, (req, res) => {
  const db = getDB();
  db.prepare('DELETE FROM events WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
