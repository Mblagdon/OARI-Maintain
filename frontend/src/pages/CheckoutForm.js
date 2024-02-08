/**
 * CheckoutForm.js
 *
 * This component presents a form for users to check out equipment. It fetches the list
 * of available equipment and handles the submission of the form to the checkout API endpoint.
 */
import React, { useState, useEffect } from 'react';

function CheckoutForm({onCheckoutSuccess}) {
    const [equipmentList, setEquipmentList] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEquipment = async () => {
            setIsLoading(true);
            try {
                // Fetch all equipment
                const response = await fetch('/api/equipment');
                const equipmentData = await response.json();

                // Fetch checked-out equipment
                const checkedOutResponse = await fetch('/api/checkedout-equipment');
                const checkedOutData = await checkedOutResponse.json();

                // Map over all equipment and disable those that are checked out
                const equipmentWithDisabledState = equipmentData.map(equipment => ({
                    ...equipment,
                    isDisabled: checkedOutData.some(checkedOutItem => checkedOutItem.equipment_id === equipment.id),
                }));
                console.log(equipmentWithDisabledState);
                setEquipmentList(equipmentWithDisabledState);
                setIsLoading(false);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchEquipment();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedEquipment || !checkoutDate) {
            alert('Please select equipment and a checkout date.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    equipment_id: selectedEquipment,
                    checkout_date: checkoutDate,
                }),
            });

            if (!response.ok) {
                throw new Error('Checkout failed');
            }

            // Perform any additional actions on successful checkout
            alert('Equipment checked out successfully');
            setSelectedEquipment(''); // Reset selected equipment
            setCheckoutDate(''); // Reset checkout date
            onCheckoutSuccess(); // Notify parent component to refresh list
            setIsLoading(false);
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to check out equipment');
            setIsLoading(false);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Equipment:
                <select
                    value={selectedEquipment}
                    onChange={e => setSelectedEquipment(e.target.value)}
                    disabled={isLoading}
                >
                    <option value="">Select Equipment</option>
                    {equipmentList.map(equipment => (
                        <option key={equipment.id} value={equipment.id} disabled={equipment.isDisabled}>
                            {equipment.equipment_name}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Checkout Date:
                <input
                    type="datetime-local"
                    value={checkoutDate}
                    onChange={e => setCheckoutDate(e.target.value)}
                    disabled={isLoading}
                />
            </label>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Checking Out...' : 'Check Out'}
            </button>
        </form>
    );
}

export default CheckoutForm;