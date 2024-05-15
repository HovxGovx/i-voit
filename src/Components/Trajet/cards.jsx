import special from '../Assets/Icons/covoiturage(3).png'
import special2 from '../Assets/Icons/voiture(1).png'
import special3 from '../Assets/Icons/volant.png'
import './TrajetStyles.css'
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react'

const Cards = ({ onOptionChange }) => {
    const [userInfo, setUserInfo] = useState('');
    const [sessionInfo, setSessionInfo] = useState(null);
    const [rideOffer, setRideOffer] = useState(null);
    const handlClick = () => {
        onOptionChange('trajet');
    };
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
        const fetchRideOfferDetails = async () => {
            try {
                const response = await axios.get('http://localhost:8081/ride-offers');
                setRideOffer(response.data.rideOffers);
            } catch (error) {
                console.error('Error fetching ride offer details:', error);
            }
        };

        fetchRideOfferDetails();
    }, []);
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long' };
        return date.toLocaleDateString('fr-FR', options);
    }
    return (
        <>
            <div className="products-container">
                {rideOffer && rideOffer.slice(0, 4).map((offer) => (
                    <div key={offer.offer_id} className='box' onClick={handlClick}>
                        <img alt=' decoratif' src={special} />
                        <h3>
                            <i className="fas fa-calendar-alt"></i>
                            <span> {formatDate(offer.departure_datetime)}  </span>
                            <span id='prices'>{offer.prix} Ar</span>
                        </h3>
                        <h3>
                            <i className="fas fa-map-marker-alt"></i>
                            <span> {offer.origin} à {offer.heure}</span>
                        </h3>
                        <h3>
                            <i className="fas fa-flag-checkered"></i>
                            <span> {offer.destination} </span>
                        </h3>
                        <div className='tooltip-container'>
                            <span className="tooltip">{offer.available_seats} libre</span>
                            <span className='text'>
                                {[...Array(offer.available_seats)].map((_, index) => (
                                    <i className="fas fa-user-alt" key={index}></i>
                                ))}
                            </span>
                            <span></span>
                        </div>
                        <div className="usersss" >
                            <img src={special3} alt="" id="images" />
                            <div>
                                <h3> {offer.user_username}</h3>
                                <h3> {offer.user_phone_number}</h3>
                            </div>
                        </div>
                        {/*
                        <div className="content">
                            <span>{offer.prix} Ar</span>
                        </div> */}
                    </div>

                ))}
            </div>
        </>
    );
}

export default Cards;