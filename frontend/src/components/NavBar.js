/**
 * NavBar.js
 *
 * This component renders the navigation bar for the application. It provides links that allow users
 * to navigate between different views, such as the home page, equipment list, equipment addition form,
 * and maintenance schedule. It is a key part of the user interface, ensuring that users can easily
 * move around the application and access its various functionalities.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import '../App.css';
import { useUserProfile } from '../pages/UserProfileContext';

function NavBar() {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const { profileData, loading, error } = useUserProfile();

    const handleLogout = () => {
        instance.logoutRedirect({ postLogoutRedirectUri: "/" })
            .catch((error) => {
                console.error(error);
            });
    };

    // If there is no error and not loading, display the user's name
    const userName = !loading && !error ? profileData?.displayName : '';

        return (
        <nav className="nav-bar">
            <ul className="nav-ul">
                <li className="nav-li">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'nav-link active-link' : 'nav-link'
                        }
                    >
                        Home Page
                    </NavLink>
                </li>
                <li className="nav-li">
                    <NavLink
                        to="/equipment"
                        className={({ isActive }) =>
                            isActive ? 'nav-link active-link' : 'nav-link'
                        }
                    >
                        Equipment List
                    </NavLink>
                </li>
                <li className="nav-li">
                    <NavLink
                        to="/add-equipment"
                        className={({ isActive }) =>
                            isActive ? 'nav-link active-link' : 'nav-link'
                        }
                    >
                        Add Equipment
                    </NavLink>
                </li>
                <li className="nav-li">
                    <NavLink
                        to="/maintenance"
                        className={({ isActive }) =>
                            isActive ? 'nav-link active-link' : 'nav-link'
                        }
                    >
                        Maintenance Schedule
                    </NavLink>
                </li>
                <li className="nav-li">
                    <NavLink
                        to="/add-maintenance"
                        className={({ isActive }) =>
                            isActive ? 'nav-link active-link' : 'nav-link'
                        }
                    >
                        Add Maintenance
                    </NavLink>
                </li>
                <li className="nav-li">
                    <NavLink
                        to="/weather"
                        className={({ isActive }) =>
                            isActive ? 'nav-link active-link' : 'nav-link'
                        }
                    >
                        Weather
                    </NavLink>
                </li>
                <li className="nav-li">
                    <NavLink
                        to="/checkout-checkin"
                        className={({ isActive }) =>
                            isActive ? 'nav-link active-link' : 'nav-link'
                        }
                    >
                        Checkin/Checkout
                    </NavLink>
                </li>
                <li className="nav-li">
                    {isAuthenticated && userName && (
                        <span className="nav-user-name">Welcome, {userName}</span>
                    )}
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="nav-link">
                            Logout
                        </button>
                    ) : (
                        <button onClick={() => instance.loginRedirect()} className="nav-link">
                            Login
                        </button>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;



