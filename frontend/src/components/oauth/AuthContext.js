import React, { createContext, useContext, useEffect, useState } from 'react';
import { EventType } from '@azure/msal-browser';
import { msalInstance } from './msalService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const accounts = msalInstance.getAllAccounts();
        setIsAuthenticated(accounts.length > 0);


        const callbackId = msalInstance.addEventCallback((event) => {
            if (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.LOGOUT_SUCCESS) {
                const currentAccounts = msalInstance.getAllAccounts();
                setIsAuthenticated(currentAccounts.length > 0);
            }
        });

        // This function will be called when the component is unmounted or before the effect runs again.
        return () => {
            if (callbackId) {
                msalInstance.removeEventCallback(callbackId);
            }
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to allow other components to access the authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
