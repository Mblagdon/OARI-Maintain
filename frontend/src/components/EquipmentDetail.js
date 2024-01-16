import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EquipmentDetail() {
    const [equipmentDetails, setEquipmentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { equipmentId } = useParams();

    useEffect(() => {
        fetch(`/api/equipment/${equipmentId}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setEquipmentDetails(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [equipmentId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!equipmentDetails) return <div>Equipment not found</div>;

    return (
        <div>
            <h2>{equipmentDetails.equipment_name}</h2>
            <p><strong>Equipment ID:</strong> {equipmentDetails.id}</p>
            <p><strong>Description:</strong> {equipmentDetails.description}</p>
            <p><strong>Location:</strong> {equipmentDetails.location}</p>
            <p><strong>Basic Specifications:</strong> {equipmentDetails.basic_specifications}</p>
            <p><strong>Storage Dimensions:</strong> {equipmentDetails.storage_dimensions}</p>
            <p><strong>Use Case Examples:</strong> {equipmentDetails.use_case_examples}</p>
        </div>
    );
}

export default EquipmentDetail;
