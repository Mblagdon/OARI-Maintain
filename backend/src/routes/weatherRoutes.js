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
require('dotenv').config();

const router = express.Router();

router.get('/weather', async (req, res) => {
    const { location } = req.query;

    try {
        const weatherResponse = await axios.get(`http://api.weatherstack.com/current`, {
            params: {
                access_key: process.env.WEATHER_API_KEY, // Access key stored in .env
                query: location // Location from the frontend
            }
        });
        res.json(weatherResponse.data);
    } catch (error) {
        res.status(500).send('Error retrieving weather data');
    }
});

module.exports = router;
