/**
 * UserProfileContext.js
 *
 * This context provider component is responsible for fetching and storing the user profile data.
 * It makes use of the Microsoft Graph API to get the signed-in user's profile and provides this data
 * to all child components using React Context API.
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { callGraphApi } from '../components/oauth/graphService';

// Create a context for the user profile
const UserProfileContext = createContext(null);


/**
 * UserProfileProvider component that wraps the children components and provides
 * user profile data to them. It fetches the user's profile data once and provides
 * it through the context, so it can be accessed from any component in the app.
 */
export const UserProfileProvider = ({ children }) => {
    // State to store user profile data, loading status, and any errors
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Effect to fetch user profile data when the component is mounted
    useEffect(() => {
        // Function to fetch user data from Microsoft Graph API
        const fetchData = async () => {
            try {
                const userData = await callGraphApi();
                setProfileData(userData); // Set the user data in state
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error(error);
                setError(error); // Set any errors that occur during fetch
                setLoading(false); // Ensure loading is set to false even if there's an error
            }
        };

        fetchData();
    }, []);

    // Provide the user profile data, loading status, and error to children
    return (
        <UserProfileContext.Provider value={{ profileData, loading, error }}>
            {children}
        </UserProfileContext.Provider>
    );
};

export const useUserProfile = () => useContext(UserProfileContext);