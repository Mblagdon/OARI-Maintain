/**
 * Weather api plan needs to be upgraded in able to pull historic weather data(anything other than current data)
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CheckinForm({ onCheckinSuccess }) {
    const [checkedOutEquipment, setCheckedOutEquipment] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState('');
    const [checkinDate, setCheckinDate] = useState('');
    const [usageDuration, setUsageDuration] = useState('');
    const [comments, setComments] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null); // Use this state to store fetched weather data

    useEffect(() => {
        const fetchCheckedOutEquipment = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/checkedout-equipment');
                if (!response.ok) {
                    throw new Error('Could not fetch checked out equipment');
                }
                const data = await response.json();
                setCheckedOutEquipment(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchCheckedOutEquipment();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedEquipment || !checkinDate) {
            alert('Please select equipment and a check-in date.');
            return;
        }

        // Fetch weather data only if location is provided
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
            onCheckinSuccess(); // Refresh the currently checked out equipment list
        } catch (error) {
            console.error('Check-in error:', error);
            alert('Failed to check in equipment');
        } finally {
            setIsLoading(false);
        }
    };

    // Function to reset form fields after successful check-in
    const resetFormFields = () => {
        setSelectedEquipment('');
        setCheckinDate('');
        setUsageDuration('');
        setComments('');
        setLocation('');
        setWeatherData(null); // Reset weather data state
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            {/* Select Equipment Dropdown */}
            <label>
                Equipment:
                <select
                    value={selectedEquipment}
                    onChange={e => setSelectedEquipment(e.target.value)}
                    disabled={isLoading}
                >
                    <option value="">Select Equipment</option>
                    {checkedOutEquipment.map(item => (
                        <option key={item.id} value={item.equipment_id}>
                            {item.equipment_name}
                        </option>
                    ))}
                </select>
            </label>

            {/* Usage Duration Input */}
            <label>
                Usage Duration (minutes):
                <input
                    type="number"
                    value={usageDuration}
                    onChange={e => setUsageDuration(e.target.value)}
                    disabled={isLoading}
                />
            </label>

            {/* Check-in Date Input */}
            <label>
                Check-in Date:
                <input
                    type="datetime-local"
                    value={checkinDate}
                    onChange={e => setCheckinDate(e.target.value)}
                    disabled={isLoading}
                />
            </label>

            {/* Comments Input */}
            <label>
                Comments:
                <textarea
                    value={comments}
                    onChange={e => setComments(e.target.value)}
                    disabled={isLoading}
                />
            </label>

            {/* New Location Input */}
            <label>
                Location:
                <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    disabled={isLoading}
                    placeholder="Enter the location"
                />
            </label>

            {error && <p className="error-message">{error}</p>}
            <button type="submit" disabled={isLoading || !location}>
                Check In
            </button>
        </form>
    );
}

export default CheckinForm;
