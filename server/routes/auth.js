import { Router } from 'express';
import { getDB } from '../db.js';
import { verifyPassword, signToken, setAuthCookie, clearAuthCookie, getTokenFromRequest, verifyToken } from '../auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const db = getDB();
  const admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(email);
  if (!admin || !verifyPassword(password, admin.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = signToken({ id: admin.id, email: admin.email });
  setAuthCookie(res, token);
  res.json({ ok: true, email: admin.email });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ authenticated: false });
  }
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ authenticated: false });
  }
  res.json({ authenticated: true, email: payload.email });
});

export default router;
