
import React, { useState, useEffect } from 'react';
import CheckoutForm from "./CheckoutForm";
import CheckinForm from './CheckinForm';
import '../App.css';

function CheckoutCheckinPage() {
    // This state will hold the equipment that is currently checked out
    const [checkedOutEquipment, setCheckedOutEquipment] = useState([]);

    useEffect(() => {
        // Fetch the currently checked-out equipment when the component mounts
        const fetchCheckedOutEquipment = async () => {
            try {
                const response = await fetch('/api/checkedout-equipment');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCheckedOutEquipment(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchCheckedOutEquipment();
    }, []);

    // Render the checkout form, checkin form, and the list of currently checked-out equipment
    return (
        <div className="checkout-checkin-container">
            <div className="forms-container">
                <div className="form-section">
                    <h1>Equipment Checkout</h1>
                    <CheckoutForm />
                </div>
                <div className="form-section">
                    <h1>Equipment Checkin</h1>
                    <CheckinForm />
                </div>
            </div>
            <div className="currently-checked-out">
                <h2>Currently Checked Out Equipment</h2>
                <ul>
                    {checkedOutEquipment.map(item => (
                        <li key={item.id}>
                            {item.equipment_name} - Checked out on: {new Date(item.checkout_date).toLocaleString()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CheckoutCheckinPage;
