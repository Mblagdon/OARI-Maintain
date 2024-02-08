/**
 * CheckoutCheckinPage.js
 *
 * This page component renders both checkout and checkin forms, allowing users to
 * manage equipment transactions. It also displays currently checked-out equipment
 * and provides navigation to the history of checked-out items.
 */
import React, { useState, useEffect } from 'react';
import CheckoutForm from "./CheckoutForm";
import CheckinForm from './CheckinForm';
import '../App.css';
import { Link } from "react-router-dom";

function CheckoutCheckinPage() {
    // This state holds the currently checked-out equipment.
    const [checkedOutEquipment, setCheckedOutEquipment] = useState([]);

    // Function to fetch the currently checked-out equipment.
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

    // Fetch the currently checked-out equipment when the component mounts or updates.
    useEffect(() => {
        fetchCheckedOutEquipment();
    }, []);

    return (
        <div className="checkout-checkin-container">
            <div className="forms-container">
                <div className="form-section">
                    <h1>Equipment Checkout</h1>
                    <CheckoutForm onCheckoutSuccess={fetchCheckedOutEquipment} />
                </div>
                <div className="form-section">
                    <h1>Equipment Checkin</h1>
                    <CheckinForm onCheckinSuccess={fetchCheckedOutEquipment} />
                </div>
            </div>
            <div className="currently-checked-out">
                <h2>Currently Checked Out Equipment</h2>
                <Link to="/checkedout-history">View Previously Checked Out Equipment</Link>
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

