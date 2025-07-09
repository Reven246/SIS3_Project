const express = require('express');
const router = express.Router();
const db = require('../db.js');

//GET 
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
  const { title, description, game, rank, region, creator} = req.body;

if (!title || !description || !game || !rank || !region) {
  return res.status(400).json({ error: 'All fields except creator are required.' });
}

  const query = 'INSERT INTO ads (title, description, game, rank, region, creator) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [title, description, game, rank, region, creator], (err, result) => {
    if (err) {
      console.error('Error inserting ad:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ message: 'Listing created', adId: result.insertId });
  });
});

// DELETE oglasi
router.delete('/:id', (req, res) => {
  const adId = req.params.id;

  const query = 'DELETE FROM ads WHERE id = ?';
  db.query(query, [adId], (err, result) => {
    if (err) {
      console.error('Error deleting ad:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    res.json({ message: 'Ad deleted' });
  });
});


//UPDATE oglasi
router.put('/:id', (req, res) => {

  const adId = req.params.id;
  const { title, description, game, rank, region } = req.body;

  if (!title || !description || !game || !rank || !region) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const query = `
    UPDATE ads
    SET title = ?, description = ?, game = ?, rank = ?, region = ?
    WHERE id = ?
  `;

  db.query(query, [title, description, game, rank, region, adId], (err, result) => {
    if (err) {
      console.error('Error updating ad:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    res.json({ message: 'Ad updated' });
  });
});


module.exports = router;
