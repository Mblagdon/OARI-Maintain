import React, { useState, useEffect } from 'react';
import '../App.css';

function CheckedOutHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch('/api/checkedout-history');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHistory(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchHistory();
    }, []);

    const formatWeatherData = (weatherData) => {
        if (!weatherData) return 'Weather data unavailable';

        // Parse the weather data if it's a string
        const data = typeof weatherData === 'string' ? JSON.parse(weatherData) : weatherData;

        // Create JSX elements for each piece of weather data
        const weatherDetails = [
            <div key="temp"><strong>Temperature:</strong> {data.current.temperature}°C</div>,
            <div key="cond"><strong>Conditions:</strong> {data.current.weather_descriptions.join(', ')}</div>,
            <div key="wind"><strong>Wind:</strong> {data.current.wind_speed} km/h {data.current.wind_dir}</div>,
            <div key="pressure"><strong>Pressure:</strong> {data.current.pressure} mb</div>,
            <div key="precip"><strong>Precipitation:</strong> {data.current.precip} mm</div>,
            <div key="humidity"><strong>Humidity:</strong> {data.current.humidity}%</div>,
            <div key="cloud"><strong>Cloud Cover:</strong> {data.current.cloudcover}%</div>,
            <div key="feelslike"><strong>Feels Like:</strong> {data.current.feelslike}°C</div>,
            <div key="uvindex"><strong>UV Index:</strong> {data.current.uv_index}</div>,
            <div key="visibility"><strong>Visibility:</strong> {data.current.visibility} km</div>,
        ];

        return (
            <div className="weather-details">
                {weatherDetails}
                <div className="weather-icons">
                    {data.current.weather_icons.map((icon, index) => (
                        <img key={index} src={icon} alt="Weather icon" className="weather-icon" />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="checked-out-history-container">
            <h2 className="checked-out-history-header">Previously Checked Out Equipment</h2>
            <table className="checked-out-history-table">
                <thead>
                <tr>
                    <th>Equipment Name</th>
                    <th>Checkout Date</th>
                    <th>Check-in Date</th>
                    <th>Usage Duration (min)</th>
                    <th>Location Used</th>
                    <th>Comments</th>
                    <th>Weather</th>
                </tr>
                </thead>
                <tbody>
                {history.map(item => (
                    <tr key={item.id}>
                        <td>{item.equipment_name}</td>
                        <td>{new Date(item.checkout_date).toLocaleString()}</td>
                        <td>{new Date(item.checkin_date).toLocaleString()}</td>
                        <td>{item.usage_duration}</td>
                        <td>{item.location}</td>
                        <td>{item.comments}</td>
                        <td className="weather-cell">{formatWeatherData(item.weather_data)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CheckedOutHistory;
