import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/MealConnect.jpeg'; // Correct import path
import './Navbar.css';
import logo from '../assets/MealConnect.jpeg'; // Correct import path

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
<<<<<<< Updated upstream
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
=======
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
>>>>>>> Stashed changes
                        <img src={logo} alt="MealConnect Logo" className="navbar-logo-image" />
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/display' className="nav-links" onClick={closeMobileMenu}>
                                Display
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/details' className="nav-links" onClick={closeMobileMenu}>
                                Details
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
