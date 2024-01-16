import React, { useState, useEffect } from 'react';

function MaintenanceSchedule() {
    const [maintenanceTasks, setMaintenanceTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/maintenance') // Adjust the endpoint as needed
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json
                ();
            })
            .then(data => {
                setMaintenanceTasks(data); // Assuming your API returns an array of tasks
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching maintenance tasks:', err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading maintenance tasks...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Upcoming Maintenance Tasks</h2>
            <table>
                <thead>
                <tr>
                    <th>Equipment ID</th>
                    <th>Status</th>
                    <th>Last Maintenance Date</th>
                    <th>Next Maintenance Date</th>
                    <th>Maintenance Frequency</th>
                </tr>
                </thead>
                <tbody>
                {maintenanceTasks.map(task => (
                    <tr key={task.id}> {/* Make sure each task has a unique id */}
                    <td>{task.equipment_id}</td>
                    <td>{task.status}</td>
                    <td>{task.last_maintenance_date}</td>
                    <td>{task.next_maintenance_date}</td>
                    <td>{task.maintenance_frequency}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MaintenanceSchedule;
