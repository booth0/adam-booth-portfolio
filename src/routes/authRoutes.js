// src/routes/authRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
const router = express.Router();

// GET login page
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// POST login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await user.validatePassword(password))) {
    return res.status(401).render('auth/login', { error: 'Invalid credentials' });
  }

  req.session.user = { id: user._id, username: user.username };
  res.redirect('/admin');
});

// GET logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

export default router;
