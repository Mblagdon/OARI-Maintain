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
    const [checkedOutEquipment, setCheckedOutEquipment] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(0); // state to force re-render

    const fetchCheckedOutEquipment = async () => {
        try {
            const response = await fetch('/api/checkedout-equipment');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched checked-out equipment:', data);
            setCheckedOutEquipment(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    useEffect(() => {
        console.log('useEffect running to fetch checked-out equipment');
        fetchCheckedOutEquipment();
    }, [forceUpdate]); // Depend on forceUpdate to refetch data

    // Call this function after checkout or check-in success
    const refreshCheckedOutList = () => {
        setForceUpdate(prev => prev + 1); // Increment to force re-render
    };

    return (
        <div className="checkout-checkin-container">
            <div className="forms-container">
                <div className="form-section">
                    <h1>Equipment Checkout</h1>
                    <CheckoutForm onCheckoutSuccess={refreshCheckedOutList} />
                </div>
                <div className="form-section">
                    <h1>Equipment Checkin</h1>
                    <CheckinForm onCheckinSuccess={refreshCheckedOutList} />
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

