import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../../pages/CSS/gohomebutton.css';


const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        // User not authenticated, show message and button to redirect to home
        return (
            <div className="centeredContainer">
                <h2>Please log in to access this page!</h2>
                <button onClick={() => navigate('/')} className="centeredButton">Go to Homepage</button>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
