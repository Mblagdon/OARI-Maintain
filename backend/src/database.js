const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
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


