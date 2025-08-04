const express = require('express');
require('dotenv').config();
const path = require('path');
const db = require('./db.js');
const cors = require('cors');

const app = express();

const oglasiRoutes = require('./routes/oglasi.js');
const usersRoutes = require('./routes/users.js');

app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/oglasi', oglasiRoutes);

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
