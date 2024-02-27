/**
 * Home.js
 *
 * The Home component serves as the landing page for the Drone Maintenance Web Application.
 * It provides a welcoming interface and often includes a summary or introduction to the
 * application. This component may display general information, quick links to important
 * sections, or an overview of the application's features and functionalities.
 */

import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import addIcon from './Home Pictures/add.png';
import checkIcon from './Home Pictures/check.png';
import checkinIcon from './Home Pictures/checkin.png';
import weatherIcon from './Home Pictures/weather.png';
import calenderIcon from './Home Pictures/calender.png';
import { useMsal } from "@azure/msal-react";
import '../pages/CSS/HomePage.css';

const HomePage = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect();
    };

    return (
        <Container fluid className="p-3">
            <Row className="section-text">
                <Col>
                    <h1>Drone Equipment and Maintenance</h1>
                    <p>Streamlined management for drone enthusiasts and professionals.</p>
                </Col>
            </Row>

            <Row className="section-text">
                <Col>
                    <p></p>
                    <h2>Why Use Our App?</h2>
                    <p>Anyone who works with drones and drone equipment knows how tedious the maintenance can get, especially when you have multiple pieces. This application will allow you to seamlessly keep track of your equipment, schedule and review any upcoming maintenance, check weather conditions, and see if it's suitable for drone use!</p>
                </Col>
            </Row>

            <Row className="mb-3 text-center">
                {[
                    {title: "Equipment List", img: checkIcon, text: "Manage your drones and drone equipment on the Equipment List page, where you can view all added items and their specifications."},
                    {title: "Add Equipment", img: addIcon, text: "Add new drones or equipment easily through a form, and manage them all in one convenient location."},
                    {title: "Maintenance Schedule", img: calenderIcon, text: "Automate your maintenance schedules to keep track of all upcoming services, with options to edit or delete as needed."},
                    {title: "Add Maintenance", img: addIcon, text: "Quickly add upcoming maintenance tasks and be notified as the date approaches, ensuring you never miss a service."},
                    {title: "Weather", img: weatherIcon, text: "Check the weather for the location you'll be in, and compare if the equipment being used is within range!"},
                    {title: "Checkin/Checkout", img: checkinIcon, text: "Check-in and check-out a piece of equipment that you use!"}
                ].map((feature, index) => (
                    <Col key={index} md={4} className="mb-3">
                        <Card className="h-100 d-flex flex-column">
                            <Card.Img variant="top" src={feature.img} className="feature-icon" style={{ width: '80px', height: '80px' }} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="card-title-bold">{feature.title}</Card.Title>
                                <Card.Text>{feature.text}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default HomePage;
