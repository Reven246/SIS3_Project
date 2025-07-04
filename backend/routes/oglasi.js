const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.get('/', (req, res) => {
  db.query('SELECT * FROM ads', (err, results) => {
    if (err) {
      console.error('Error fetching oglas:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// POST /oglasi 
router.post('/', (req, res) => {
  const { title, description, game, rank, region, creator } = req.body;

if (!title || !description || !game || !rank || !region) {
  return res.status(400).json({ error: 'All fields except creator are required.' });
}

  const query = 'INSERT INTO ads (title, description, game, rank, region, creator) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [title, description, game, rank, region, creator || 'guest'], (err, result) => {
    if (err) {
      console.error('Error inserting ad:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ message: 'Listing created', adId: result.insertId });
  });
});


module.exports = router;
