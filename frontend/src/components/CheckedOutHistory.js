import React, { useState, useEffect } from 'react';
import '../App.css';

function CheckedOutHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Fetch the history when the component mounts
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

    return (
        <div className="checked-out-history-container">
            <h2>Previously Checked Out Equipment</h2>
            <table>
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
                        <td>{item.weather_data}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CheckedOutHistory;
