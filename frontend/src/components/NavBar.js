import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/equipment">Equipment List</Link></li>
                <li><Link to="/maintenance">Maintenance Schedule</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;

