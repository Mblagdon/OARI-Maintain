/**
 * Footer.js
 *
 * This file defines the Footer component for the React application.
 * The Footer is a presentational component that renders the bottom section of the web page.
 * It typically contains copyright information, contact details, or any other common information
 * that should be visible on all pages. In this project, the Footer component includes a linked image
 * that directs users to the CNA Applied Research website when clicked.
 */

import React from 'react';
import footerLogo from 'C:\\Users\\Marcu\\WebstormProjects\\workterm\\frontend\\src\\components\\CNAResearch.png';

function Footer() {
    return (
        <footer style={{ backgroundColor: 'rebeccapurple', color: '#fff', padding: '10px 0', textAlign: 'center' }}>
            <a href="https://www.cna.nl.ca/research-and-innovation/" target="_blank" rel="noopener noreferrer">
                <img src={footerLogo} alt="CNA Applied Research" style={{ maxWidth: '100%', height: 'auto' }} />
            </a>
        </footer>
    );
}

export default Footer;
