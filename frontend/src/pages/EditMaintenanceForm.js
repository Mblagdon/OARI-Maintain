/**
 * EditMaintenanceForm.js
 *
 * This component renders a form for editing maintenance records. It fetches the
 * maintenance data for a given task ID and allows the user to update and submit changes.
 * The form pre-fills with existing data, which can be altered and saved.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditMaintenanceForm() {
    // State for maintaining the form data and errors
    const [maintenanceData, setMaintenanceData] = useState({});
    const [equipmentOptions, setEquipmentOptions] = useState([])
    const [error, setError] = useState('');
    // Accessing the taskId from the URL parameters
    const { taskId } = useParams();
    const navigate = useNavigate();

    // Fetch equipment and current maintenance data when the component mounts
    useEffect(() => {
        const fetchMaintenanceData = async () => {
            try {
                const responses = await Promise.all([
                    fetch(`/api/maintenance/${taskId}`),
                    fetch(`/api/equipment`)
                ]);
                if (!responses[0].ok) throw new Error('Failed to fetch maintenance data');
                if (!responses[1].ok) throw new Error('Failed to fetch equipment data');

                const maintenance = await responses[0].json();
                const equipment = await responses[1].json();

                setMaintenanceData({
                    ...maintenance,
                    last_maintenance_date: maintenance.last_maintenance_date.split('T')[0],
                    next_maintenance_date: maintenance.next_maintenance_date.split('T')[0],
                    maintenance_to_be_performed: maintenance.maintenance_to_be_performed || ''
                });
                setEquipmentOptions(equipment);
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
            }
        };

        fetchMaintenanceData();
    }, [taskId]);

    // Function to handle form value changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMaintenanceData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };
    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/maintenance/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(maintenanceData)
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                navigate('/maintenance');
            })
            .catch(error => setError(error.message));
    };

    return (
        <div className="form-container">
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="form-style">
                {/* Equipment ID */}
                <div className="form-group">
                    <label className="form-label">Equipment ID:</label>
                    <select
                        name="equipment_id"
                        value={maintenanceData.equipment_id || ''}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="">Select Equipment</option>
                        {equipmentOptions.map(option => (
                            <option key={option.id} value={option.id}>
                                {`${option.equipment_name} - ${option.asset_number || 'N/A'}`}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status */}
                <div className="form-group">
                    <label className="form-label">Status:</label>
                    <select
                        name="status"
                        value={maintenanceData.status || ''}
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

                {/* Last Maintenance Date */}
                <div className="form-group">
                    <label className="form-label">Last Maintenance Date:</label>
                    <input
                        type="date"
                        name="last_maintenance_date"
                        value={maintenanceData.last_maintenance_date || ''}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                {/* Next Maintenance Date */}
                <div className="form-group">
                    <label className="form-label">Next Maintenance Date:</label>
                    <input
                        type="date"
                        name="next_maintenance_date"
                        value={maintenanceData.next_maintenance_date || ''}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                {/* Maintenance Frequency */}
                <div className="form-group">
                    <label className="form-label">Maintenance Frequency:</label>
                    <input
                        type="text"
                        name="maintenance_frequency"
                        value={maintenanceData.maintenance_frequency}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                {/* Maintenance to be performed */}
                <div className="form-group">
                    <label className="form-label">Maintenance to be Performed:</label>
                    <textarea
                        name="maintenance_to_be_performed"
                        value={maintenanceData.maintenance_to_be_performed}
                        onChange={handleChange}
                        className="form-textarea"
                    />
                </div>

                {/* Submit Button */}
                <div className="form-group">
                    <button type="submit" className="submit-button">Update Maintenance</button>
                </div>
            </form>
        </div>
    );
}

export default EditMaintenanceForm;
