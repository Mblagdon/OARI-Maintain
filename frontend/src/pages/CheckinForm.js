import React, { useState } from 'react';

function CheckinForm({ equipmentId, onCheckin }) {
    const [checkinDate, setCheckinDate] = useState('');
    const [comments, setComments] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!checkinDate) {
            alert('Please select a check-in date.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/checkin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    equipment_id: equipmentId, // Assuming you pass the equipment ID when calling this form
                    checkin_date: checkinDate,
                    comments: comments,
                }),
            });

            if (!response.ok) {
                throw new Error('Check-in failed');
            }

            // Perform any additional actions on successful check-in
            onCheckin(); // Callback to update the parent state
            alert('Equipment checked in successfully');
            setIsLoading(false);
        } catch (error) {
            console.error('Check-in error:', error);
            alert('Failed to check in equipment');
            setIsLoading(false);
            setError(error.message);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Check-in Date:
                <input
                    type="datetime-local"
                    value={checkinDate}
                    onChange={e => setCheckinDate(e.target.value)}
                    disabled={isLoading}
                />
            </label>
            <label>
                Comments:
                <textarea
                    value={comments}
                    onChange={e => setComments(e.target.value)}
                    disabled={isLoading}
                />
            </label>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Checking In...' : 'Check In'}
            </button>
        </form>
    );
}

export default CheckinForm;
