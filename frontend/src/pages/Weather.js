/**
 * Weather.js
 *
 * This React component is responsible for rendering the weather page of the application.
 * It allows users to input a location and fetches the corresponding weather data using the
 * weather API. The component manages the input state for the location, handles the submission
 * of the form, and upon a successful API call, displays the weather information. It also handles
 * error states and provides appropriate user feedback.
 *
 * The historical weather code is implemented, but currently commented out until the weatherstack api plan is upgraded.
 */

import React, {useState, useEffect, useCallback} from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Image } from 'react-bootstrap';
import '../pages/CSS/Weather.css';

function Weather() {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    // State for historical weather data
    // const [historicalWeatherData, setHistoricalWeatherData] = useState(null);
    // State for selecting a date
    // const [date, setDate] = useState('');
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

    // Function to fetch historical weather data
    // const fetchHistoricalWeather = async () => {
    //     if (!date) {
    //         alert("Please select a date.");
    //         return;
    //     }
    //
    //     try {
    //         const response = await fetch(`/api/weather/historical?query=${encodeURIComponent(location)}&historical_date=${date}`);
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const data = await response.json();
    //         setHistoricalWeatherData(data);
    //         setError(''); // Clear any previous errors
    //     } catch (error) {
    //         setError(error.message);
    //         setHistoricalWeatherData(null); // Clear previous historical weather data
    //     }
    // };

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

        let messages = [];

        if (max_temp !== null && temperature > max_temp) {
            messages.push(`Temperature is above the operational range (${max_temp}°C).`);
        } else if (min_temp !== null && temperature < min_temp) {
            messages.push(`Temperature is below the operational range (${min_temp}°C).`);
        }

        if (max_wind_resistance !== null && wind_speed > max_wind_resistance) {
            messages.push(`Wind speed is above the operational range (${max_wind_resistance} km/h).`);
        }

        // Messages for null values
        if (max_temp === null || min_temp === null) {
            messages.push("The database does not have a temp range for this piece of equipment, please refer to the owner's manual for exact specifications.");
        }

        if (max_wind_resistance === null) {
            messages.push("The database does not have wind resistance data for this piece of equipment, please refer to the owner's manual for exact specifications.");
        }

        // Set the appropriate message or default to equipment being usable
        setEquipmentUsageMessage(messages.length > 0 ? messages.join(' ') : 'Equipment can be used in current conditions.');
    }, [weatherData, equipmentList]);

    useEffect(() => {
        if (selectedEquipmentId) {
            checkEquipmentUsage(selectedEquipmentId);
        }
    }, [selectedEquipmentId, checkEquipmentUsage]);

    return (
        <Container className="pt-4">
            <Row>
                <Col md={6}>
                    <Card className="equal-height-card">
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Enter Location"
                                />
                            </Form.Group>
                            <Button onClick={fetchWeather}>Get Weather</Button>
                            {/* Date selection input for historical weather
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    placeholder="Select Date"
                                />
                            </Form.Group>
                            <Button onClick={fetchHistoricalWeather}>Get Historical Weather</Button>
                            */}
                            {weatherData && (
                                <div className="mt-3">
                                    <Card.Title>Weather in {weatherData.location.name}</Card.Title>
                                    <Card.Text><strong>Temperature:</strong> {weatherData.current.temperature}°C</Card.Text>
                                    <Card.Text><strong>Weather Conditions:</strong> {weatherData.current.weather_descriptions.join(', ')}</Card.Text>
                                    <Card.Text><strong>Wind Speed:</strong> {weatherData.current.wind_speed} km/h</Card.Text>
                                    <Card.Text><strong>Wind Direction:</strong> {weatherData.current.wind_dir}</Card.Text>
                                    <Card.Text><strong>Pressure:</strong> {weatherData.current.pressure} mb</Card.Text>
                                    <Card.Text><strong>Precipitation:</strong> {weatherData.current.precip} mm</Card.Text>
                                    <Card.Text><strong>Humidity:</strong> {weatherData.current.humidity}%</Card.Text>
                                    <Card.Text><strong>Cloud Cover:</strong> {weatherData.current.cloudcover}%</Card.Text>
                                    <Card.Text><strong>Feels Like:</strong> {weatherData.current.feelslike}°C</Card.Text>
                                    <Card.Text><strong>UV Index:</strong> {weatherData.current.uv_index}</Card.Text>
                                    <Card.Text><strong>Visibility:</strong> {weatherData.current.visibility} km</Card.Text>
                                    {weatherData.current.weather_icons.map((icon, index) => (
                                        <Image key={index} src={icon} alt="Weather icon" thumbnail />
                                    ))}
                                </div>
                            )}
                            {/* Display historical weather data if available
                            {historicalWeatherData && (
                                <div className="mt-3">
                                    <Card.Title>Historical Weather in {historicalWeatherData.location.name} for {date}</Card.Title>
                                    {/* Similar display for historical weather data as for current weather data
                                </div>
                            )}
                            */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="equal-height-card">
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Select value={selectedEquipmentId} onChange={e => setSelectedEquipmentId(e.target.value)}>
                                    <option value="">Select Equipment</option>
                                    {equipmentList.map(equipment => (
                                        <option key={equipment.id} value={equipment.id}>
                                            {equipment.equipment_name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Button onClick={() => checkEquipmentUsage(selectedEquipmentId)}>Check Equipment Usage</Button>
                            {equipmentUsageMessage && <Card.Text className="mt-3">{equipmentUsageMessage}</Card.Text>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Container>
    );
}

export default Weather;
