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
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useUserProfile } from '../pages/UserProfileContext';
import '../pages/CSS/NavBar.css';

// Create a wrapper component for NavLink
const NavLinkWrapper = ({ children, ...props }) => {
    return <NavLink {...props}>{children}</NavLink>;
};

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
        <Navbar className="purple-navbar" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={NavLinkWrapper} to="/">Drone Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLinkWrapper} to="/" end>Home Page</Nav.Link>
                        <Nav.Link as={NavLinkWrapper} to="/equipment">Equipment List</Nav.Link>
                        <Nav.Link as={NavLinkWrapper} to="/add-equipment">Add Equipment</Nav.Link>
                        <Nav.Link as={NavLinkWrapper} to="/maintenance">Maintenance Schedule</Nav.Link>
                        <Nav.Link as={NavLinkWrapper} to="/add-maintenance">Add Maintenance</Nav.Link>
                        <Nav.Link as={NavLinkWrapper} to="/weather">Weather</Nav.Link>
                        <Nav.Link as={NavLinkWrapper} to="/checkout-checkin">Check-in/Check-out</Nav.Link>
                    </Nav>
                    {isAuthenticated && userName && (
                        <Navbar.Text className="nav-user-name">
                            Welcome, {userName}
                        </Navbar.Text>
                    )}
                    {isAuthenticated ? (
                        <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Button variant="outline-light" onClick={() => instance.loginRedirect()}>Login</Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;



