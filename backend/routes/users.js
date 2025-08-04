const express = require('express');
const router = express.Router();
const db = require('../db.js');

// Register
router.post('/register', (req, res) => {
  const { username, password, game_tag } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required.' });
  }

  const tag = game_tag || null;

  const query = 'INSERT INTO accounts (username, password, game_tag) VALUES (?, ?, ?)';
  db.query(query, [username, password, tag], (err, result) => {
    if (err) {
      console.error('Error registering:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'User registered' });
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM accounts WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful', user: results[0] });
  });
});

module.exports = router;