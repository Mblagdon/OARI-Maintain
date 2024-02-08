/**
 * AuthHandler.js
 *
 * Component responsible for handling the authentication state of the user.
 * It checks the current authentication status and performs sign-in or sign-out
 * operations as necessary, redirecting the user based on their auth state.
 */

import React, { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';

const AuthHandler = () => {
    const { instance, inProgress } = useMsal();
    const navigate = useNavigate();

    useEffect(() => {
        // Handle user authentication state when component mounts
        if (inProgress === "none") {
            const accounts = instance.getAllAccounts();
            if (accounts.length > 0) {
                // User is logged in
                navigate('/');// Redirect to home if logged in
            } else {
                // No user logged in, redirect to login page or attempt silent sign-in
                instance.ssoSilent({
                    scopes: ["openid", "profile", "User.Read"],
                    loginHint: "user@domain.com"
                }).then(() => {
                    navigate('/');
                }).catch((error) => {
                    // Silent sign-in failed, prompt user to sign-in interactively
                    instance.loginRedirect({
                        scopes: ["openid", "profile", "User.Read"],
                    }).catch(e => {
                        console.error(e);
                    });
                });
            }
        }
    }, [inProgress, instance, navigate]);

    // Render a loading indicator until the inProgress state is "none"
    if (inProgress !== "none") return <div>Loading...</div>;

    // Render nothing if no authentication is in progress
    return null;
};

export default AuthHandler;
