/**
 * MaintenanceSchedule.js
 *
 * Renders a comprehensive view of all scheduled maintenance activities. It fetches data from the server
 * and displays it in a list or table format, showing upcoming maintenance tasks. This component helps
 * users keep track of maintenance operations and their schedules.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function MaintenanceSchedule() {
    const [maintenanceTasks, setMaintenanceTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/maintenance')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                // Log the data to see if it includes `equipment_name`
                console.log(data);
                setMaintenanceTasks(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching maintenance tasks:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleEdit = (taskId) => {
        navigate(`/edit-maintenance/${taskId}`);
    };

    const handleDelete = (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            fetch(`/api/maintenance/${taskId}`, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    setMaintenanceTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
                })
                .catch(error => console.error('Error:', error));
        }
    };

    if (loading) return <div>Loading maintenance tasks...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="maintenance-schedule-container">
            <h2 className="maintenance-schedule-header">Upcoming Maintenance Tasks</h2>
            <table className="maintenance-schedule-table">
                <thead>
                <tr>
                    <th>Equipment ID</th>
                    <th>Equipment Name</th>
                    <th>Status</th>
                    <th>Last Maintenance Date</th>
                    <th>Next Maintenance Date</th>
                    <th>Maintenance Frequency</th>
                    <th>Modify</th>
                </tr>
                </thead>
                <tbody>
                {maintenanceTasks.map(task => (
                    <tr key={task.id}>
                        <td>{task.equipment_id}</td>
                        <td>{task.equipment_name}</td>
                        <td>{task.status}</td>
                        <td>{new Date(task.last_maintenance_date).toLocaleDateString()}</td>
                        <td>{new Date(task.next_maintenance_date).toLocaleDateString()}</td>
                        <td>{task.maintenance_frequency}</td>
                        <td>
                            <button onClick={() => handleEdit(task.id)}>Edit</button>
                            <button onClick={() => handleDelete(task.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MaintenanceSchedule;

