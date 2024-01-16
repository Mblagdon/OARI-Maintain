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

