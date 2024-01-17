/**
 * database.js
 *
 * This file sets up the connection to the MySQL database using the mysql2 package.
 * It exports a connection object that can be used throughout the application to interact
 * with the database. This file handles the direct connection logic including connecting
 * with the database using credentials and configuration from environment variables.
 */

require('dotenv').config();

const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Connect to the database
dbConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to database with ID: ' + dbConnection.threadId);
});


module.exports = dbConnection;


