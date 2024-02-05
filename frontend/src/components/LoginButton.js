import React from 'react';
import { useMsal } from '@azure/msal-react';

const LoginButton = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect().catch(e => {
            console.error(e);
        });
    };

    return (
        <button onClick={handleLogin}>Login With Microsoft</button>
    );
};

export default LoginButton;
