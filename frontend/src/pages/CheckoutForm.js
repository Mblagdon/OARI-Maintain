/**
 * CheckoutForm.js
 *
 * This component presents a form for users to check out equipment. It fetches the list
 * of available equipment and handles the submission of the form to the checkout API endpoint.
 */
import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';

function CheckoutForm({onCheckoutSuccess}) {
    const [equipmentList, setEquipmentList] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEquipment = async () => {
            setIsLoading(true);
            try {
                // Fetch all equipment
                const response = await fetch('/api/equipment');
                const equipmentData = await response.json();

                // Fetch checked-out equipment
                const checkedOutResponse = await fetch('/api/checkedout-equipment');
                const checkedOutData = await checkedOutResponse.json();

                // Map over all equipment and disable those that are checked out
                const equipmentWithDisabledState = equipmentData.map(equipment => ({
                    ...equipment,
                    isDisabled: checkedOutData.some(checkedOutItem => checkedOutItem.equipment_id === equipment.id),
                    displayText: `${equipment.equipment_name} (${equipment.asset_number})`
                }));
                console.log(equipmentWithDisabledState);
                setEquipmentList(equipmentWithDisabledState);
                setIsLoading(false);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchEquipment();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedEquipment || !checkoutDate) {
            alert('Please select equipment and a checkout date.');
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

            // Perform any additional actions on successful checkout
            alert('Equipment checked out successfully');
            setSelectedEquipment(''); // Reset selected equipment
            setCheckoutDate(''); // Reset checkout date
            console.log('Checkout successful, calling onCheckoutSuccess');
            onCheckoutSuccess(); // Notify parent component to refresh list
            setIsLoading(false);
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to check out equipment');
            setIsLoading(false);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
                        className="custom-select"
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
                <Form.Label column sm={2}>
                    Checkout Date:
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type="datetime-local"
                        value={checkoutDate}
                        onChange={e => setCheckoutDate(e.target.value)}
                        disabled={isLoading}
                    />
                </Col>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        Checking Out...
                    </>
                ) : (
                    'Check Out'
                )}
            </Button>
        </Form>
    );
}

export default CheckoutForm;