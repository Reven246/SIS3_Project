const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

module.exports = pool;

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Connected to university DB!');
    connection.query('SELECT 1 + 1 AS result', (err, results) => {
      if (err) {
        console.error('❌ Query failed:', err.message);
      } else {
        console.log('✅ Test result:', results[0].result);
      }
      connection.release(); // always release the connection
    });
  }
});
