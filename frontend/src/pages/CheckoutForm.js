import React, { useState, useEffect } from 'react';

function CheckoutForm() {
    const [equipmentList, setEquipmentList] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState('');
    const [checkoutDate, setCheckoutDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEquipment = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/equipment');
                if (!response.ok) {
                    throw new Error('Could not fetch equipment list');
                }
                const data = await response.json();
                setEquipmentList(data);
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
                        <option key={equipment.id} value={equipment.id}>
                            {equipment.name}
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