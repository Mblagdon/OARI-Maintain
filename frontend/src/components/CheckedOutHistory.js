/**
 * CheckedOutHistory.js
 *
 * A component that displays a list of previously checked out equipment. It fetches historical data
 * of equipment usage including checkout and check-in dates, usage duration, location, and comments.
 * It also integrates weather data to give context about the conditions during the equipment use.
 */

import React, { useState, useEffect } from 'react';
import { Container, Table, Card } from 'react-bootstrap';
import '../pages/CSS/CheckedOutHistory.css';

function CheckedOutHistory() {
    // State hook to store the history of checked-out equipment
    const [history, setHistory] = useState([]);

    // Effect hook to fetch history data on component mount
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

    // Function to format the weather data for display
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
        <Container className="mt-4">
            <Card>
                <Card.Header>Previously Checked Out Equipment</Card.Header>
                <Card.Body>
                    <div className="checked-out-history-table-container">
                        <Table striped bordered hover responsive>
                            <thead className="lightblue-header">
                            <tr>
                                <th>Equipment Name</th>
                                <th>Asset Number</th>
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
                                    <td>{item.asset_number}</td>
                                    <td>{new Date(item.checkout_date).toLocaleString()}</td>
                                    <td>{new Date(item.checkin_date).toLocaleString()}</td>
                                    <td>{item.usage_duration}</td>
                                    <td>{item.location}</td>
                                    <td>{item.comments}</td>
                                    <td className="weather-cell">{formatWeatherData(item.weather_data)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default CheckedOutHistory;
