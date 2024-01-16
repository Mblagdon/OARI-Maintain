import React, { useState } from 'react';
import '../App.css';

function AddMaintenance() {
    const [maintenanceData, setMaintenanceData] = useState({
        equipment_id: '',
        status: '',
        last_maintenance_date: '',
        next_maintenance_date: '',
        maintenance_frequency: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMaintenanceData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add front-end validation if needed

        fetch('/api/maintenance', { // Adjust the endpoint as needed
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(maintenanceData)
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                // Handle success, such as showing a message or redirecting
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle errors, such as displaying a message to the user
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form-style">
                <div className="form-group">
                    <label className="form-label">Equipment ID:</label>
                    <input
                        type="number"
                        name="equipment_id"
                        value={maintenanceData.equipment_id}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Status:</label>
                    <input
                        type="text"
                        name="status"
                        value={maintenanceData.status}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Last Maintenance Date:</label>
                    <input
                        type="date"
                        name="last_maintenance_date"
                        value={maintenanceData.last_maintenance_date}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Next Maintenance Date:</label>
                    <input
                        type="date"
                        name="next_maintenance_date"
                        value={maintenanceData.next_maintenance_date}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group
">
                    <label className="form-label">Maintenance Frequency:</label>
                    <input
                        type="text"
                        name="maintenance_frequency"
                        value={maintenanceData.maintenance_frequency}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="submit-button">Add Maintenance</button>
                </div>
            </form>
        </div>
    );
}

export default AddMaintenance;