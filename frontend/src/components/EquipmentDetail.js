/**
 * EquipmentDetail.js
 *
 * This React component is responsible for displaying the details of a single piece of equipment.
 * It fetches and presents detailed information from the equipment record selected by the user.
 * It is typically rendered when a user navigates to the details page of an individual equipment item,
 * showing all relevant data such as name, description, and other attributes.
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

function EquipmentDetail() {
    const [equipmentDetails, setEquipmentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { equipmentId } = useParams();

    useEffect(() => {
        fetch(`/api/equipment/${equipmentId}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setEquipmentDetails(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [equipmentId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!equipmentDetails) return <div>Equipment not found</div>;

    // Determine if the equipment is of type 'software' or 'drone' to conditionally render the new fields
    const isSoftware = equipmentDetails.type === 'Software';
    const isDrone = equipmentDetails.type === 'Drone';

    return (
        <Container className="pt-4">
            <Row>
                <Col lg={8} className="mx-auto">
                    <Card>
                        <Card.Header as="h5">{equipmentDetails.equipment_name}</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item><strong>ID:</strong> {equipmentDetails.id}</ListGroup.Item>
                                <ListGroup.Item><strong>Description:</strong> {equipmentDetails.description}</ListGroup.Item>
                                <ListGroup.Item><strong>Use Cases:</strong> {equipmentDetails.use_case_examples}</ListGroup.Item>
                                {/* Render these fields only for non-software types */}
                                {!isSoftware && (
                                    <>
                                        <ListGroup.Item><strong>Asset Number:</strong> {equipmentDetails.asset_number}</ListGroup.Item>
                                        <ListGroup.Item><strong>Location:</strong> {equipmentDetails.location}</ListGroup.Item>
                                        <ListGroup.Item><strong>Specifications:</strong> {equipmentDetails.basic_specifications}</ListGroup.Item>
                                        <ListGroup.Item><strong>Storage Dimensions:</strong> {equipmentDetails.storage_dimensions}</ListGroup.Item>
                                        <ListGroup.Item><strong>Min Temp:</strong> {equipmentDetails.min_temp}°C</ListGroup.Item>
                                        <ListGroup.Item><strong>Max Temp:</strong> {equipmentDetails.max_temp}°C</ListGroup.Item>
                                        <ListGroup.Item><strong>Max Wind Resistance:</strong> {equipmentDetails.max_wind_resistance} km/h</ListGroup.Item>
                                        <ListGroup.Item><strong>Min Lighting:</strong> {equipmentDetails.min_lighting}</ListGroup.Item>
                                    </>
                                )}
                                {/* Conditional rendering for drone-specific fields */}
                                {isDrone && (
                                    <>
                                        <ListGroup.Item><strong>Weight with Batteries:</strong> {equipmentDetails.weight_with_batteries} kg</ListGroup.Item>
                                        <ListGroup.Item><strong>Frame Weight:</strong> {equipmentDetails.frame_weight} kg</ListGroup.Item>
                                        <ListGroup.Item><strong>Max Takeoff Weight:</strong> {equipmentDetails.max_take_off_weight} kg</ListGroup.Item>
                                        <ListGroup.Item><strong>Max Payload Weight: </strong>{equipmentDetails.max_payload_weight} kg</ListGroup.Item>
                                        <ListGroup.Item><strong>IP Rating:</strong> {equipmentDetails.ip_rating}</ListGroup.Item>
                                    </>
                                )}
                                {/* Conditional rendering for software-specific fields */}
                                {isSoftware && (
                                    <>
                                        <ListGroup.Item><strong>Date Bought:</strong> {new Date(equipmentDetails.date_bought).toISOString().slice(0, 10)}</ListGroup.Item>
                                        <ListGroup.Item><strong>Renewal Date:</strong> {new Date(equipmentDetails.renewal_date).toISOString().slice(0, 10)}</ListGroup.Item>
                                        <ListGroup.Item><strong>Price:</strong> ${equipmentDetails.price}</ListGroup.Item>
                                        <ListGroup.Item><strong>Software Type:</strong> {equipmentDetails.software_type}</ListGroup.Item>
                                        <ListGroup.Item><strong>Account Code:</strong> {equipmentDetails.account_code}</ListGroup.Item>
                                        <ListGroup.Item><strong>Purchased With:</strong> {equipmentDetails.purchased_with}</ListGroup.Item>
                                    </>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default EquipmentDetail;
