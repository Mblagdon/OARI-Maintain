/**
 * AuthContext.js
 *
 * This file implements a context and provider for managing authentication state across a React application
 * using Microsoft's Authentication Library (MSAL). It encapsulates the logic for determining if a user is
 * authenticated based on their account's presence in the MSAL instance. The authentication state is updated
 * in response to login and logout events. This context is designed to provide components within the application
 * with access to the authentication state and to ensure that authentication logic is centralized and easily
 * maintainable. The `AuthProvider` component manages the authentication state and provides it to the rest of
 * the application through a React context. The `useAuth` hook is a convenience hook for accessing the authentication
 * state from within components that are children of the `AuthProvider`.
 */


import React, { createContext, useContext, useEffect, useState } from 'react';
import { EventType } from '@azure/msal-browser';
import { msalInstance } from './msalService';

// Creates a React context for authentication state. This will be used to provide and consume the authentication state in different components.
const AuthContext = createContext();

// Defines the authentication provider component. This component wraps around part or all of the
// app and provides the authentication state to all children.
export const AuthProvider = ({ children }) => {
    // State hook to keep track of authentication status (true if the user is authenticated, false otherwise).
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Effect hook to initialize and update the authentication status when the component mounts or updates.
    useEffect(() => {
        // Immediately check if any accounts are present in the MSAL instance to set the initial authentication state.
        const accounts = msalInstance.getAllAccounts();
        setIsAuthenticated(accounts.length > 0);

        // Adds an event callback to the MSAL instance to listen for login and logout success events.
        // Updates the authentication state based on the presence of accounts in the MSAL instance.
        const callbackId = msalInstance.addEventCallback((event) => {
            if (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.LOGOUT_SUCCESS) {
                const currentAccounts = msalInstance.getAllAccounts();
                setIsAuthenticated(currentAccounts.length > 0);
            }
        });

        // Cleanup function to remove the event callback from the MSAL instance when the
        // component unmounts or before the effect runs again.
        return () => {
            if (callbackId) {
                msalInstance.removeEventCallback(callbackId);
            }
        };
    }, []);

    // Cleanup function to remove the event callback from the MSAL instance when the component unmounts or before the effect runs again.
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
