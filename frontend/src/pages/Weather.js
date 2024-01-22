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

    const fetchWeather = async () => {
        try {
            const response = await fetch(`/api/weather?query=${encodeURIComponent(location)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setWeatherData(data);
            setError(''); // Clear any previous errors
        } catch (error) {
            setError(error.message);
            setWeatherData(null); // Clear previous weather data
        }
    };

    return (
        <div>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter Location"
            />
            <button onClick={fetchWeather}>Get Weather</button>
            {weatherData && (
                <div>
                    <h2>Weather in {weatherData.location.name}</h2>
                    <p><strong>Temperature:</strong> {weatherData.current.temperature}°C</p>
                    <p><strong>Weather Conditions:</strong> {weatherData.current.weather_descriptions.join(', ')}</p>
                    <p><strong>Wind Speed:</strong> {weatherData.current.wind_speed} km/h</p>
                    <p><strong>Wind Direction:</strong> {weatherData.current.wind_dir}</p>
                    <p><strong>Pressure:</strong> {weatherData.current.pressure} mb</p>
                    <p><strong>Precipitation:</strong> {weatherData.current.precip} mm</p>
                    <p><strong>Humidity:</strong> {weatherData.current.humidity}%</p>
                    <p><strong>Cloud Cover:</strong> {weatherData.current.cloudcover}%</p>
                    <p><strong>Feels Like:</strong> {weatherData.current.feelslike}°C</p>
                    <p><strong>UV Index:</strong> {weatherData.current.uv_index}</p>
                    <p><strong>Visibility:</strong> {weatherData.current.visibility} km</p>
                    {weatherData.current.weather_icons.map((icon, index) => (
                        <img key={index} src={icon} alt="Weather icon" />
                    ))}
                </div>
            )}
            {error && <div>Error: {error}</div>}
        </div>
    );
}

export default Weather;


