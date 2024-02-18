const mysql2 = require('mysql2');
require('dotenv').config();

const dbConnection = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to database');
  }
});

process.on('SIGINT', () => {
    dbConnection.end();
    process.exit();
});

module.exports = dbConnection;
