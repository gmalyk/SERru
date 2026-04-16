import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDB } from './db.js';
import authRoutes from './routes/auth.js';
import newsRoutes from './routes/news.js';
import eventsRoutes from './routes/events.js';
import carouselRoutes from './routes/carousel.js';
import webinarsRoutes from './routes/webinars.js';
import uploadRoutes from './routes/upload.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
initDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Serve uploaded files
app.use('/api/files', express.static(path.join(__dirname, '..', 'uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/carousel-seminars', carouselRoutes);
app.use('/api/webinars', webinarsRoutes);
app.use('/api/admin/upload', uploadRoutes);

// Serve static frontend (production)
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// SPA fallback — serve index.html for all non-API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
