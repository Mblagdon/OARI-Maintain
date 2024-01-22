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
        equipment_name: '',
        description: '',
        location: '',
        basic_specifications: '',
        storage_dimensions: '',
        use_case_examples: '',
        min_temp: '',
        max_temp: '',
        max_wind_resistance: '',
        min_lighting: ''
    });
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

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

        // Simple front-end validation
        for (let key in formData) {
            if (formData[key].trim() === '') {
                setSubmitError(`Please fill in the ${key.replace('_', ' ')}.`);
                return;
            }
        }

        fetch('/api/equipment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setSubmitSuccess(true);
                setSubmitError(''); // Clear any previous errors
                // Reset form data
                setFormData({
                    equipment_name: '',
                    description: '',
                    location: '',
                    basic_specifications: '',
                    storage_dimensions: '',
                    use_case_examples: '',
                    min_temp: '',
                    max_temp: '',
                    max_wind_resistance: '',
                    min_lighting: ''
            });
            // Redirect or update state here if needed
            })
            .catch((error) => {
                console.error('Error:', error);
                setSubmitError('Failed to add equipment: ' + error.message);
                setSubmitSuccess(false);
            });
    };
    return (
        <div className="form-container">
            {submitSuccess && <div className="success-message">Equipment added successfully!</div>}
            {submitError && <div className="error-message">{submitError}</div>}
            <form onSubmit={handleSubmit}>
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
                <label className="form-label">Use Case Examples:</label>
                <input
                    type="text"
                    name="use_case_examples"
                    value={formData.use_case_examples}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="number"
                    name="min_temp"
                    value={formData.min_temp}
                    onChange={handleChange}
                    placeholder="Minimum Temperature"
                />
                <input
                    type="number"
                    name="max_temp"
                    value={formData.max_temp}
                    onChange={handleChange}
                    placeholder="Maximum Temperature"
                />
                <input
                    type="number"
                    name="max_wind_resistance"
                    value={formData.max_wind_resistance}
                    onChange={handleChange}
                    placeholder="Max Wind Resistance"
                />
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label className="form-label" style={{ marginRight: '10px' }}>Minimum Lighting:</label>
                    <select
                        name="min_lighting"
                        value={formData.min_lighting}
                        onChange={handleChange}
                        className="form-select"
                        style={{ flexGrow: '1' }}
                    >
                        <option value="">Select Lighting Exposure</option>
                        <option value="Low Exposure">Low Exposure</option>
                        <option value="Moderate Exposure">Moderate Exposure</option>
                        <option value="High Exposure">High Exposure</option>
                        <option value="Consistent Exposure">Consistent Exposure</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Add Equipment</button>
            </form>
        </div>
    );
}

export default AddEquipment;