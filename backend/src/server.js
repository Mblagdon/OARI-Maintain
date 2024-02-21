/**
 * server.js
 *
 * The entry point for the Node.js server application. This file sets up the Express application,
 * applies necessary middlewares, and defines the routes by using the defined route handlers.
 * It also starts the server on a specified port and handles initial server setup such as
 * integrating CORS, JSON body parsing, and URL-encoded data handling. It is responsible for
 * orchestrating the application's backend services.
 */
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import cors from 'cors';
import equipmentRoutes from './routes/equipmentRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', equipmentRoutes);
app.use('/api/weather', weatherRoutes);

// Derive the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set static folder to the build folder in backend directory
app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
