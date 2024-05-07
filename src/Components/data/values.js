const [value, setValue1] = useState(1);
const handleValueChange = (newValue) => {
    setValue1(newValue);
};
const [userInfo, setUserInfo] = useState('');
const [sessionInfo, setSessionInfo] = useState(null);
const [rideOffer, setRideOffer] = useState(null);
// États pour les valeurs des filtres
const [originFilter, setOriginFilter] = useState('');
const [destinationFilter, setDestinationFilter] = useState('');
const [dateFilter, setDateFilter] = useState('');
const [heureFilter, setHeureFilter] = useState('');

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
        // offer.departure_datetime >= currentDate &&  Ne pas afficher les trajets passés
        offer.rideoffer_user_id !== userInfo.user_id // Ne pas afficher les trajets de l'utilisateur connecté
    );
};
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long' };
    return date.toLocaleDateString('fr-FR', options);
}

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