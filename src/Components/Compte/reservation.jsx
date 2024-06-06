import axios from "axios";
import { useEffect, useState } from "react";

const Reservation = () => {
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
    const [offer, setbookings] = useState([]);
    const [filter, setFilter] = useState('future'); // Peut être 'all', 'future', ou 'incomplete'

    // Fonction pour récupérer les offres de trajet depuis l'API en utilisant les informations de session
    const fetchbookings = async (userId) => {
        try {
            console.log(userId);
            const response = await axios.get(`http://localhost:8081/user/bookings/${userId}`); 
            setbookings(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des offres de trajet : ', error);
        }
    };

    // Effet pour charger les offres de trajet une fois que le composant est monté
    useEffect(() => {
        // Vérifier si les informations de session sont disponibles
        if (userInfo && userInfo.user_id) {
            fetchbookings(userInfo.user_id);
        }
    }, [userInfo]); // Exécuter l'effet lorsque les informations de session changent

    // Fonction pour filtrer les offres de trajet en fonction du critère sélectionné
    const filterbookings = () => {
        switch (filter) {
            case 'future':
                return offer.filter(offer => new Date(offer.departure_datetime) > new Date());
            case 'incomplete':
                return offer.filter(offer => offer.available_seats > 0);
            default:
                return offer;
        }
    };
    const [users, setUsers] = useState([]);
    const fetchUsers = async (idRides) => {
        try {
            const response = await axios.get(`http://localhost:8081/rideofferid/${idRides}/user`);
            setUsers(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs : ', error);
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
    return ( <div>
        {/* Sélecteur de filtre */}
        <select value={filter} onChange={handleFilterChange}>
            <option value="all">Toutes les offres de trajet</option>
            <option value="future">Reservations de trajet à venir</option>
            <option value="incomplete">Reservations de trajet incomplètes</option>
        </select>

        {/* Tableau des offres de trajet */}
        <table className="min-w-full bg-white border rounded-md">
            <thead>
                <tr>
                    <th className="px-4 py-2 text-center  border border-gray-200" >Origineeeee</th>
                    <th className="px-4 py-2 text-center  border border-gray-200" >Destination</th>
                    <th className="px-4 py-2 text-center  border border-gray-200" >Date de départ</th>
                    <th className="px-4 py-2 text-center  border border-gray-200" >Places prises</th>
                    <th className="px-4 py-2 text-center  border border-gray-200" >Chauffeur</th>

                </tr>
            </thead>
            <tbody>
                {filterbookings().map(offer => (
                    <tr key={offer.offer_id}>
                        <td className="px-4 py-2 text-center border border-gray-200">{offer.origin}</td>
                        <td className="px-4 py-2 text-center border border-gray-200">{offer.destination}</td>
                        <td className="px-4 py-2 text-center border border-gray-200">{formatDate(offer.departure_datetime)} à  {offer.heure}</td>
                        <td className="px-4 py-2 text-center border border-gray-200">{offer.available_seats === 0 ? "Complet" : offer.available_seats}</td>
                        <td className="px-4 py-2 text-center border border-gray-200">
                            <button onClick={() => {
                                fetchUsers(offer.offer_id);
                            }} data-bs-toggle="modal" data-bs-target="#personModalreservationperso">
                                Details...
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div>
            {/* Modal pour afficher les détails des utilisateurs */}
            <div className="modal fade" id="personModalreservationperso" tabIndex={-5} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Chauffeur</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul>
                                
                                    <li >
                                        <strong>Nom :</strong> {users.username}<br />
                                        <strong>Contact :</strong> {users.phone_number}<br />
                                    </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> );
}
 
export default Reservation;