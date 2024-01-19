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
import '../App.css';

function NavBar() {
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
            </ul>
        </nav>
    );
}

export default NavBar;



