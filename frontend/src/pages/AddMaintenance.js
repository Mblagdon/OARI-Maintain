/**
 * AddMaintenance.js
 *
 * A component that provides a form for scheduling maintenance for equipment. Users can enter
 * maintenance details including dates, frequency, and status. When submitted, this information
 * is posted to the server and recorded in the maintenance management system.
 */

import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button, Alert, Card} from 'react-bootstrap';
import '../pages/CSS/AddMaintenance.css';
import { createCalendarEvent } from '../components/oauth/graphService';

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

    const [equipmentOptions, setEquipmentOptions] = useState([]);

    // Fetch equipment details when the component mounts
    useEffect(() => {
        // Fetch the equipment data when the component mounts
        fetch('/api/equipment')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setEquipmentOptions(data.map(equipment => ({
                    id: equipment.id,
                    name: equipment.equipment_name,
                    assetNumber: equipment.asset_number
                })));
            })
            .catch(error => {
                console.error('Error fetching equipment:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMaintenanceData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Fetch call to API for posting maintenance data
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
                // Reset the form here
                setMaintenanceData({
                    type: '',
                    equipment_id: '',
                    status: '',
                    last_maintenance_date: '',
                    next_maintenance_date: '',
                    maintenance_frequency: '',
                    maintenance_to_be_performed: '',
                });

                // Now create a calendar event using the newly added maintenance data
                return createCalendarEvent({
                    subject: `Maintenance for ${maintenanceData.equipment_id}`,
                    content: `Scheduled maintenance: ${maintenanceData.maintenance_to_be_performed}`,
                    startDateTime: new Date(maintenanceData.next_maintenance_date),
                    endDateTime: new Date(maintenanceData.next_maintenance_date), // Adjust if you have an end time
                    timeZone: "Newfoundland Standard Time"
                });
            })
            .then(() => {
                alert('Maintenance task added and scheduled in calendar.');
                // Additional logic after successful event creation
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle errors, such as displaying a message to the user
            });
    };
    return (
        <Container className="pt-4">
            <Row>
                <Col lg={8} className="mx-auto">
                    <Card>
                        <Card.Header>Add Maintenance Record</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                        {/* Equipment ID Selection */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Equipment ID</Form.Label>
                            <Col sm={9}>
                                <Form.Select name="equipment_id" value={maintenanceData.equipment_id} onChange={handleChange}>
                                    <option value="">Select Equipment</option>
                                    {equipmentOptions.map(option => (
                                        <option key={option.id} value={option.id}>
                                            {`${option.name} - ${option.assetNumber || 'No Asset Number'}`}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        {/* Status Selection */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Status</Form.Label>
                            <Col sm={9}>
                                <Form.Select name="status" value={maintenanceData.status} onChange={handleChange}>
                                    <option value="">Select Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Overdue">Overdue</option>
                                    <option value="Cancelled">Cancelled</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        {/* Type Selection */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Type</Form.Label>
                            <Col sm={9}>
                                <Form.Select name="type" value={maintenanceData.type} onChange={handleChange}>
                                    <option value="">Select Type</option>
                                    <option value="drone">Drone</option>
                                    <option value="equipment">Equipment</option>
                                    <option value="software">Software</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        {/* Last Maintenance Date */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Last Maintenance Date</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="date"
                                    name="last_maintenance_date"
                                    value={maintenanceData.last_maintenance_date}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        {/* Next Maintenance Date */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Next Maintenance Date</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="date"
                                    name="next_maintenance_date"
                                    value={maintenanceData.next_maintenance_date}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        {/* Maintenance Frequency */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Maintenance Frequency</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="maintenance_frequency"
                                    value={maintenanceData.maintenance_frequency}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        {/* Maintenance To Be Performed */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Maintenance to be Performed</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    as="textarea"
                                    name="maintenance_to_be_performed"
                                    value={maintenanceData.maintenance_to_be_performed}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        {/* Submit Button */}
                        <Row>
                            <Col className="text-center">
                                <Button variant="primary" type="submit">Add Maintenance</Button>
                            </Col>
                        </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AddMaintenance;