
import { msalInstance } from './msalService';
import {graphConfig, loginRequest} from './authConfig';

export const createCalendarEvent = async (maintenanceDetails) => {
    try {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length <= 0) {
            throw new Error('No accounts found');
        }

        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        const response = await msalInstance.acquireTokenSilent(request);
        const accessToken = response.accessToken;

        const event = {
            subject: maintenanceDetails.subject,
            body: {
                contentType: "HTML",
                content: maintenanceDetails.content
            },
            start: {
                dateTime: maintenanceDetails.startDateTime,
                timeZone: "Newfoundland Standard Time"
            },
            end: {
                dateTime: maintenanceDetails.endDateTime,
                timeZone: "Newfoundland Standard Time"
            },
            location: {
                displayName: maintenanceDetails.location
            },
            attendees: maintenanceDetails.attendees.map(email => ({
                emailAddress: { address: email },
                type: "required"
            }))
        };

        const headers = new Headers({
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        });

        const createEventRequest = await fetch(`https://graph.microsoft.com/v1.0/me/events`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(event)
        });

        const result = await createEventRequest.json();

        if (!createEventRequest.ok) {
            throw new Error(`Could not create calendar event, status: ${createEventRequest.status}`);
        }

        return result;
    } catch (error) {
        console.error('Error creating calendar event:', error);
        throw error;
    }
};

export const callGraphApi = async () => {
    try {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length <= 0) {
            throw new Error('No accounts found');
        }
        const request = {
            ...loginRequest,
            account: accounts[0]
        };
        const response = await msalInstance.acquireTokenSilent(request);
        const accessToken = response.accessToken;

        const headers = new Headers({
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        });

        const graphResponse = await fetch(graphConfig.graphMeEndpoint, {
            method: 'GET',
            headers: headers
        });

        if (!graphResponse.ok) {
            throw new Error(`Error getting user data: ${graphResponse.statusText}`);
        }

        return await graphResponse.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};