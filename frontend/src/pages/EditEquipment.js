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
        price: ''
    });
    const { equipmentId } = useParams();
    const navigate = useNavigate();

    const isSoftware = formData.type === 'software';

    useEffect(() => {
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
                });
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchEquipmentDetails();
    }, [equipmentId]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.type === 'software' && (!formData.date_bought || !formData.renewal_date || formData.price === '')) {
            console.error('For software, date_bought, renewal_date, and price cannot be empty');
            return;
        }
        try {
            const response = await fetch(`/api/equipment/${equipmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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
                <button type="submit" className="submit-button">Save Changes</button>
            </form>
        </div>
    );
}

export default EditEquipment;
