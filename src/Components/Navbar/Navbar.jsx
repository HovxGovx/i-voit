import React, { useState } from 'react';
import "./NavbarStyles.css";
import logo from '../Assets/Icons/covoiturage.png';
import ajout from '../Assets/Icons/utilisateur-du-cercle.png';

const Navbar = ({ onOptionChange }) => {
    const [activeButton, setActiveButton] = useState('trajet');

    const handleClick = (option) => {
        if (onOptionChange) {
            onOptionChange(option);
           
        }
         setActiveButton(option);
    };
    

    return (
        <div>
            <nav id='navbar'>
                <img
                    src={logo}
                    id='logo-15'
                    width='59'
                    height='58'
                    viewBox="0 0 59 58"
                    fill="none"
                    alt='noalt'
                    className='logo'
                />

                <div id="milieu">
                    <ul id='central'>
                        <li>
                            <button
                                className={activeButton === 'trajet' ? "active" : ""}
                                onClick={() => handleClick('trajet')}
                            >
                                Trajet
                            </button>
                        </li>
                        <li>
                            <button
                                className={activeButton === 'partager' ? "active" : ""}
                                onClick={() => handleClick('partager')}
                            >
                                Partager
                            </button>
                        </li>
                        <li>
                            <button
                                className={activeButton === 'compte' ? "active" : ""}
                                onClick={() => handleClick('compte')}
                            >
                                Compte
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="navbar">
                    <div className="dropdown">
                        <button
                            className={activeButton === 'connexion' ? "dropbtn active" : "dropbtn"}
                            
                        >
                            <img
                                src={ajout}
                                id='logo-15'
                                width='39'
                                height='39'
                                viewBox="0 0 39 39"
                                fill="none"
                                alt='noalt'
                            />
                            <i className="fa fa-caret-down test" />
                        </button>
                        <div className="dropdown-content">
                            <button onClick={() => handleClick('connexion')}>
                                Connexion <i className="fa fa-caret-right test2" />
                            </button>
                            <button onClick={() => handleClick('inscription')}>
                                Inscription <i className="fa fa-caret-right test2" />
                            </button>
                            <div className="esthe">
                                <button
                                    className={activeButton === 'trajet' ? "active" : ""}
                                    onClick={() => handleClick('trajet')}
                                >
                                        Trajet <i className="fa fa-caret-right test3" />
                                </button>
                                <button
                                    className={activeButton === 'compte' ? "active" : ""}
                                    onClick={() => handleClick('compte')}
                                >
                                    Compte <i className="fa fa-caret-right test4" />
                                </button>
                                <button
                                    className={activeButton === 'partager' ? "active" : ""}
                                    onClick={() => handleClick('partager')}
                                >
                                    Partager <i className="fa fa-caret-right test5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
