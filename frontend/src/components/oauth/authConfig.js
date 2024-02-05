export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_AZURE_CLIENT_ID,
        authority: process.env.REACT_APP_AZURE_AUTHORITY,
        redirectUri: window.location.origin + '/auth-redirect'
    }
};

