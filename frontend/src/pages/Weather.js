/**
 * Weather.js
 *
 * This React component is responsible for rendering the weather page of the application.
 * It allows users to input a location and fetches the corresponding weather data using the
 * weather API. The component manages the input state for the location, handles the submission
 * of the form, and upon a successful API call, displays the weather information. It also handles
 * error states and provides appropriate user feedback.
 */

import React, {useState, useEffect, useCallback} from 'react';
import '../App.css';

function Weather() {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [equipmentList, setEquipmentList] = useState([]);
    const [selectedEquipmentId, setSelectedEquipmentId] = useState('');
    const [equipmentUsageMessage, setEquipmentUsageMessage] = useState('');
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

    const fetchEquipment = async () => {
        try {
            const response = await fetch('/api/equipment');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEquipmentList(data);
        } catch (error) {
            console.error('Error fetching equipment:', error);
        }
    };

    useEffect(() => {
        fetchEquipment();
    }, []);

    const checkEquipmentUsage = useCallback((equipmentId) => {
        const selectedEquipment = equipmentList.find(eq => eq.id.toString() === equipmentId);
        if (!weatherData || !selectedEquipment) {
            setEquipmentUsageMessage('');
            return;
        }

        const { max_temp, min_temp, max_wind_resistance } = selectedEquipment;
        const { temperature, wind_speed } = weatherData.current;

        if (temperature > max_temp || temperature < min_temp) {
            setEquipmentUsageMessage('Temperature is out of operational range for this equipment.');
        } else if (wind_speed > max_wind_resistance) {
            setEquipmentUsageMessage('Wind speed is too high for this equipment.');
        } else {
            setEquipmentUsageMessage('Equipment can be used in current conditions.');
        }
    }, [weatherData, equipmentList]);

    useEffect(() => {
        if (selectedEquipmentId) {
            checkEquipmentUsage(selectedEquipmentId);
        }
    }, [selectedEquipmentId, checkEquipmentUsage]);

    return (
        <div className="weather-container">
            <div className="weather-section">
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
            </div>
            <div className="equipment-section">
                <select value={selectedEquipmentId} onChange={e => setSelectedEquipmentId(e.target.value)}>
                    <option value="">Select Equipment</option>
                    {equipmentList.map(equipment => (
                        <option key={equipment.id} value={equipment.id}>
                            {equipment.equipment_name}
                        </option>
                    ))}
                </select>
                <button onClick={() => checkEquipmentUsage(selectedEquipmentId)}>Check Equipment Usage</button>
                {equipmentUsageMessage && <p>{equipmentUsageMessage}</p>}
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default Weather;
