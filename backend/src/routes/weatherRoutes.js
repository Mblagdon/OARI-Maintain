/**
 * weatherRoutes.js
 *
 * This module sets up the route for handling API calls to fetch weather data.
 * It defines a single route, '/weather', which makes a GET request to the weatherstack API
 * to retrieve current weather conditions based on the provided location query parameter.
 * The route handler uses axios to make the HTTP request and sends the weather data back
 * to the client or handles any errors that occur during the request.
 */


import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const router = express.Router();

// Endpoint to get current weather
router.get('/', async (req, res) => {
    try {
        const { query } = req.query; // Get location from query parameter
        const weatherApiUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${query}`;

        const weatherResponse = await axios.get(weatherApiUrl);
        res.json(weatherResponse.data);
    } catch (error) {
        console.error('Error in fetching weather:', error);
        res.status(500).json({ message: 'Error fetching weather data', error: error.message });
    }
});

// Use the same method for historic but replace .com/current with the correct API endpoint, e.g., .com/historic
// Example of how historic weather would look, only small changes, note this has not been tested due to the weather plan
// currently on, but should work as expected
/**
 * router.get('/historical', async (req, res) => {
 *     try {
 *         const { query, historical_date } = req.query; // Get location and historical date from query parameters
 *         const weatherApiUrl = `http://api.weatherstack.com/historical?access_key=${process.env.WEATHER_API_KEY}&query=${query}&historical_date=${historical_date}`;
 *
 *         const weatherResponse = await axios.get(weatherApiUrl);
 *         res.json(weatherResponse.data);
 *     } catch (error) {
 *         console.error('Error in fetching historical weather:', error);
 *         res.status(500).json({ message: 'Error fetching historical weather data', error: error.message });
 *     }
 * });
 */
export default router;
