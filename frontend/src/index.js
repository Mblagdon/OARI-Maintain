
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './components/oauth/msalService';
import { UserProfileProvider } from './pages/UserProfileContext';
import {AuthProvider} from "./components/oauth/AuthContext";

// Polyfill for window.crypto.randomUUID
if (!window.crypto.randomUUID) {
    window.crypto.randomUUID = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </MsalProvider>
    </React.StrictMode>
);
