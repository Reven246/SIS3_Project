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
    console.log('✅ Connected to DB!');

    // Define the data to insert into the 'ads' table
    const adData = {
      title: 'Sample Ad Title',
      description: 'This is a sample description for the ad.',
      game: 'Valorant',
      rank: 'Platinum',
      region: 'NA',
      creator: 'testuser',
    };

    // Insert data into the 'ads' table
    const query = `
      INSERT INTO ads (title, description, game, rank, region, creator) 
      VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(query, 
      [adData.title, adData.description, adData.game, adData.rank, adData.region, adData.creator], 
      (err, result) => {
        if (err) {
          console.error('❌ Query failed:', err.message);
        } else {
          console.log('✅ Ad inserted successfully:', result);
        }
        connection.release(); // Always release the connection when done
      }
    );
  }
});
