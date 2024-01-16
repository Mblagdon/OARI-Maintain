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
            </ul>
        </nav>
    );
}

export default NavBar;



