import axios from 'axios';
import special from '../Assets/Icons/covoiturage(3).png'
import special2 from '../Assets/Icons/voiture(1).png'
import special3 from '../Assets/Icons/voiture(2).png'
import { useEffect, useState } from 'react';
const Choix = ({ onOptionChange,option }) => {
    const [activeButton, setActiveButton] = useState(option);
    const [sessionInfo, setSessionInfo] = useState(null);
    const handleClick1 = (options) => {
        if (onOptionChange) {
            onOptionChange(options);
        }
        setActiveButton(options);
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
        <aside className="w-full ">
            <nav className="w-full  bg-white border-r shadow-sm">
            <div id="milieu" className=''>
                    <ul id='central'className='flex flex-row'>
                        <li>
                            <button
                                className={option === 'persotrajet' ? 'active' : ''} 
                                onClick={() => handleClick1('persotrajet')}
                            >
                                 Mes Trajets
                            </button>
                        </li>
                        <li>
                            <button
                                className={option === 'voyageur' ? 'active' : ''} 
                                onClick={() => handleClick1('voyageur')}
                            >
                                Mes demandes
                            </button>
                        </li>
                        
                        <li>
                            <button
                                className={option === 'reservation' ? 'active' : ''} 
                                onClick={() => handleClick1('reservation')}
                            >
                                Reservations
                            </button>
                        </li>
                    </ul>
                </div>

            </nav>
        </aside>
    );
}

export default Choix;