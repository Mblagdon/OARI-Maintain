import React, { createContext, useState, useContext, useEffect } from 'react';
import { callGraphApi } from '../components/oauth/graphService';

const UserProfileContext = createContext(null);

export const UserProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await callGraphApi();
                setProfileData(userData);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <UserProfileContext.Provider value={{ profileData, loading, error }}>
            {children}
        </UserProfileContext.Provider>
    );
};

export const useUserProfile = () => useContext(UserProfileContext);