/**
 * UserProfile.js
 *
 * A component that fetches and displays the profile information of the signed-in user. It uses the
 * Microsoft Graph API to retrieve the user's display name, email, job title, and other profile details.
 * It is designed to be used as part of the user authentication flow to provide a personalized experience.
 */

import React, { useEffect, useState } from 'react';
import { callGraphApi } from '../components/oauth/graphService';

const UserProfile = ({ onProfileLoaded }) => {
    // State hooks for user profile data
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch user profile from Microsoft Graph API
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
    }, [onProfileLoaded]); // Add dependency to rerun the effect if onProfileLoaded changes


    // Render logic based on error state, and profile data availability
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
