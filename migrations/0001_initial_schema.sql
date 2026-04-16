-- Admin users
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- News articles
CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  date TEXT,
  category TEXT NOT NULL DEFAULT 'Новости' CHECK(category IN ('Новости','Законодательство','Семинары')),
  excerpt TEXT,
  image_key TEXT,
  external_link TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Events (seminars/webinars listed on the events page)
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  year INTEGER NOT NULL,
  date TEXT NOT NULL,
  format TEXT NOT NULL CHECK(format IN ('ВКС','ОЧНО')),
  title TEXT NOT NULL,
  description TEXT,
  show_buy_button INTEGER DEFAULT 0,
  is_past INTEGER DEFAULT 0,
  is_free INTEGER DEFAULT 0,
  internal_link TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Event topics (one-to-many)
CREATE TABLE IF NOT EXISTS event_topics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Event documents (files stored in R2)
CREATE TABLE IF NOT EXISTS event_documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_key TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Homepage carousel seminars
CREATE TABLE IF NOT EXISTS carousel_seminars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tag TEXT NOT NULL CHECK(tag IN ('вебинар','семинар')),
  title TEXT NOT NULL,
  format TEXT NOT NULL,
  external_link TEXT,
  internal_link TEXT,
  year TEXT NOT NULL,
  image_key TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Webinar detail pages (replaces hardcoded WebinarDetail components)
CREATE TABLE IF NOT EXISTS webinar_pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  tag TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  format TEXT NOT NULL,
  date TEXT NOT NULL,
  price TEXT,
  is_free INTEGER DEFAULT 0,
  speakers TEXT,
  image_key TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Webinar topics (one-to-many)
CREATE TABLE IF NOT EXISTS webinar_topics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  webinar_page_id INTEGER NOT NULL REFERENCES webinar_pages(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Webinar documents (files stored in R2)
CREATE TABLE IF NOT EXISTS webinar_documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  webinar_page_id INTEGER NOT NULL REFERENCES webinar_pages(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_key TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_events_year ON events(year);
CREATE INDEX IF NOT EXISTS idx_event_topics_event_id ON event_topics(event_id);
CREATE INDEX IF NOT EXISTS idx_event_documents_event_id ON event_documents(event_id);
CREATE INDEX IF NOT EXISTS idx_webinar_topics_page_id ON webinar_topics(webinar_page_id);
CREATE INDEX IF NOT EXISTS idx_webinar_documents_page_id ON webinar_documents(webinar_page_id);
CREATE INDEX IF NOT EXISTS idx_news_sort ON news(sort_order);
CREATE INDEX IF NOT EXISTS idx_carousel_sort ON carousel_seminars(sort_order);
