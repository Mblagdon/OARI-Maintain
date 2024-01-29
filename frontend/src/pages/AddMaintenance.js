/**
 * AddMaintenance.js
 *
 * A component that provides a form for scheduling maintenance for equipment. Users can enter
 * maintenance details including dates, frequency, and status. When submitted, this information
 * is posted to the server and recorded in the maintenance management system.
 */

import React, { useState } from 'react';
import '../App.css';

function AddMaintenance() {
    const [maintenanceData, setMaintenanceData] = useState({
        type: '',
        equipment_id: '',
        status: '',
        last_maintenance_date: '',
        next_maintenance_date: '',
        maintenance_frequency: '',
        maintenance_to_be_performed: '',
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


        fetch('/api/maintenance', {
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
                // Reset the form here
                setMaintenanceData({
                    equipment_id: '',
                    status: '',
                    last_maintenance_date: '',
                    next_maintenance_date: '',
                    maintenance_frequency: '',
                    maintenance_to_be_performed: '',
                });
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
                    <select
                        name="status"
                        value={maintenanceData.status}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Overdue">Overdue</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Type:</label>
                    <select
                        name="type"
                        value={maintenanceData.type}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="">Select Type</option>
                        <option value="drone">Drone</option>
                        <option value="equipment">Equipment</option>
                        <option value="software">Software</option>
                    </select>
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
                    <label className="form-label">Maintenance to be Performed:</label>
                    <textarea
                        name="maintenance_to_be_performed"
                        value={maintenanceData.maintenance_to_be_performed}
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