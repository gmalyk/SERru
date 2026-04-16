import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { requireAdmin } from '../auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.body.folder || 'images';
    cb(null, path.join(uploadsDir, folder));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uuid = crypto.randomUUID();
    cb(null, `${uuid}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB max
});

const router = Router();

// POST /api/admin/upload
router.post('/', requireAdmin, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  const folder = req.body.folder || 'images';
  const key = `${folder}/${req.file.filename}`;

  res.status(201).json({
    ok: true,
    key,
    url: `/api/files/${key}`,
    originalName: req.file.originalname
  });
});

export default router;
