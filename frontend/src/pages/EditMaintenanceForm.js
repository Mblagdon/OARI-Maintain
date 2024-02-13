/**
 * EditMaintenanceForm.js
 *
 * This component renders a form for editing maintenance records. It fetches the
 * maintenance data for a given task ID and allows the user to update and submit changes.
 * The form pre-fills with existing data, which can be altered and saved.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';

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
        <Container className="pt-4">
            <Row>
                <Col lg={8} className="mx-auto">
                    <Card>
                        <Card.Header>Edit Maintenance Details</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                {/* Equipment ID */}
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={4}>Equipment ID:</Form.Label>
                                    <Col sm={8}>
                                        <Form.Select name="equipment_id" value={maintenanceData.equipment_id || ''} onChange={handleChange}>
                                            {/* Map through your equipment options here */}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>

                                {/* Status */}
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={4}>Status:</Form.Label>
                                    <Col sm={8}>
                                        <Form.Select name="status" value={maintenanceData.status || ''} onChange={handleChange}>
                                            {/* Status options here */}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>

                                {/* Last Maintenance Date */}
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={4}>Last Maintenance Date:</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control type="date" name="last_maintenance_date" value={maintenanceData.last_maintenance_date || ''} onChange={handleChange} />
                                    </Col>
                                </Form.Group>

                                {/* Next Maintenance Date */}
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={4}>Next Maintenance Date:</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control type="date" name="next_maintenance_date" value={maintenanceData.next_maintenance_date || ''} onChange={handleChange} />
                                    </Col>
                                </Form.Group>

                                {/* Maintenance Frequency */}
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={4}>Maintenance Frequency:</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control type="text" name="maintenance_frequency" value={maintenanceData.maintenance_frequency || ''} onChange={handleChange} />
                                    </Col>
                                </Form.Group>

                                {/* Maintenance to be performed */}
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={4}>Maintenance to be Performed:</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control as="textarea" name="maintenance_to_be_performed" value={maintenanceData.maintenance_to_be_performed || ''} onChange={handleChange} />
                                    </Col>
                                </Form.Group>

                                {/* Update Button */}
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={{ span: 8, offset: 4 }}>
                                        <Button type="submit" className="btn btn-primary">
                                            Update Maintenance
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default EditMaintenanceForm;