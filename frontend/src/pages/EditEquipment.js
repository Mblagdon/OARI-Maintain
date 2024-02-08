/**
 * EditEquipment.js
 *
 * This component provides a form for editing the details of a specific piece of equipment.
 * It pre-populates the form with existing data by fetching it from the API based on the equipment ID
 * and allows the user to make changes and submit them.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

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
                    ip_rating: data.ip_rating || '',
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

        // Create a payload for updating, conditionally including or excluding fields based on equipment type
        const payload = {
            ...formData,
            weight_with_batteries: formData.type === 'drone' ? formData.weight_with_batteries : undefined,
            frame_weight: formData.type === 'drone' ? formData.frame_weight : undefined,
            max_take_off_weight: formData.type === 'drone' ? formData.max_take_off_weight : undefined,
            max_payload_weight: formData.type === 'drone' ? formData.max_payload_weight : undefined,
            ip_rating: formData.type === 'drone' ? formData.ip_rating : undefined,
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
            if (!response.ok) {
                throw new Error('Could not update equipment details');
            }
            navigate('/equipment');
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Edit Equipment</h2>
            <form onSubmit={handleSubmit}>
                <label className="form-label">Type:</label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="form-input"
                >
                    <option value="equipment">Equipment</option>
                    <option value="drone">Drone</option>
                    <option value="software">Software</option>
                </select>

                <label className="form-label">Equipment Name:</label>
                <input
                    type="text"
                    name="equipment_name"
                    value={formData.equipment_name}
                    onChange={handleChange}
                    className="form-input"
                />

                <label className="form-label">Description:</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-input"
                />

                <label className="form-label">Use Case Examples:</label>
                <input
                    type="text"
                    name="use_case_examples"
                    value={formData.use_case_examples}
                    onChange={handleChange}
                    className="form-input"
                />

                {/* Conditional input for payload info if type is drone */}
                {formData.type === 'drone' && (
                    <>
                        <div className="form-group">
                            <label className="form-label">Weight (with batteries) (kg):</label>
                            <input
                                type="number"
                                name="weight_with_batteries"
                                value={formData.weight_with_batteries}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Frame Weight (no batteries) (kg):</label>
                            <input
                                type="number"
                                name="frame_weight"
                                value={formData.frame_weight}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Max Take-Off Weight (kg):</label>
                            <input
                                type="number"
                                name="max_take_off_weight"
                                value={formData.max_take_off_weight}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Max Payload Weight (kg):</label>
                            <input
                                type="number"
                                name="max_payload_weight"
                                value={formData.max_payload_weight}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">IP Rating:</label>
                            <input
                                type="text"
                                name="ip_rating"
                                value={formData.ip_rating}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                    </>
                )}

                {/* Conditional fields for drones and equipment */}
                {!isSoftware && (
                    <>
                        <label className="form-label">Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="form-input"
                        />

                        <label className="form-label">Basic Specifications:</label>
                        <input
                            type="text"
                            name="basic_specifications"
                            value={formData.basic_specifications}
                            onChange={handleChange}
                            className="form-input"
                        />

                        <label className="form-label">Storage Dimensions:</label>
                        <input
                            type="text"
                            name="storage_dimensions"
                            value={formData.storage_dimensions}
                            onChange={handleChange}
                            className="form-input"
                        />

                        <input
                            type="number"
                            name="min_temp"
                            value={formData.min_temp}
                            onChange={handleChange}
                            placeholder="Minimum Temperature"
                            className="form-input"
                        />

                        <input
                            type="number"
                            name="max_temp"
                            value={formData.max_temp}
                            onChange={handleChange}
                            placeholder="Maximum Temperature"
                            className="form-input"
                        />

                        <input
                            type="number"
                            name="max_wind_resistance"
                            value={formData.max_wind_resistance}
                            onChange={handleChange}
                            placeholder="Max Wind Resistance"
                            className="form-input"
                        />

                        <label className="form-label"></label>
                        <select
                            name="min_lighting"
                            value={formData.min_lighting}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="">Select Minimum Lighting Exposure</option>
                            <option value="Low Exposure">Low Exposure</option>
                            <option value="Moderate Exposure">Moderate Exposure</option>
                            <option value="High Exposure">High Exposure</option>
                            <option value="Consistent Exposure">Consistent Exposure</option>
                        </select>
                    </>
                )}
                {/* Conditional form fields for software */}
                {isSoftware && (
                    <>
                        <label className="form-label">Date Bought:</label>
                        <input
                            type="date"
                            name="date_bought"
                            value={formData.date_bought}
                            onChange={handleChange}
                            className="form-input"
                        />

                        <label className="form-label">Renewal Date:</label>
                        <input
                            type="date"
                            name="renewal_date"
                            value={formData.renewal_date}
                            onChange={handleChange}
                            className="form-input"
                        />

                        <label className="form-label">Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </>
                )}
                <button type="submit" className="submit-button">Save Changes</button>
            </form>
        </div>
    );
}

export default EditEquipment;
