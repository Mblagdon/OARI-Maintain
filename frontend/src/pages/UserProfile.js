
import React, { useEffect, useState } from 'react';
import { callGraphApi } from '../components/oauth/graphService';

const UserProfile = ({ onProfileLoaded }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await callGraphApi();
                setProfileData(userData);
                onProfileLoaded(userData.displayName); // This is the new line
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [onProfileLoaded]); // Add onProfileLoaded to the dependency array



    if (error) {
        return <div>{error}</div>; // Display a user-friendly error message
    }

    if (!profileData) {
        return null; // Or handle this case in a user-friendly way
    }

    return (
        <div>
            <h1>Welcome {profileData.displayName}</h1>
        </div>
    );
};

export default UserProfile;
