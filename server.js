/// server.js

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';


// Since __dirname is not defined in ES modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session config
app.use(session({
  secret: process.env.SESSION_SECRET || 'yoursecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Import routes using ES modules syntax:
import projectRoutes from './src/routes/projectRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
// import reviewRoutes fromed './src/routes/reviewRoutes.js';

app.use('/', authRoutes);
app.use('/projects', projectRoutes);
// app.use('/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.render('home'); // Assumes you have views/home.ejs
});

// 404 Not Found
app.use((req, res) => {
  res.status(404).render('errors/400', { error: 'Page Not Found' });
});

// Centralized error handling
import errorHandler from './src/middleware/errorHandler.js';
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
