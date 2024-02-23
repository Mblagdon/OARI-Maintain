/**
 * CheckoutCheckinPage.js
 *
 * This page component renders both checkout and checkin forms, allowing users to
 * manage equipment transactions. It also displays currently checked-out equipment
 * and provides navigation to the history of checked-out items.
 */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup} from 'react-bootstrap';
import CheckoutForm from "./CheckoutForm";
import CheckinForm from './CheckinForm';
import '../pages/CSS/CheckoutCheckinPage.css';
import { Link } from "react-router-dom";

function CheckoutCheckinPage() {
    const [checkedOutEquipment, setCheckedOutEquipment] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(0); // state to force re-render

    const fetchCheckedOutEquipment = async () => {
        try {
            const response = await fetch('/api/checkedout-equipment');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched checked-out equipment:', data);
            setCheckedOutEquipment(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    useEffect(() => {
        console.log('useEffect running to fetch checked-out equipment');
        fetchCheckedOutEquipment();
    }, [forceUpdate]); // Depend on forceUpdate to refetch data

    // Call this function after checkout or check-in success
    const refreshCheckedOutList = () => {
        setForceUpdate(prev => prev + 1); // Increment to force re-render
    };

    return (
        <Container className="my-4">
            <Row className="mb-3">
                <Col md={6}>
                    <Card>
                        <Card.Header>Equipment Check-out</Card.Header>
                        <Card.Body>
                            <CheckoutForm onCheckoutSuccess={refreshCheckedOutList} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Header>Equipment Check-in</Card.Header>
                        <Card.Body>
                            <CheckinForm onCheckinSuccess={refreshCheckedOutList} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>Currently Checked Out Equipment</Card.Header>
                        <ListGroup variant="flush">
                            {checkedOutEquipment.map(item => (
                                <ListGroup.Item key={item.id}>
                                    {item.equipment_name} - Checked out on: {new Date(item.checkout_date).toLocaleString()}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Card.Footer>
                            <Link to="/checkedout-history">View Previously Checked Out Equipment</Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CheckoutCheckinPage;
