/**
 * msalService.js
 *
 * Initializes the MSAL instance using configuration settings defined in authConfig.js.
 * This service is used throughout the application to interact with MSAL for authentication
 * and token acquisition.
 */

import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';

// Create an instance of PublicClientApplication with the configuration settings
export const msalInstance = new PublicClientApplication(msalConfig);
