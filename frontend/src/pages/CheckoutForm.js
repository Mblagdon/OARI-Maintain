/**
 * CheckoutForm.js
 *
 * This component presents a form for users to check out equipment. It fetches the list
 * of available equipment and handles the submission of the form to the checkout API endpoint.
 */
import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';

function CheckoutForm({ onCheckoutSuccess }) {
    const [equipmentList, setEquipmentList] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEquipment = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/equipment');
                if (!response.ok) {
                    throw new Error('Failed to fetch equipment');
                }
                const equipmentData = await response.json();

                const checkedOutResponse = await fetch('/api/checkedout-equipment');
                if (!checkedOutResponse.ok) {
                    throw new Error('Failed to fetch checked-out equipment');
                }
                const checkedOutData = await checkedOutResponse.json();

                const equipmentWithDisabledState = equipmentData.map(equipment => ({
                    ...equipment,
                    isDisabled: checkedOutData.some(checkedOutItem => checkedOutItem.equipment_id === equipment.id),
                    displayText: `${equipment.equipment_name} (${equipment.asset_number})`
                }));

                setEquipmentList(equipmentWithDisabledState);
            } catch (err) {
                setError('Error loading equipment: ' + err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEquipment();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedEquipment || !checkoutDate) {
            setError('Please select equipment and a checkout date.');
            return;
        }

        // Prevent future checkouts
        const now = new Date();
        const checkoutDateTime = new Date(checkoutDate);
        if (checkoutDateTime > now) {
            setError('Check out time must reflect when you will actually check out the equipment. Future checkouts are not allowed.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    equipment_id: selectedEquipment,
                    checkout_date: checkoutDate,
                }),
            });

            if (!response.ok) {
                throw new Error('Checkout failed');
            }

            alert('Equipment checked out successfully');
            onCheckoutSuccess(); // Notify parent component to refresh list
        } catch (err) {
            setError('Failed to check out equipment: ' + err.message);
        } finally {
            setSelectedEquipment(''); // Reset selected equipment
            setCheckoutDate(''); // Reset checkout date
            setIsLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group as={Row} className="align-items-center">
                <Form.Label column sm="auto">Equipment:</Form.Label>
                <Col>
                    <Form.Control
                        as="select"
                        value={selectedEquipment}
                        onChange={e => setSelectedEquipment(e.target.value)}
                        disabled={isLoading}
                    >
                        <option value="">Select Equipment</option>
                        {equipmentList.map(equipment => (
                            <option
                                key={equipment.id}
                                value={equipment.id}
                                disabled={equipment.isDisabled}
                            >
                                {equipment.displayText}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formCheckoutDate">
                <Form.Label column sm={2}>Checkout Date:</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type="datetime-local"
                        value={checkoutDate}
                        onChange={e => setCheckoutDate(e.target.value)}
                        disabled={isLoading}
                    />
                </Col>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading || !selectedEquipment || !checkoutDate}>
                {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Check Out'}
            </Button>
        </Form>
    );
}

export default CheckoutForm;