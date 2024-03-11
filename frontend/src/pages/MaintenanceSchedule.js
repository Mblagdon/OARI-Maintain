/**
 * MaintenanceSchedule.js
 *
 * Renders a comprehensive view of all scheduled maintenance activities. It fetches data from the server
 * and displays it in a list or table format, showing upcoming maintenance tasks. This component helps
 * users keep track of maintenance operations and their schedules.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import '../pages/CSS/MaintenanceSchedule.css';
import { useMsal } from '@azure/msal-react';

function MaintenanceSchedule() {
    const [maintenanceTasks, setMaintenanceTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { accounts } = useMsal(); // Use the useMsal hook to get accounts
    const user = accounts[0] || {}; // Assuming the first account is the logged-in user
    const userEmail = user.username;
    const allowedEmails = ['marcus_blagdon@hotmail.com']; // Define allowed emails for edit/delete
    const canEditOrDelete = allowedEmails.includes(userEmail);


    useEffect(() => {
        fetch('/api/maintenance')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
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
        if (canEditOrDelete) {
            navigate(`/edit-maintenance/${taskId}`);
        } else {
            alert("You do not have permission to edit this maintenance schedule.");
        }
    };

    const handleDelete = (taskId) => {
        if (canEditOrDelete) {
            if (window.confirm('Are you sure you want to delete this task?')) {
                fetch(`/api/maintenance/${taskId}`, { method: 'DELETE' })
                    .then(response => {
                        if (!response.ok) throw new Error('Network response was not ok');
                        setMaintenanceTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
                    })
                    .catch(error => console.error('Error:', error));
            }
        } else {
            alert("You do not have permission to delete this maintenance schedule.");
        }
    };

    if (loading) return <Alert variant="info">Loading maintenance tasks...</Alert>;
    if (error) return <Alert variant="danger">Error: {error}</Alert>;

    return (
        <div className="body-flex-container">
            <div className="content-wrapper">
                <Container className="pt-4">
                    <h2 className="maintenance-schedule-header">Upcoming Maintenance Tasks</h2>
                    <Table striped bordered hover responsive className="maintenance-table">
                        <thead className="table-header">
                        <tr>
                            <th>Equipment ID</th>
                            <th>Equipment Name</th>
                            <th>Asset Number</th>
                            <th>Status</th>
                            <th>Last Maintenance Date</th>
                            <th>Next Maintenance Date</th>
                            <th>Maintenance Frequency</th>
                            <th>Maintenance To Be Performed</th>
                            <th>Modify</th>
                        </tr>
                        </thead>
                        <tbody>
                        {maintenanceTasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.equipment_id}</td>
                                <td>{task.equipment_name}</td>
                                <td>{task.asset_number || 'N/A'}</td>
                                <td>{task.status}</td>
                                <td>{new Date(task.last_maintenance_date).toLocaleDateString()}</td>
                                <td>{new Date(task.next_maintenance_date).toLocaleDateString()}</td>
                                <td>{task.maintenance_frequency}</td>
                                <td>{task.maintenance_to_be_performed}</td>
                                <td>
                                    <Button
                                        variant="edit btn-edit"
                                        onClick={() => handleEdit(task.id)}
                                        className="me-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="delete btn-delete"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Container>
            </div>
            <footer className="footer-static">
                {/* Footer Content */}
            </footer>
        </div>
    );
}

export default MaintenanceSchedule;
