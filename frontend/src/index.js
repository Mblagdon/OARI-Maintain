import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MsalProvider } from '@azure/msal-react';
import { msalInstance } from './components/oauth/msalService';
import { UserProfileProvider } from './pages/UserProfileContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <UserProfileProvider>
                <App />
            </UserProfileProvider>
        </MsalProvider>
    </React.StrictMode>
);
