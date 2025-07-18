// scripts/createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../src/models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const existing = await User.findOne({ username: 'admin' });
    if (existing) {
      console.log('Admin already exists.');
      return process.exit(0);
    }

    const hashed = await bcrypt.hash('your_secure_password', 12);
    await User.create({ username: 'admin', password: hashed });
    console.log('✅ Admin user created!');
    process.exit(0);
  })
  .catch(err => console.error('❌ Error:', err));
