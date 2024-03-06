/**
 * ProtectedRoute.js
 *
 * This component is designed to wrap around any React component or page that requires user authentication
 * before access is granted. It leverages the authentication state managed by `AuthContext` to determine if
 * the user is currently authenticated. If the user is not authenticated, instead of rendering the children
 * components passed to `ProtectedRoute`, it displays a message instructing the user to log in and provides
 * a button to navigate back to the homepage. This ensures that sensitive or user-specific pages are not
 * accessible without proper authentication, enhancing the application's security and user experience.
 *
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../../pages/CSS/gohomebutton.css';


const ProtectedRoute = ({ children }) => {
    // Extracts `isAuthenticated` from the `useAuth` hook to check if the user is authenticated.
    const { isAuthenticated } = useAuth();
    // `useNavigate` hook from React Router for navigation.
    const navigate = useNavigate();

    // Checks if the user is not authenticated.
    if (!isAuthenticated) {
        // User not authenticated, show message and button to redirect to home
        return (
            <div className="centeredContainer">
                <h2>Please log in to access this page!</h2>
                <button onClick={() => navigate('/')} className="centeredButton">Go to Homepage</button>
            </div>
        );
    }
    // If the user is authenticated, renders the child components passed to `ProtectedRoute`.
    return children;
};

export default ProtectedRoute;
