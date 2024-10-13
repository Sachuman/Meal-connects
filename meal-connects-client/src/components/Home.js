import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file
import logo from '../assets/MealConnect.jpeg'; // Correct import path

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <div className="home-content">
          <img src={logo} alt="MealConnect Logo" className="home-logo" />
          <p className="home-subtitle">Connecting shelters and restaurants for social good</p>
          <p className="home-description">
            Our platform helps connect shelters with restaurants to reduce food waste and provide meals to those in need.
            Register your organization to get started.
          </p>
          <Link to="details">
            <button className="home-button">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}