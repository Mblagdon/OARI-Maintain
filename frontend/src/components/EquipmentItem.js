/**
 * EquipmentItem.js
 *
 * A React component used to display a summary of an individual equipment item within a list.
 * This component shows basic information like the equipment's name and allows the user to interact,
 * such as clicking to view more details. It can be used in a list to show a collection of equipment,
 * providing an entry point to more detailed views.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function EquipmentItem({ equipment }) {
    return (
        <div className="equipment-card">
            <Link to={`/equipment/${equipment.id}`} className="equipment-name">
                {equipment.equipment_name}
            </Link>
        </div>
    );
}

export default EquipmentItem;

