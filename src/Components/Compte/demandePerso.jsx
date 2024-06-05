// Import des modules nécessaires
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PersoDemande = () => {
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [sessionInfo, setSessionInfo] = useState(null);
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
            } catch (error) {
                setError(error.message);
            }
        };

        fetchSessionInfo();
    }, []);
    // États pour stocker les données des offres de trajet et les filtres
    const [rideOffers, setRideOffers] = useState([]);
    const [filter, setFilter] = useState('nonprise'); // Peut être 'all', 'future', ou 'incomplete'

    // Fonction pour récupérer les offres de trajet depuis l'API en utilisant les informations de session
    const fetchRideOffers = async (userId) => {
        try {
            console.log(userId);
            const response = await axios.get(`http://localhost:8081/personnes/${userId}`); // Modifier l'URL en fonction de votre endpoint
            setRideOffers(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des offres de trajet : ', error);
        }
    };

    // Effet pour charger les offres de trajet une fois que le composant est monté
    useEffect(() => {
        // Vérifier si les informations de session sont disponibles
        if (userInfo && userInfo.user_id) {
            fetchRideOffers(userInfo.user_id);
        }
    }, [userInfo]); // Exécuter l'effet lorsque les informations de session changent

    // Fonction pour filtrer les offres de trajet en fonction du critère sélectionné
    const filterRideOffers = () => {
        switch (filter) {
            case 'nonprise':
                return rideOffers.filter(personne => personne.state === 'nonprise');
            case 'prise':
                return rideOffers.filter(personne => personne.state === 'prise');
            default:
                return rideOffers;
        }
    };

    // Fonction pour changer le filtre
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long' };
        return date.toLocaleDateString('fr-FR', options);
    }
    return (
        <div>
            {/* Sélecteur de filtre */}
            <select value={filter} onChange={handleFilterChange}>
                <option value="nonprise">Demandes en attente </option>
                <option value="prise">Demande accepter</option>
            </select>

            {/* Tableau des offres de trajet */}
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
                <thead>
                    <tr>
                        <th  className="px-4 py-2 text-center border border-gray-200" >Origine</th>
                        <th  className="px-4 py-2 text-center border border-gray-200" >Destination</th>
                        <th  className="px-4 py-2 text-center border border-gray-200" >Date de départ</th>
                        <th  className="px-4 py-2 text-center border border-gray-200" >Places disponibles</th>
                        <th  className="px-4 py-2 text-center border border-gray-200" >Prix</th>
                        <th  className="px-4 py-2 text-center border border-gray-200" >Chauffeure</th>

                    </tr>
                </thead>
                <tbody>
                    {filterRideOffers().map(personne => (
                        <tr key={personne.user_id}>
                            <td className="px-4 py-2 text-center  border border-gray-200">{personne.origin}</td>
                            <td className="px-4 py-2 text-center  border border-gray-200">{personne.destination}</td>
                            <td className="px-4 py-2 text-center  border border-gray-200">{formatDate(personne.departure_datetime)} à {personne.heure}</td>
                            <td className="px-4 py-2 text-center  border border-gray-200">{personne.seats}</td>
                            <td className="px-4 py-2 text-center  border border-gray-200">{personne.prix}</td>
                            <td className="px-4 py-2 text-center  border border-gray-200">
                                <button>
                                    Contact
                                </button>
                            </td>
                            <td className="px-4 py-2 border border-gray-200">
                                <button type="button">
                                    Annuler
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PersoDemande;