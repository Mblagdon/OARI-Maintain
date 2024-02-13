/**
 * EditEquipment.js
 *
 * This component provides a form for editing the details of a specific piece of equipment.
 * It pre-populates the form with existing data by fetching it from the API based on the equipment ID
 * and allows the user to make changes and submit them.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import '../pages/CSS/EquipmentList.css';

function EditEquipment() {
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
    });
    // Retrieve the equipment ID from URL parameters
    const { equipmentId } = useParams();
    const navigate = useNavigate();

    // Flag to check if the type of equipment is software
    const isSoftware = formData.type === 'software';

    // Fetch equipment details when the component is mounted or when equipmentId changes
    useEffect(() => {
        // Fetch logic using equipmentId
        const fetchEquipmentDetails = async () => {
            try {
                const response = await fetch(`/api/equipment/${equipmentId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFormData({
                    type: data.type || 'equipment',
                    equipment_name: data.equipment_name || '',
                    description: data.description || '',
                    location: data.location || '',
                    basic_specifications: data.basic_specifications || '',
                    storage_dimensions: data.storage_dimensions || '',
                    use_case_examples: data.use_case_examples || '',
                    min_temp: data.min_temp || '',
                    max_temp: data.max_temp || '',
                    max_wind_resistance: data.max_wind_resistance || '',
                    min_lighting: data.min_lighting || '',
                    date_bought: data.date_bought || '',
                    renewal_date: data.renewal_date || '',
                    price: data.price || '',
                    weight_with_batteries: data.weight_with_batteries || '',
                    frame_weight: data.frame_weight !== null ? data.frame_weight : '',
                    max_take_off_weight: data.max_take_off_weight || '',
                    max_payload_weight: data.max_payload_weight || '',
                    ip_rating: data.ip_rating || '', asset_number: data.asset_number || '',
                });
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchEquipmentDetails();
    }, [equipmentId]);

    // Update form state when inputs change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure empty strings for numeric inputs are converted to null
        const convertToNullIfEmpty = value => value !== '' ? value : null;

        // Create a payload for updating, conditionally including or excluding fields based on equipment type
        const payload = {
            ...formData,
            weight_with_batteries: formData.type === 'drone' ? formData.weight_with_batteries : undefined,
            frame_weight: formData.type === 'drone' ? formData.frame_weight : undefined,
            max_take_off_weight: formData.type === 'drone' ? formData.max_take_off_weight : undefined,
            max_payload_weight: formData.type === 'drone' ? formData.max_payload_weight : undefined,
            ip_rating: formData.type === 'drone' ? formData.ip_rating : undefined,
            max_wind_resistance: formData.max_wind_resistance !== '' ? parseInt(formData.max_wind_resistance, 10) : null,
            min_temp: convertToNullIfEmpty(formData.min_temp),
            max_temp: convertToNullIfEmpty(formData.max_temp),
        };

        // Perform validation checks specific to software type
        if (formData.type === 'software' && (!formData.date_bought || !formData.renewal_date || formData.price === '')) {
            console.error('For software, date_bought, renewal_date, and price cannot be empty');
            return;
        }
        // Attempt to update equipment details on the server using a PUT request
        try {
            const response = await fetch(`/api/equipment/${equipmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json(); // Get the response data

            if (!response.ok) {
                throw new Error(data.message || 'Could not update equipment details');
            }
            navigate('/equipment');
        } catch (error) {
            console.error('Update error:', error);
        }
    };


    return (
        <Container className="pt-4">
            <Row>
                <Col lg={8} className="mx-auto">
                    <Card>
                        <Card.Header>Edit Equipment Details</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                {/* Form Group for Type */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Select name="type" value={formData.type} onChange={handleChange}>
                                        <option value="equipment">Equipment</option>
                                        <option value="drone">Drone</option>
                                        <option value="software">Software</option>
                                    </Form.Select>
                                </Form.Group>

                                {/* Form Group for Equipment Name */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Equipment Name</Form.Label>
                                    <Form.Control type="text" name="equipment_name" value={formData.equipment_name} onChange={handleChange} />
                                </Form.Group>

                                {/* Form Group for Asset Number */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Asset Number</Form.Label>
                                    <Form.Control type="text" name="asset_number" value={formData.asset_number} onChange={handleChange} />
                                </Form.Group>

                                {/* Form Group for Description */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} />
                                </Form.Group>

                                {/* Form Group for Use Case Examples */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Use Case Examples</Form.Label>
                                    <Form.Control type="text" name="use_case_examples" value={formData.use_case_examples} onChange={handleChange} />
                                </Form.Group>

                                {/* Conditional Form Groups for Drone */}
                                {formData.type === 'drone' && (
                                    <>
                                        {/* Form Group for Weight with batteries */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Weight with Batteries (kg)</Form.Label>
                                            <Form.Control type="number" name="weight_with_batteries" value={formData.weight_with_batteries} onChange={handleChange} />
                                        </Form.Group>

                                        {/* Form Group for Frame Weight */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Frame Weight (kg)</Form.Label>
                                            <Form.Control type="number" name="frame_weight" value={formData.frame_weight} onChange={handleChange} />
                                        </Form.Group>

                                        {/* Form Group for Max Take-Off Weight */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Max Take-Off Weight (kg)</Form.Label>
                                            <Form.Control type="number" name="max_take_off_weight" value={formData.max_take_off_weight} onChange={handleChange} />
                                        </Form.Group>

                                        {/* Form Group for Max Payload Weight */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Max Payload Weight (kg)</Form.Label>
                                            <Form.Control type="number" name="max_payload_weight" value={formData.max_payload_weight} onChange={handleChange} />
                                        </Form.Group>

                                        {/* Form Group for IP Rating */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>IP Rating</Form.Label>
                                            <Form.Control type="text" name="ip_rating" value={formData.ip_rating} onChange={handleChange} />
                                        </Form.Group>
                                    </>
                                )}

                                {/* Conditional Form Groups for Equipment and Software */}
                                {!isSoftware && (
                                    <>
                                        {/* Form Group for Location */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} />
                                        </Form.Group>

                                        {/* Form Group for Basic Specifications */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Basic Specifications</Form.Label>
                                            <Form.Control type="text" name="basic_specifications" value={formData.basic_specifications} onChange={handleChange} />
                                        </Form.Group>

                                        {/* Form Group for Storage Dimensions */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Storage Dimensions</Form.Label>
                                            <Form.Control type="text" name="storage_dimensions" value={formData.storage_dimensions} onChange={handleChange} />
                                        </Form.Group>

                                        {/* Form Group for Min Temp */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Minimum Temperature (°C)</Form.Label>
                                            <Form.Control type="number" name="min_temp" value={formData.min_temp} onChange={handleChange} />
                                        </Form.Group>

                                        {/* Form Group for Max Temp */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Maximum Temperature (°C)</Form.Label>
                                            <Form.Control type="number" name="max_temp" value={formData.max_temp} onChange={handleChange} />
                                        </Form.Group>

                                        {/* Form Group for Max Wind Resistance */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Maximum Wind Resistance (km/h)</Form.Label>
                                            <Form.Control type="number" name="max_wind_resistance" value={formData.max_wind_resistance} onChange={handleChange} />
                                        </Form.Group>

                                        {/* Form Group for Min Lighting */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Minimum Lighting Required</Form.Label>
                                            <Form.Select name="min_lighting" value={formData.min_lighting} onChange={handleChange}>
                                                <option value="">Select Lighting Condition</option>
                                                <option value="Low">Low</option>
                                                <option value="Moderate">Moderate</option>
                                                <option value="High">High</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </>
                                )}

                                {isSoftware && (
                                    <>
                                        {/* Form Group for Date Bought */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Date Bought</Form.Label>
                                            <Form.Control type="date" name="date_bought" value={formData.date_bought} onChange={handleChange} />
                                        </Form.Group>

                                        {/* Form Group for Renewal Date */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Renewal Date</Form.Label>
                                            <Form.Control type="date" name="renewal_date" value={formData.renewal_date} onChange={handleChange} />
                                        </Form.Group>

                                        {/* Form Group for Price */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Price ($)</Form.Label>
                                            <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} />
                                        </Form.Group>
                                    </>
                                )}

                                {/* Submit Button */}
                                <Button variant="primary" type="submit">
                                    Save Changes
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default EditEquipment;