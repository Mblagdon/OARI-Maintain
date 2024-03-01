/**
 * UserProfileContext.js
 *
 * This context provider component is responsible for fetching and storing the user profile data.
 * It makes use of the Microsoft Graph API to get the signed-in user's profile and provides this data
 * to all child components using React Context API.
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { callGraphApi } from '../components/oauth/graphService';
import { useAuth } from '../components/oauth/AuthContext'

// Create a context for the user profile
const UserProfileContext = createContext(null);


/**
 * UserProfileProvider component that wraps the children components and provides
 * user profile data to them. It fetches the user's profile data once and provides
 * it through the context, so it can be accessed from any component in the app.
 */
export const UserProfileProvider = ({ children }) => {
    // State to store user profile data, loading status, and any errors
    const { isAuthenticated } = useAuth(); // Use the useAuth hook to get the current authentication status
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Effect to fetch user profile data when the component is mounted
    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated) {
                try {
                    console.log("Attempting to fetch user data in UserProfileProvider"); // Log attempt
                    const userData = await callGraphApi();
                    console.log("User data fetched:", userData); // Log fetched data
                    setProfileData(userData);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching user data in UserProfileProvider:", error); // Log any errors
                    setError(error);
                    setLoading(false);
                }
            } else {
                setProfileData(null);
                setLoading(false);
            }
        };

        fetchData();
    }, [isAuthenticated]);// Re-run the effect if the authentication status changes

    // Provide the user profile data, loading status, and error to children
    return (
        <UserProfileContext.Provider value={{ profileData, loading, error }}>
            {children}
        </UserProfileContext.Provider>
    );
};

export const useUserProfile = () => useContext(UserProfileContext);