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
