// src/routes/projectRoutes.js
import express from 'express';
import { isLoggedIn } from '../middleware/auth.js';  // note the .js extension
const router = express.Router();

// Show all projects
router.get('/', async (req, res) => {
  // Show portfolio projects to public
  res.send('All projects page'); // placeholder
});

// Admin dashboard to manage projects
router.get('/admin', isLoggedIn, async (req, res) => {
  // Show admin controls
  res.send('Admin dashboard');
});

export default router;
