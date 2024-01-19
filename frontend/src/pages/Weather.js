/**
 * Weather.js
 *
 * This React component is responsible for rendering the weather page of the application.
 * It allows users to input a location and fetches the corresponding weather data using the
 * weather API. The component manages the input state for the location, handles the submission
 * of the form, and upon a successful API call, displays the weather information. It also handles
 * error states and provides appropriate user feedback.
 */

import React, { useState } from 'react';

function Weather() {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const fetchWeather = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setWeatherData(data);
            setError('');
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        }
    };

    return (
        <div>
            <form onSubmit={fetchWeather}>
                <input type="text" value={location} onChange={handleLocationChange} placeholder="Enter location" />
                <button type="submit">Get Weather</button>
            </form>

            {error && <div>{error}</div>}
            {weatherData && (
                <div>
                    <h2>Weather in {weatherData.location.name}</h2>
                    <p>Temperature: {weatherData.current.temperature}°C</p>
                    <p>Wind Speed: {weatherData.current.wind_speed} km/h</p>
                    {/* Display additional weather details */}
                </div>
            )}
        </div>
    );
}

export default Weather;
