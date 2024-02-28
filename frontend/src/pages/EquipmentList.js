/**
 * EquipmentList.js
 *
 * This component fetches and displays a list of all equipment from the server. Each item in the list
 * is represented by an EquipmentItem component, allowing users to view basic information and select
 * an item to see more details. It is the main view for browsing through the catalog of equipment.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../components/EquipmentItem';
import '../pages/CSS/EquipmentList.css';

function EquipmentList() {
    const [equipment, setEquipment] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const fetchEquipment = () => {
            fetch('/api/equipment')
                .then(async response => {
                    // Try to get response body which may include error message from the server
                    const body = await response.text();
                    if (!response.ok) {
                        // If response is not okay, parse the text as JSON if possible, or use text directly
                        let errorMessage = "Error fetching equipment.";
                        try {
                            const parsed = JSON.parse(body);
                            errorMessage += ` Message: ${parsed.message || parsed.error || body}`;
                        } catch {
                            errorMessage += ` Message: ${body}`;
                        }
                        throw new Error(`Error: ${response.status} ${response.statusText}. ${errorMessage}`);
                    }
                    return JSON.parse(body);
                })
                .then(data => {
                    setEquipment(data);
                    setError(null);
                    setRetryCount(0);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                    setError(`Failed to load equipment: ${error.message}`);
                    if (retryCount < 3) {
                        setTimeout(() => {
                            setRetryCount(retryCount + 1);
                        }, 3000);
                    }
                });
        };

        fetchEquipment();
    }, [retryCount]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleEdit = (equipmentId) => {
        navigate(`/edit-equipment/${equipmentId}`);
    };

    const handleDelete = async (equipmentId) => {
        if (window.confirm('Are you sure you want to delete this equipment?')) {
            try {
                const response = await fetch(`/api/equipment/${equipmentId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Error deleting the equipment');
                }
                // Remove the deleted item from the state to update the UI
                setEquipment(equipment.filter(item => item.id !== equipmentId));
            } catch (error) {
                console.error('Failed to delete the equipment', error);
            }
        }
    };

    return (
        <Container className="pt-4">
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {equipment.map((item) => (
                    <Col key={item.id}>
                        <Card className="h-100 d-flex flex-column justify-content-between">
                            <Card.Body>
                                <Card.Title className="text-center clickable" onClick={() => navigate(`/equipment/${item.id}`)}>
                                    {item.equipment_name}
                                </Card.Title>
                                <Card.Title className="text-center">{item.type}</Card.Title>
                                <Card.Title className="text-center">{item.asset_number && <div>Asset#: {item.asset_number}</div>}</Card.Title>
                            </Card.Body>
                            <Card.Footer className="text-end">
                                <Button variant="edit" className="btn-edit me-2" onClick={() => handleEdit(item.id)}>Edit</Button>
                                <Button variant="delete" className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default EquipmentList;