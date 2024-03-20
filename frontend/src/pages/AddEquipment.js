/**
 * AddEquipment.js
 *
 * This React component renders a form for adding new equipment to the database. It collects
 * user input for various equipment attributes such as name, description, and location, among others.
 * On form submission, it sends this data to the server to create a new equipment record.
 */

import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
import '../pages/CSS/AddEquipment.css';

function AddEquipment() {
    const [formData, setFormData] = useState({
        type: 'equipment',
        equipment_name: '',
        description: '',
        location: '',
        basic_specifications: '',
        storage_dimensions: '',
        use_case_examples: '',
        min_temp: '',
        max_temp: '',
        max_wind_resistance: '',
        min_lighting: '',
        date_bought: '',
        renewal_date: '',
        price: '',
        weight_with_batteries: '',
        frame_weight: '',
        max_take_off_weight: '',
        max_payload_weight: '',
        ip_rating: '',
        asset_number: '',
        software_type: '',
        account_code: '',
        purchased_with: '',
    });
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const isSoftware = formData.type === 'software';

    const [showConfirmation, setShowConfirmation] = useState(false);

    const isFormComplete = () => {
        if (formData.type === 'software') {
            return formData.equipment_name && formData.description && formData.date_bought && formData.renewal_date && formData.price && formData.software_type && formData.account_code && formData.purchased_with;
        } else if (formData.type === 'drone') {
            return formData.equipment_name && formData.description && formData.location && formData.basic_specifications && formData.storage_dimensions && formData.min_temp && formData.max_temp && formData.max_wind_resistance && formData.min_lighting && formData.weight_with_batteries && formData.frame_weight && formData.max_take_off_weight && formData.max_payload_weight && formData.ip_rating;
        } else { // Assuming 'equipment' type
            return formData.equipment_name && formData.description && formData.location && formData.basic_specifications && formData.storage_dimensions && formData.min_temp && formData.max_temp && formData.max_wind_resistance && formData.min_lighting;
        }
    };


    // Reset success and error messages on component unmount
    useEffect(() => {
        return () => {
            setSubmitSuccess(false);
            setSubmitError('');
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset previous success and error states
        setSubmitSuccess(false);
        setSubmitError('');

        // Start preparing the payload
        let payload = {
            type: formData.type,
            equipment_name: formData.equipment_name,
            asset_number: formData.asset_number,
            description: formData.description,
            use_case_examples: formData.use_case_examples,
        };

        // Add fields specific to the type
        if (formData.type === 'software') {
            // Add software-specific properties
            payload.date_bought = formData.date_bought;
            payload.renewal_date = formData.renewal_date;
            payload.price = formData.price;
            payload.software_type = formData.software_type;
            payload.account_code = formData.account_code;
            payload.purchased_with = formData.purchased_with;
        } else {
            // Add equipment or drone specific properties
            payload.location = formData.location;
            payload.basic_specifications = formData.basic_specifications;
            payload.storage_dimensions = formData.storage_dimensions;
            payload.min_temp = formData.min_temp;
            payload.max_temp = formData.max_temp;
            payload.max_wind_resistance = formData.max_wind_resistance;
            payload.min_lighting = formData.min_lighting;
            // Add drone-specific property if it's a drone
            if (formData.type === 'drone') {
                payload.weight_with_batteries= formData.weight_with_batteries;
                payload.frame_weight= formData.frame_weight;
                payload.max_take_off_weight= formData.max_take_off_weight;
                payload.max_payload_weight= formData.max_payload_weight;
                payload.ip_rating= formData.ip_rating;
            }
        }

        // Make the API call
        fetch('/api/equipment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setSubmitSuccess(true);
                setShowConfirmation(true); // Show confirmation message
                // Reset form data
                setFormData({
                    type: 'equipment',
                    equipment_name: '',
                    description: '',
                    location: '',
                    basic_specifications: '',
                    storage_dimensions: '',
                    use_case_examples: '',
                    min_temp: '',
                    max_temp: '',
                    max_wind_resistance: '',
                    min_lighting: '',
                    date_bought: '',
                    renewal_date: '',
                    price: '',
                    weight_with_batteries: '',
                    frame_weight: '',
                    max_take_off_weight: '',
                    max_payload_weight: '',
                    ip_rating: '',
                    asset_number: '',
                    software_type: '',
                    account_code: '',
                    purchased_with: '',
                });
                // Optionally hide the confirmation message after some time
                setTimeout(() => setShowConfirmation(false), 5000);
            })
            .catch((error) => {
                console.error('Error:', error);
                setSubmitError('Failed to add equipment: ' + error.message);
            });
    };
    return (
        <Container className="pt-4">
            <Row>
                <Col lg={8} className="mx-auto">
                    <Card>
                        <Card.Header>Add New Equipment</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                        {submitSuccess && <div className="alert alert-success">Equipment added successfully!</div>}
                        {submitError && <div className="alert alert-danger">{submitError}</div>}

                        {/* Type Selection */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Type</Form.Label>
                            <Col sm={9}>
                                <Form.Select name="type" value={formData.type} onChange={handleChange}>
                                    <option value="equipment">Equipment</option>
                                    <option value="drone">Drone</option>
                                    <option value="software">Software</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        {/* Equipment Name */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Equipment Name:</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="equipment_name"
                                    value={formData.equipment_name}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                        {/* Asset Number */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Asset Number:</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="asset_number"
                                    value={formData.asset_number}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        {/* Description */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Description:</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                        {/*Use Case Example*/}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Use Case Example:</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    as="textarea"
                                    name="use_case_examples"
                                    value={formData.use_case_examples}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                {/* Conditional input for payload info if type is drone */}
                {formData.type === 'drone' && (
                    <>
                        {/* Weight (with batteries) (kg) */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Weight (with batteries) (kg):</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="number"
                                    name="weight_with_batteries"
                                    value={formData.weight_with_batteries}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        {/* Frame Weight (no batteries) (kg) */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Frame Weight (no batteries) (kg):</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="number"
                                    name="frame_weight"
                                    value={formData.frame_weight}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        {/* Max Take-Off Weight (kg) */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Max Take-Off Weight (kg):</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="number"
                                    name="max_take_off_weight"
                                    value={formData.max_take_off_weight}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        {/* Max Payload Weight (kg) */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Max Payload Weight (kg):</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="number"
                                    name="max_payload_weight"
                                    value={formData.max_payload_weight}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        {/* IP Rating */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>IP Rating:</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    as="textarea"
                                    name="ip_rating"
                                    value={formData.ip_rating}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </>
                )}
                {/* Conditional fields for drones and equipment */}
                {!isSoftware && (
                    <>
                        {/* Location */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Location:</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    as="textarea"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        {/* Basic Specifications */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Basic Specifications:</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    as="textarea"
                                    name="basic_specifications"
                                    value={formData.basic_specifications}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        {/* Storage Dimensions: */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Storage Dimensions:</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    as="textarea"
                                    name="storage_dimensions"
                                    value={formData.storage_dimensions}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>

                        {/* Minimum Temperature */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Minimum Temperature (°C):</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="number"
                                    name="min_temp"
                                    value={formData.min_temp}
                                    onChange={handleChange}
                                    placeholder="Minimum Temperature"
                                />
                            </Col>
                        </Form.Group>

                        {/* Maximum Temperature */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Maximum Temperature (°C):</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="number"
                                    name="max_temp"
                                    value={formData.max_temp}
                                    onChange={handleChange}
                                    placeholder="Maximum Temperature"
                                />
                            </Col>
                        </Form.Group>

                        {/* Maximum Wind Resistance */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Max Wind Resistance (km/h):</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="number"
                                    name="max_wind_resistance"
                                    value={formData.max_wind_resistance}
                                    onChange={handleChange}
                                    placeholder="Max Wind Resistance"
                                />
                            </Col>
                        </Form.Group>

                        {/* Minimum Lighting */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Minimum Lighting Required:</Form.Label>
                            <Col sm={9}>
                                <Form.Select
                                    name="min_lighting"
                                    value={formData.min_lighting}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Minimum Lighting Exposure:</option>
                                    <option value="Low Exposure">Low Exposure</option>
                                    <option value="Moderate Exposure">Moderate Exposure</option>
                                    <option value="High Exposure">High Exposure</option>
                                    <option value="Consistent Exposure">Consistent Exposure</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                    </>
                )}
                    {/* Conditional form fields for software */}
                    {isSoftware && (
                        <>
                            {/* Date Bought */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Date Bought:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="date"
                                        name="date_bought"
                                        value={formData.date_bought}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            {/* Renewal Date */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Renewal Date:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="date"
                                        name="renewal_date"
                                        value={formData.renewal_date}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            {/* Price */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Price:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        as="textarea"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Software Type:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="software_type"
                                        value={formData.software_type}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            {/* Account Code */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Account Code:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="account_code"
                                        value={formData.account_code}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>

                            {/* Purchased With */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Purchased With:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="purchased_with"
                                        value={formData.purchased_with}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>

                        </>
                    )}
                                {/* Submit Button */}
                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={{ span: 8, offset: 4 }}>
                                        <Button type="submit" className="btn btn-primary" disabled={!isFormComplete()}>
                                            Add Equipment
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

export default AddEquipment;