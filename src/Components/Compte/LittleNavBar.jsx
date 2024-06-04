import axios from 'axios';
import special from '../Assets/Icons/covoiturage(3).png'
import special2 from '../Assets/Icons/voiture(1).png'
import special3 from '../Assets/Icons/voiture(2).png'
import { useEffect, useState } from 'react';
const Choix = ({ onOptionChange,option, isLoggedIn, onLogout }) => {
    const [activeButton, setActiveButton] = useState(option);
    const [sessionInfo, setSessionInfo] = useState(null);
    const handleClick1 = (options) => {
        if (onOptionChange) {
            onOptionChange(options);
        }
        setActiveButton(options);
    };
    const handleClick = (option) => {
        if (onOptionChange) {
            onOptionChange(option);
        }
        if (option === 'connexion' || option === 'inscription') {
            setActiveButton('compte');
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





    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
            <div id="milieu" className=''>
                    <ul id='central'className='flex flex-col'>
                        <li>
                            <button
                                className={option === 'home' ? 'active' : ''} 
                                onClick={() => handleClick1('home')}
                            >
                                Acceuille
                            </button>
                        </li>
                        <li>
                            <button
                                className={option === 'trajet' ? 'active' : ''} 
                                onClick={() => handleClick1('trajet')}
                            >
                                Trajet
                            </button>
                        </li>
                        <li>
                            <button
                                className={option === 'demande' ? "active" : ""} 
                                onClick={() => handleClick1('demande')}
                            >
                                Demande
                            </button>
                        </li>
                        <li>
                            <button
                                className={option === 'compte' ? "active" : ""}
                                onClick={() => handleClick1('compte')}
                            >
                                Compte
                            </button>
                        </li>

                    </ul>
                </div>

            </nav>


        </aside>
    );
}

export default Choix;