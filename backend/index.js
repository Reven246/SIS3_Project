const express = require('express');
require('dotenv').config()
const db = require('./db.js')
const cors = require('cors');
const app = express();

const oglasiRoutes = require('./routes/oglasi.js')
const usersRoutes = require('./routes/users.js')

app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes)
app.use('/oglasi', oglasiRoutes)

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});



