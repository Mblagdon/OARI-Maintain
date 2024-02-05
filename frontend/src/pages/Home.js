/**
 * Home.js
 *
 * The Home component serves as the landing page for the Drone Maintenance Web Application.
 * It provides a welcoming interface and often includes a summary or introduction to the
 * application. This component may display general information, quick links to important
 * sections, or an overview of the application's features and functionalities.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import addIcon from "C:\\Users\\Marcu\\WebstormProjects\\workterm\\frontend\\src\\pages\\Home Pictures\\add.png"
import checkIcon from "C:\\Users\\Marcu\\WebstormProjects\\workterm\\frontend\\src\\pages\\Home Pictures\\check.png"
import checkinIcon from "C:\\Users\\Marcu\\WebstormProjects\\workterm\\frontend\\src\\pages\\Home Pictures\\checkin.png"
import weatherIcon from "C:\\Users\\Marcu\\WebstormProjects\\workterm\\frontend\\src\\pages\\Home Pictures\\weather.png"
import calenderIcon from "C:\\Users\\Marcu\\WebstormProjects\\workterm\\frontend\\src\\pages\\Home Pictures\\calender.png"
import LoginButton from "../components/LoginButton";
import {useMsal} from "@azure/msal-react";

const HomePage = () => {

    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect();
    };

    return (
        <div className="home-container">
            <section className="hero">
                <h1>Drone Equipment and Maintenance</h1>
                <p>Streamlined management for drone enthusiasts and professionals.</p>
                <p>Please login to manage your drones and equipment</p>
            </section>

            <section className="intended-users">
                <h2>Why Use Our App?</h2>
                <p>Anyone who works with drones and drone equipment knows how tedious the maintenance can get, especially
                    when you have multiple pieces. This application will allow you to seamlessly keep track of your equipment,
                    schedule and review any upcoming maintenance, check weather conditions, and see if it's suitable for drone use!</p>
                {/* Placeholder for image */}
                <div className="user-image-placeholder"></div>
            </section>

            <section className="features-overview">
                <div className="feature-item">
                    <img src={checkIcon} alt="Equipment List" className="feature-icon" />
                    <h3>Equipment List</h3>
                    <p>Manage your drones and drone equipment on the Equipment List page, where you can view all added items and their specifications.</p>
                </div>
                <div className="feature-item">
                    <img src={addIcon} alt="Add Equipment" className="feature-icon" />
                    <h3>Add Equipment</h3>
                    <p>Add new drones or equipment easily through a form, and manage them all in one convenient location.</p>
                </div>
                <div className="feature-item">
                    <img src={calenderIcon} alt="Maintenance Schedule" className="feature-icon" />
                    <h3>Maintenance Schedule</h3>
                    <p>Automate your maintenance schedules to keep track of all upcoming services, with options to edit or delete as needed.</p>
                </div>
                <div className="feature-item">
                    <img src={addIcon} alt="Add Equipment" className="feature-icon" />
                    <h3>Add Maintenance</h3>
                    <p>Quickly add upcoming maintenance tasks and be notified as the date approaches, ensuring you never miss a service.</p>
                </div>
                <div className="feature-item">
                    <img src={weatherIcon} alt="Weather" className="feature-icon" />
                    <h3>Weather</h3>
                    <p>Check the weather for the location you'll be in, and compare if the equipment being used is within range!</p>
                </div>
                <div className="feature-item">
                    <img src={checkinIcon} alt="Checkin/Checkout" className="feature-icon" />
                    <h3>Checkin/Checkout</h3>
                    <p>Check-in and check-out a piece of equipment that you use!</p>
                </div>
            </section>

            <section className="call-to-action">
                <Link to="/signup" className="btn btn-primary">Join Us Now</Link>
            </section>

        </div>
    );
};

export default HomePage;
