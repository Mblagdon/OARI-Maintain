import { tokenRequest, graphConfig } from './authConfig';
import { msalInstance } from './index';

export const callGraphApi = async () => {
    try {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
            const request = {
                ...tokenRequest, // Use tokenRequest here
                account: accounts[0]
            };
            const response = await msalInstance.acquireTokenSilent(request);
            const accessToken = response.accessToken;

            // Use the accessToken to call the Microsoft Graph API
            const headers = new Headers();
            const bearer = `Bearer ${accessToken}`;

            headers.append("Authorization", bearer);

            const options = {
                method: "GET",
                headers: headers
            };

            const graphResponse = await fetch(graphConfig.graphMeEndpoint, options);
            return await graphResponse.json();
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

