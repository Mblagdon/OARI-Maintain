/**
 * EquipmentList.js
 *
 * This component fetches and displays a list of all equipment from the server. Each item in the list
 * is represented by an EquipmentItem component, allowing users to view basic information and select
 * an item to see more details. It is the main view for browsing through the catalog of equipment.
 */

import React, { useState, useEffect } from 'react';
import EquipmentItem from '../components/EquipmentItem';
import '../App.css';

function EquipmentList() {
    const [equipment, setEquipment] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/equipment')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setEquipment(data))
            .catch(error => {
                setError(error.message);
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="equipment-grid">
            {equipment.map(item => (
                <EquipmentItem key={item.id} equipment={item} />
            ))}
        </div>
    );
}

export default EquipmentList;


