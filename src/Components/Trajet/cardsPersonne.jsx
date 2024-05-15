import special from '../Assets/Icons/voiture(1).png'
import special2 from '../Assets/Icons/covoiturage(3).png'
import special3 from '../Assets/Icons/9044442_flagging_taxi_icon.png'
import './TrajetStyles.css'
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react'

const CardsPersonne = () => {
    const [userInfo, setUserInfo] = useState('');
    const [sessionInfo, setSessionInfo] = useState(null);
    const [personne, setPersonne] = useState(null);
    useEffect(() => {
        const fetchSessionInfo = async () => {
            try {
                const response = await fetch('http://localhost:8081/session-info');
                if (!response.ok) {
                    throw new Error('Failed to fetch session info');
                }
                const data = await response.json();
                console.log(data.sessionData);
                setUserInfo(data.userData);
                setSessionInfo(data.sessionData);
                console.log(sessionInfo);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchSessionInfo();
    }, []);
    useEffect(() => {
        // Fonction pour charger les informations sur l'offre de trajet et l'utilisateur associé
        const fetchPersonneDetails = async () => {
            try {
                const response = await axios.get('http://localhost:8081/personne');
                setPersonne(response.data.personne);
            } catch (error) {
                console.error('Error fetching ersonnes:', error);
            }
        };

        fetchPersonneDetails();
    }, []);
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long' };
        return date.toLocaleDateString('fr-FR', options);
    }
    return (
        <>
            <div className="products-container">
                {personne && personne.slice(0, 4).map((pers) => (
                    <div className="box" key={pers.personneId}>
                        <img src={special} alt="description" />
                        <h3>
                            <i className="fas fa-calendar-alt"></i>
                            <span> {formatDate(pers.departure_datetime)} </span>
                            <span id='prices'>{pers.prix} Ar</span>
                        </h3>
                        <h3>
                            <i className="fas fa-map-marker-alt"></i>
                            <span> {pers.origin} à {pers.heure}</span>
                        </h3>
                        <h3>
                            <i className="fas fa-flag-checkered"></i>
                            <span> {pers.destination} </span>
                        </h3>
                        <div className='tooltip-container'>
                            <span className="tooltip">{pers.seats} place</span>
                            <span className='text'>
                                {[...Array(pers.seats)].map((_, index) => (
                                    <i className="fas fa-user-alt" key={index}></i>
                                ))}
                            </span>
                            <span></span>
                        </div>
                        <div className="usersss" >
                            <img src={special3} alt="images pourles clients" id="images" />
                            <div>
                                <h3> {pers.user_username} </h3>
                                <h3> {pers.user_phone_number} </h3>
                            </div>
                        </div>
                        <div className="content">
                            <span>{pers.prix * pers.seats}Ar</span>
                        </div>
                    </div>
                ))}

            </div>
        </>
    );
}

export default CardsPersonne;