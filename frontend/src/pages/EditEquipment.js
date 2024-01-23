import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

function EditEquipment() {
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
    const { equipmentId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEquipmentDetails = async () => {
            try {
                const response = await fetch(`/api/equipment/${equipmentId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFormData({
                    equipment_name: data.equipment_name || '',
                    description: data.description || '',
                    location: data.location || '',
                    basic_specifications: data.basic_specifications || '',
                    storage_dimensions: data.storage_dimensions || '',
                    use_case_examples: data.use_case_examples || '',
                    min_temp: data.min_temp || '',
                    max_temp: data.max_temp || '',
                    max_wind_resistance: data.max_wind_resistance || '',
                    min_lighting: data.min_lighting || ''
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
            navigate('/equipment'); // Redirect to the equipment list or details page
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Edit Equipment</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Equipment Name:</label>
                    <input
                        type="text"
                        name="equipment_name"
                        value={formData.equipment_name || ''}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Basic Specifications:</label>
                    <input
                        type="text"
                        name="basic_specifications"
                        value={formData.basic_specifications || ''}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Storage Dimensions:</label>
                    <input
                        type="text"
                        name="storage_dimensions"
                        value={formData.storage_dimensions || ''}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Use Case Examples:</label>
                    <input
                        type="text"
                        name="use_case_examples"
                        value={formData.use_case_examples || ''}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        name="min_temp"
                        value={formData.min_temp || ''}
                        onChange={handleChange}
                        placeholder="Minimum Temperature"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        name="max_temp"
                        value={formData.max_temp || ''}
                        onChange={handleChange}
                        placeholder="Maximum Temperature"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        name="max_wind_resistance"
                        value={formData.max_wind_resistance || ''}
                        onChange={handleChange}
                        placeholder="Max Wind Resistance"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" style={{ marginRight: '10px' }}>Minimum Lighting:</label>
                    <select
                        name="min_lighting"
                        value={formData.min_lighting || ''}
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
                <button type="submit" className="submit-button">Save Changes</button>
            </form>
        </div>
    );
}

export default EditEquipment;
