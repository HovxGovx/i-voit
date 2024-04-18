import React, { useState,useEffect } from 'react';
import "./NavbarStyles.css";
import logo from '../Assets/Icons/covoiturage.png';
import ajout from '../Assets/Icons/utilisateur-du-cercle.png';
import axios from 'axios';

const Navbar = ({ onOptionChange,isLoggedIn, onLogout }) => {
    const [activeButton, setActiveButton] = useState('trajet');
    const [sessionInfo, setSessionInfo] = useState(null);
    const handleClick1 = (option) => {
        if (onOptionChange) {
            onOptionChange(option);
        }
         setActiveButton(option);
    };
    const handleClick = (option) => {
        if (onOptionChange) {
            onOptionChange(option);
        }
         setActiveButton(option);
         setSessionInfo(false);
         console.log(sessionInfo);
    };
    useEffect(() => {
        const fetchSessionInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8081/session-info', { withCredentials: true });
                if (response.data && response.data.session) {
                    setSessionInfo(true); 
                    console.log("connected")// Il y a des informations de session en cours
                } else {
                    setSessionInfo(false);
                    console.log("not connected") // Aucune information de session en cours
                }
            } catch (error) {
                console.error('Error fetching session info:', error);
            }
        };
        fetchSessionInfo();
    }, []);
    const handleClickLogOut = async () => {
        try {
             // Effectuer une requête HTTP POST au serveur pour déconnecter l'utilisateur
             const response = await axios.post('http://localhost:8081/logout');

             // Si la déconnexion réussit, appeler la fonction de déconnexion passée en tant que prop
             if (response.status === 200) {
                console.log('Déconnexion réussie.');
                setSessionInfo(false);
                onLogout();
                onOptionChange('connexion');
                setActiveButton('connexion');

                // fetchSessionInfo();
             } else {
                throw new Error('Erreur lors de la déconnexion');
             }
         
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error.message);
        }
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
                                onClick={() => handleClick1('trajet')}
                            >
                                Trajet
                            </button>
                        </li>
                        <li>
                            <button
                                className={activeButton === 'partager' ? "active" : ""}
                                onClick={() => handleClick1('partager')}
                            >
                                Partager
                            </button>
                        </li>
                        <li>
                            <button
                                className={activeButton === 'compte' ? "active" : ""}
                                onClick={() => handleClick1('compte')}
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
                                    {isLoggedIn? ( 
                                        <button onClick={() => handleClickLogOut('connexion')}>
                                            Se déconnecter <i className="fa fa-caret-right test2" />
                                        </button>
                                        
                                    ) : (
                                        <>
                                            <button onClick={() => handleClick('connexion')}   >
                                                Connexion <i className="fa fa-caret-right test2" />
                                            </button>
                                            <button onClick={() => handleClick('inscription')}>
                                                Inscription <i className="fa fa-caret-right test2" />
                                            </button>
                                        </>
                                       
                                    )}
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
