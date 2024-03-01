/**
 * UserProfile.js
 *
 * A component that fetches and displays the profile information of the signed-in user. It uses the
 * Microsoft Graph API to retrieve the user's display name, email, job title, and other profile details.
 * It is designed to be used as part of the user authentication flow to provide a personalized experience.
 */

import React, { useEffect, useState, useContext } from 'react';
import { callGraphApi } from '../components/oauth/graphService';
import { useAuth } from '../components/oauth/AuthContext'; // Import the useAuth hook

const UserProfile = ({ onProfileLoaded }) => {
    // State hooks for user profile data
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { isAuthenticated } = useAuth(); // Use the useAuth hook to check if the user is authenticated

    useEffect(() => {
        // Function to fetch user profile from Microsoft Graph API
        const fetchData = async () => {
            if (isAuthenticated) { // Only fetch data if the user is authenticated
                try {
                    const userData = await callGraphApi();
                    setProfileData(userData);
                    onProfileLoaded(userData.displayName);
                    setLoading(false); // Set loading to false after data is fetched
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setError(error);
                    setLoading(false); // Set loading to false even if there's an error
                }
            }
        };

        fetchData();
    }, [isAuthenticated, onProfileLoaded]); // Add isAuthenticated to the dependency array

    if (error) {
        return <div>{error.toString()}</div>; // Display a user-friendly error message
    }

    if (!profileData) {
        return null;
    }

};

export default UserProfile;

