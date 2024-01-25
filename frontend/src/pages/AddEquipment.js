/**
 * AddEquipment.js
 *
 * This React component renders a form for adding new equipment to the database. It collects
 * user input for various equipment attributes such as name, description, and location, among others.
 * On form submission, it sends this data to the server to create a new equipment record.
 */

import React, {useEffect, useState} from 'react';
import '../App.css';

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
    });
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const isSoftware = formData.type === 'software';

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

        // Perform validation based on the type
        if (formData.type === 'software') {
            // Validate fields for software, including date_bought, renewal_date, and price
            if (!formData.date_bought || !formData.renewal_date || !formData.price) {
                setSubmitError('Please fill in all required fields for software.');
                return;
            }
        } else {
            // Validate common fields for equipment and drone
            const requiredFields = ['equipment_name', 'description', 'use_case_examples'];
            for (let field of requiredFields) {
                if (!formData[field]) {
                    setSubmitError(`Please fill in the ${field.replace('_', ' ')}.`);
                    return;
                }
            }
        }
        // Prepare the payload for the API call
        let payload = {
            equipment_name: formData.equipment_name,
            description: formData.description,
            use_case_examples: formData.use_case_examples,

        };

        // Add fields specific to the type
        if (formData.type === 'software') {
            payload = {
                ...payload,
                date_bought: formData.date_bought,
                renewal_date: formData.renewal_date,
                price: formData.price,
            };
        } else {
            payload = {
                ...payload,
                location: formData.location,
                basic_specifications: formData.basic_specifications,
                storage_dimensions: formData.storage_dimensions,
                min_temp: formData.min_temp,
                max_temp: formData.max_temp,
                max_wind_resistance: formData.max_wind_resistance,
                min_lighting: formData.min_lighting,
            };
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
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                setSubmitError('Failed to add equipment: ' + error.message);
            });
    };
    return (
        <div className="form-container">
            {submitSuccess && <div className="success-message">Equipment added successfully!</div>}
            {submitError && <div className="error-message">{submitError}</div>}
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

                        <label className="form-label">Minimum Lighting:</label>
                        <select
                            name="min_lighting"
                            value={formData.min_lighting}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="">Select Lighting Exposure</option>
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
                <button type="submit" className="submit-button">Add Equipment</button>
            </form>
        </div>
    );
}

export default AddEquipment;