import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditMaintenanceForm() {
    const [maintenanceData, setMaintenanceData] = useState({});
    const [error, setError] = useState('');
    const { taskId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMaintenanceData = async () => {
            try {
                const response = await fetch(`/api/maintenance/${taskId}`); // Use taskId
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                setMaintenanceData({
                    ...data,
                    last_maintenance_date: data.last_maintenance_date.split('T')[0], // assuming the date comes in ISO format
                    next_maintenance_date: data.next_maintenance_date.split('T')[0],
                });
            } catch (error) {
                console.error('Error fetching maintenance data:', error);
                setError(error.message);
            }
        };

        fetchMaintenanceData();
    }, [taskId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMaintenanceData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

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
                    <input
                        type="number"
                        name="equipment_id"
                        value={maintenanceData.equipment_id || ''}
                        onChange={handleChange}
                        className="form-input"
                        readOnly // Assuming equipment ID should not be editable
                    />
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

                {/* Submit Button */}
                <div className="form-group">
                    <button type="submit" className="submit-button">Update Maintenance</button>
                </div>
            </form>
        </div>
    );
}

export default EditMaintenanceForm;
