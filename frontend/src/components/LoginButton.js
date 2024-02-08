/**
 * LoginButton.js
 *
 * This component renders a button that initiates the login process. It uses the MSAL library to
 * handle the authentication flow with Microsoft Azure Active Directory. Upon clicking the button,
 * users are redirected to sign in with their Microsoft credentials.
 */

import React from 'react';
import { useMsal } from '@azure/msal-react';

const LoginButton = () => {
    const { instance } = useMsal();
    // Function to handle login when the button is clicked
    const handleLogin = () => {
        // Attempt to login via a redirect and handle any errors
        instance.loginRedirect().catch(e => {
            console.error(e);
        });
    };

    return (
        <button onClick={handleLogin}>Login With Microsoft</button>
    );
};

export default LoginButton;
