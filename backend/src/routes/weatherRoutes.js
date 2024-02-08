/**
 * weatherRoutes.js
 *
 * This module sets up the route for handling API calls to fetch weather data.
 * It defines a single route, '/weather', which makes a GET request to the weatherstack API
 * to retrieve current weather conditions based on the provided location query parameter.
 * The route handler uses axios to make the HTTP request and sends the weather data back
 * to the client or handles any errors that occur during the request.
 */

const express = require('express');
const axios = require('axios');
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

//Use same method for historic but replace .com/current with correct api end, e.g. .com/historic

module.exports = router;


