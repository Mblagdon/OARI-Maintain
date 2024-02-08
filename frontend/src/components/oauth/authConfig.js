// MSAL configuration
export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_AZURE_CLIENT_ID, // This is your application/client ID from Azure AD
        authority: process.env.REACT_APP_AZURE_AUTHORITY, // This is your tenant ID
        redirectUri: process.env.REACT_APP_AZURE_REDIRECT_URI // This is your redirect URI
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your token cache will be stored
        storeAuthStateInCookie: true, // Set to true to store auth state in cookies for server-side rendering
    }
};

// Scopes you add here will be prompted for consent during login
export const loginRequest = {
    scopes: ["openid",
        "profile",
        "User.Read",
        "Calendars.ReadWrite",
        "Mail.ReadWrite"
    ]
};

// Add here scopes for access token to be used at Microsoft Graph API endpoints.
export const tokenRequest = {
    scopes: ["Mail.ReadWrite", "Calendars.ReadWrite"]
};

// Microsoft Graph API endpoint configuration
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me" // This is the Graph API endpoint to get user details
};

