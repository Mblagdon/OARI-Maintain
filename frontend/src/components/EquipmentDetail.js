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

    return (
        <div>
            <h2>{equipmentDetails.equipment_name}</h2>
            <p>Description: {equipmentDetails.description}</p>
            {/* Display other details here */}
        </div>
    );
}

export default EquipmentDetail;
