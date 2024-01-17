/**
 * server.js
 *
 * The entry point for the Node.js server application. This file sets up the Express application,
 * applies necessary middlewares, and defines the routes by using the defined route handlers.
 * It also starts the server on a specified port and handles initial server setup such as
 * integrating CORS, JSON body parsing, and URL-encoded data handling. It is responsible for
 * orchestrating the application's backend services.
 */

const express = require('express');
const cors = require('cors');
const app = express();
const equipmentRoutes = require('./routes/equipmentRoutes');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', equipmentRoutes);

// Start the server
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

