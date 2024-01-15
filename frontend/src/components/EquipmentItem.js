import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function EquipmentItem({ equipment }) {
    const [showDetails, setShowDetails] = useState(false);

    // Toggle details when the equipment name is clicked
    const toggleDetails = () => {

        setShowDetails(prevShowDetails => {
            console.log("Toggling details from: ", prevShowDetails, " to: ", !prevShowDetails);
            return !prevShowDetails;
        });
    };

    return (
        <div className="equipment-card">
            <div className="equipment-name" onClick={toggleDetails}>
                {equipment.equipment_name}
            </div>
            {showDetails && (
                <div className="details-container">
                    <p>Description: {equipment.description}</p>
                    {/* Render additional details here */}
                </div>
            )}
        </div>
    );
}

export default EquipmentItem;

