const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.get('/', (req, res) => {
  db.query('SELECT * FROM oglas', (err, results) => {
    if (err) {
      console.error('Error fetching oglas:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// POST /oglasi 
router.post('/', (req, res) => {
  const { title, description } = req.body;

  console.log('Received new ad:', title, description);

  if (!title || !description) {
    return res.status(400).json({ error: 'You need to set the title and the description.' });
  }

  const query = 'INSERT INTO oglas (title, description) VALUES (?, ?)';
  db.query(query, [title, description], (err, result) => {
    if (err) {
      console.error('Error inserting ad:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ message: 'Listing created', adId: result.insertId });
  });
});


module.exports = router;
