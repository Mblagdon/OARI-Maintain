/**
 * graphService.js
 *
 * Service functions for interacting with Microsoft Graph API.
 * Includes functions to create calendar events and fetch user profile data.
 */

import { msalInstance } from './msalService';
import { graphConfig, loginRequest, tokenRequest } from './authConfig';
import {InteractionRequiredAuthError} from "@azure/msal-browser";

// Helper method to fetch equipment details by ID
async function fetchEquipmentDetails(equipmentId) {
    console.log("fetchEquipmentDetails called with ID:", equipmentId);
    try {
        const response = await fetch(`/api/equipment/${equipmentId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch equipment details with status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched equipment details:", data); // Added log
        return data;
        return await response.json();
    } catch (error) {
        console.error('Error fetching equipment details:', error);
        throw error;
    }
}

// Function to create a calendar event in the user's Outlook calendar
export const createCalendarEvent = async (maintenanceDetails) => {
    try {
        const accounts = msalInstance.getAllAccounts();
        console.log("createCalendarEvent called with:", maintenanceDetails); // Added log
        if (accounts.length <= 0) {
            throw new Error('No accounts found');
        }

        console.log("Attempting to fetch details for equipment ID:", maintenanceDetails.equipment_id); // Added log
        if (!maintenanceDetails.equipment_id) {
            console.error("No equipment_id provided in maintenanceDetails", maintenanceDetails);
            throw new Error("No equipment_id provided in maintenanceDetails");
        }

        // Fetch equipment details
        const equipmentDetails = await fetchEquipmentDetails(maintenanceDetails.equipment_id);
        const equipmentName = equipmentDetails.equipment_name;
        const assetNumber = equipmentDetails.asset_number;

        const request = {
            ...tokenRequest,
            account: accounts[0]
        };

        const response = await msalInstance.acquireTokenSilent(request);
        const accessToken = response.accessToken;

        const attendees = maintenanceDetails.attendees ? maintenanceDetails.attendees.map(email => ({
            emailAddress: { address: email },
            type: "required"
        })) : [];

        const event = {
            subject: `Maintenance for ${equipmentName} (${assetNumber})`,
            body: {
                contentType: "HTML",
                content: maintenanceDetails.content
            },
            start: {
                dateTime: maintenanceDetails.startDateTime,
                timeZone: "Pacific Standard Time"
            },
            end: {
                dateTime: maintenanceDetails.endDateTime,
                timeZone: "Pacific Standard Time"
            },
            location: {
                displayName: maintenanceDetails.location
            },
            attendees: attendees
        };

        const headers = new Headers({
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        });

        const createEventRequest = await fetch(`${graphConfig.graphMeEndpoint}/events`, {
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

        // Handle InteractionRequiredAuthError
        if (error.errorCode === "interaction_required" || error.name === "InteractionRequiredAuthError") {
            try {
                const interactiveResponse = await msalInstance.acquireTokenPopup(tokenRequest);
                if (interactiveResponse) {
                    return await createCalendarEvent(maintenanceDetails);
                }
            } catch (interactiveError) {
                console.error('Error acquiring token interactively:', interactiveError);
                throw interactiveError;
            }
        } else {
            throw error;
        }
        console.log("Maintenance Details:", maintenanceDetails);
        console.log("Equipment ID:", maintenanceDetails.equipment_id);
    }
};

// Function to call the Microsoft Graph API and get user profile information
export const callGraphApi = async () => {
    try {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length <= 0) throw new Error('No accounts found');

        const silentRequest = {
            ...tokenRequest,
            account: accounts[0]
        };

        // Attempt to acquire token silently
        const response = await msalInstance.acquireTokenSilent(silentRequest);
        const accessToken = response.accessToken;

        // Use the access token to call Microsoft Graph API
        const headers = new Headers({
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        });
        const graphResponse = await fetch(graphConfig.graphMeEndpoint, { headers });


        return await graphResponse.json();
    } catch (error) {
        console.error('Error during token acquisition or fetching user data:', error);
        // Check if interaction is required
        if (error instanceof InteractionRequiredAuthError) {
            try {
                // Fallback to interactive sign-in method
                const interactiveResponse = await msalInstance.acquireTokenPopup(tokenRequest);
                // Optionally, you can recall callGraphApi() or continue your logic with the newly acquired token
                return interactiveResponse; // or callGraphApi()
            } catch (interactiveError) {
                console.error('Error acquiring token interactively:', interactiveError);
                throw interactiveError;
            }
        } else {
            // Handle other types of errors (e.g., network errors)
            throw error;
        }
    }
};

