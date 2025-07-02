const express = require('express');
require('dotenv').config()
const DB = require('./db.js')
const cors = require('cors');
const app = express();

const oglasiRoutes = require('./routes/oglasi.js')

app.use(cors());
app.use(express.json());

app.use('/oglasi', oglasiRoutes)

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});



