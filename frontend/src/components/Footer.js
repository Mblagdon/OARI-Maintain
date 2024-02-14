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
import footerLogo from './CNAResearch.png';
import '../App.css';

function Footer() {
    return (
        <footer className="footer d-flex align-items-center justify-content-center">
            <a href="https://www.cna.nl.ca/research-and-innovation/" target="_blank" rel="noopener noreferrer" className="footer-logo">
                <img src={footerLogo} alt="CNA Applied Research" style={{ maxWidth: '250px', marginRight: '300px' }} />
            </a>
            <div className="footer-contact">
                <strong>Our Address</strong><br />
                College of the North Atlantic<br />
                425 Topsail Rd. PO Box 1693, St. John’s, NL A1C 5P7<br />
                709-758-7474<br />
                <a href="mailto:ar@cna.nl.ca">ar@cna.nl.ca</a>
            </div>
        </footer>
    );
}

export default Footer;
