import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RideOfferDetails = ({onOptionChange}) => {
    const [userInfo, setUserInfo] = useState(null);
    const [sessionInfo, setSessionInfo] = useState(null);
    const [rideOffer, setRideOffer] = useState(null);
    // États pour les valeurs des filtres
    const [originFilter, setOriginFilter] = useState('');
    const [destinationFilter, setDestinationFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [heureFilter, setHeureFilter] = useState('');
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
                console.log(userInfo.user_id);

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
    const handleAddBooking = async (rideId, passengerId) => {
        try {
            // Envoi de la requête POST pour ajouter le ride offer parmi les bookings
            await axios.post('http://localhost:8081/add-booking', { ride_id: rideId, passenger_id: passengerId });
            alert('Ride offer added to bookings successfully!');
        } catch (error) {
            console.error('Error adding ride offer to bookings:', error);
            alert('Error adding ride offer to bookings. Please try again later.');
        }
    };
     // Fonction de filtrage des trajets
     const filterRides = (offer) => {
        const currentDate = new Date().toISOString().split('T')[0]; 
        return (
            offer.origin.toLowerCase().includes(originFilter.toLowerCase()) &&
            offer.destination.toLowerCase().includes(destinationFilter.toLowerCase()) &&
            offer.departure_datetime.includes(dateFilter) &&
            offer.heure.includes(heureFilter) &&
            offer.departure_datetime >= currentDate && // Ne pas afficher les trajets passés
            offer.user_id !== userInfo.user_id // Ne pas afficher les trajets de l'utilisateur connecté
        );
    };
    // if(!userInfo){
    //     onOptionChange('connexion');
    //     return <div>Loading .....</div>
    // }
    return (
        <div className='home'>
            <h1>Ride Offer Details</h1>
            {/* Champs d'entrée pour les filtres */}
            <input
                type="text"
                placeholder="Filter by origin"
                value={originFilter}
                onChange={(e) => setOriginFilter(e.target.value)}
            />
            <input
                type="text"
                placeholder="Filter by destination"
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
            />
            <input
                type="text"
                placeholder="Filter by date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
            />
            <input
                type="text"
                placeholder="Filter by heure"
                value={heureFilter}
                onChange={(e) => setHeureFilter(e.target.value)}
            />
            {rideOffer && rideOffer.filter(filterRides).map((offer) => (
               <div key={offer.offer_id}>
                    <h2>Ride Offer Info</h2>
                    <p>Origin: {offer.origin}</p>
                    <p>Destination: {offer.destination}</p>
                    <p>Departure Date and Time: {offer.departure_datetime}</p>
                    <p>Available Seats: {offer.available_seats}</p>
                    <p>Car Details: {offer.car_details}</p>
                    <p>Preferences: {offer.preferences}</p>
                    <p>Creation Date: {offer.creation_date}</p>
                    <p>Heure: {offer.heure}, </p>

                    <h2>User Info</h2>
                    {offer.user_id } 
                    <p>Username: {offer.user_username}</p>
                    <p>Phone Number: {offer.user_phone_number}</p>
                    {userInfo && <button onClick={() => handleAddBooking(offer.offer_id, userInfo.user_id)}>Add to Bookings</button>}
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default RideOfferDetails;
