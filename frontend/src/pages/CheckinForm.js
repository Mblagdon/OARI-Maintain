/**
 * CheckinForm.js
 *
 * This component provides a form for users to check in equipment that they have used. It includes
 * inputs for specifying the check-in date, usage duration, comments about the usage, and the location
 * where the equipment was used. Additionally, it integrates with a weather API to fetch and display
 * weather data based on the provided location.
 *
 * Weather api plan needs to be upgraded in able to pull historic weather data(anything other than current data)
 */

import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../pages/CSS/CheckinForm.css';

function CheckinForm({ onCheckinSuccess }) {
    // State hooks for various pieces of form data
    const [checkedOutEquipment, setCheckedOutEquipment] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState('');
    const [checkinDate, setCheckinDate] = useState('');
    const [usageDuration, setUsageDuration] = useState('');
    const [comments, setComments] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null); // Use this state to store fetched weather data

    // Effect hook to fetch checked-out equipment data on component mount
    useEffect(() => {
        // Function to fetch checked-out equipment from the server
        const fetchCheckedOutEquipment = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/checkedout-equipment');
                if (!response.ok) {
                    throw new Error('Could not fetch checked out equipment');
                }
                const data = await response.json();

                // Now include asset_number in the modifiedData
                const modifiedData = data.map(item => ({
                    ...item,
                    displayText: `${item.equipment_name} (${item.asset_number})` // Add display text here
                }));
                setCheckedOutEquipment(modifiedData); // Set the modified data with asset_number
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchCheckedOutEquipment();
    }, []);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        // Prevent default form submission behavior
        e.preventDefault();

        if (!selectedEquipment || !checkinDate) {
            alert('Please select equipment and a check-in date.');
            return;
        }
        // Check required fields and fetch weather data if location is provided
        if (location) {
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/weather?query=${encodeURIComponent(location)}`);
                const fetchedWeatherData = response.data;
                setWeatherData(fetchedWeatherData); // Store fetched weather data in state
                // Proceed with check-in process using fetched weather data
                await checkInEquipment(fetchedWeatherData);
            } catch (error) {
                console.error('Failed to fetch weather data:', error);
                setError('Failed to fetch weather data. Please try again.');
                setIsLoading(false);
                return;
            }
        } else {
            setError('Location is required to fetch weather data.');
            return;
        }
    };

    // Function to perform check-in with weather data
    const checkInEquipment = async (fetchedWeatherData) => {
        try {
            const response = await fetch('/api/checkin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    equipment_id: selectedEquipment,
                    checkin_date: checkinDate,
                    usage_duration: usageDuration,
                    comments: comments,
                    weather: fetchedWeatherData, // Include fetched weather data in check-in submission
                    location: location,
                }),
            });

            if (!response.ok) {
                throw new Error('Check-in failed');
            }

            alert('Equipment checked in successfully');
            resetFormFields();
            console.log('Check-in successful, calling onCheckinSuccess');
            onCheckinSuccess();
        } catch (error) {
            console.error('Check-in error:', error);
            alert('Failed to check in equipment');
        } finally {
            setIsLoading(false);
        }
    };
    // Function to reset form fields after successful check-in
    const resetFormFields = () => {
        // Reset all form fields to their initial state
        setSelectedEquipment('');
        setCheckinDate('');
        setUsageDuration('');
        setComments('');
        setLocation('');
        setWeatherData(null);
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container className="mt-4">
            <Row>
                <Col md={9} className="mx-auto checkin-form">
                    <Form onSubmit={handleSubmit}>
                        <div className="custom-form-group">
                            <Form.Label>Equipment:</Form.Label>
                            <Form.Select
                                value={selectedEquipment}
                                onChange={e => setSelectedEquipment(e.target.value)}
                                disabled={isLoading}
                            >
                                <option value="">Select Equipment</option>
                                {checkedOutEquipment.map(item => (
                                    <option key={item.id} value={item.equipment_id} disabled={item.isDisabled}>
                                        {item.displayText}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>

                        <div className="custom-form-group">
                            <Form.Label>Usage Duration (minutes):</Form.Label>
                            <Form.Control
                                type="number"
                                value={usageDuration}
                                onChange={e => setUsageDuration(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="custom-form-group">
                            <Form.Label>Check-in Date:</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={checkinDate}
                                onChange={e => setCheckinDate(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="custom-form-group">
                            <Form.Label>Comments:</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={comments}
                                onChange={e => setComments(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="custom-form-group">
                            <Form.Label>Location:</Form.Label>
                            <Form.Control
                                type="text"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                disabled={isLoading}
                                placeholder="Enter the location"
                            />
                        </div>

                        <Button variant="primary" type="submit" className="custom-form-button" disabled={isLoading}>
                            {isLoading ? 'Checking In...' : 'Check In'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default CheckinForm;