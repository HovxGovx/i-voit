import { useEffect, useState } from 'react';
import axios from 'axios';
const PartagerPage = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [availableSeats, setAvailableSeats] = useState('');
    const [prix, setPrix] = useState(2000);
    const [carDetails, setCarDetails] = useState('Aucun');
    const [preferences, setPreferences] = useState('Aucun');
    const [sessionId, setSessionId] = useState('');
    const [origins, setOrigins] = useState([]);
    const [filteredOrigins, setFilteredOrigins] = useState([]);
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const [minDepartureDatetime, setMinDepartureDatetime] = useState('');
    useEffect(() => {
        const fetchSessionInfo = async () => {
            try {
                const response = await fetch('http://localhost:8081/session-info');
                if (!response.ok) {
                    throw new Error('Failed to fetch session info');
                }
                const data = await response.json();
                console.log(data.userData);
                setSessionId(data.userData.user_id);
            } catch (error) {
                console.error('Error fetching session info:', error);
            }
        };

        fetchSessionInfo();
    }, []);
    useEffect(() => {
        const fetchOrigins = async () => {
            try {
                const response = await axios.get('http://localhost:8081/origins');
                console.log(response.data)
                setOrigins(response.data.origins);
                setFilteredOrigins(response.data.origins);
            } catch (error) {
                console.error('Error fetching origins:', error);
            }
        };

        fetchOrigins();
    }, []);

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = `${currentDate.getMonth() + 1}`.padStart(2, '0');
        const day = `${currentDate.getDate()}`.padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setMinDepartureDatetime(formattedDate);
    }, []);

    const handleOriginChange = (e) => {
        const value = e.target.value;
        setOrigin(value);
        const filtered = origins.filter(origin => origin.toLowerCase().includes(value.toLowerCase()));
        setFilteredOrigins(filtered);
        // Supprimer l'option sélectionnée des destinations filtrées
        const remainingDestinations = filteredDestinations.filter(dest => dest !== value);
        setFilteredDestinations(remainingDestinations);
    };

    const handleDestinationChange = (e) => {
        const value = e.target.value;
        setDestination(value);
        const filtered = origins.filter(dest => dest.toLowerCase().includes(value.toLowerCase()));
        setFilteredDestinations(filtered);
        // Supprimer l'option sélectionnée des origines filtrées
        const remainingOrigins = filteredOrigins.filter(origin => origin !== value);
        setFilteredOrigins(remainingOrigins);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8081/add-ride', {
                origin,
                destination,
                departureDate,
                departureTime,
                available_seats: availableSeats,
                car_details: carDetails,
                preferences,
                prix
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'session_id': sessionId
                }
            });
                alert("Vous venez de partager un trajet.")
            console.log(response.data);
            // Réinitialiser le formulaire après la soumission réussie
            setOrigin('');
            setDestination('');
            setDepartureDate('');
            setDepartureTime('');
            setAvailableSeats('');
            setCarDetails('');
            setPreferences('');
            setPrix('');
        } catch (error) {
            console.error('Error adding ride:', error);
        }
    };

    return (
        <>
            {/* {!sessionId && <p style={{ color: 'red' }}>Veuillez vous connecter pour ajouter un trajet</p>}
             */}
            {sessionId && (
                <form onSubmit={handleSubmit} id='test'>
                    <div className="container-fluid">
                        <label>Origine</label>
                        <div className="containers">
                            <input className="search-bar" type="text" id='filterOrigins' value={origin} onChange={handleOriginChange} />
                            <select className="search-bar" value={origin} onChange={handleOriginChange}>
                                {filteredOrigins.map((origin, index) => (
                                    <option key={index} value={origin}>{origin}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <label>Destination</label>
                        <div className="containers">
                            <input className="search-bar" type="text" id='filterDestinations' value={destination} onChange={handleDestinationChange} />
                            <select className="search-bar" value={destination} onChange={handleDestinationChange}>
                                {filteredDestinations.map((destination, index) => (
                                    <option key={index} value={destination}>{destination}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <label>Date de départ</label>
                        <input className="search-bar" type="date" value={departureDate} min={minDepartureDatetime} onChange={(e) => setDepartureDate(e.target.value)} required />
                    </div>
                    <div className="container-fluid">
                        <label>Heure de départ</label>
                        <input className="search-bar" type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} required />
                    </div>
                    <div className="container-fluid">
                        <label>Places disponibles</label>
                        <input className="search-bar" type="number" min={1} max={4} value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} required />
                    </div>
                    <div className="container-fluid hidden">
                        <label className='hidden'>Détails du véhicule</label>
                        <input className="search-bar hidden" type="text" value={carDetails} onChange={(e) => setCarDetails(e.target.value)} />
                    </div>
                    <div className="container-fluid">
                        <label>Prix du place</label>
                        <input className="search-bar " type="number" value={prix} min='2000' onChange={(e) => setPrix(e.target.value)} />
                    </div>
                    <div className="container-fluid hidden">
                        <label className='hidden'>Préférences</label>
                        <textarea className="search-bar hidden" value={preferences} onChange={(e) => setPreferences(e.target.value)} />
                    </div>

                    <button className='border border-grey-200 bg-green-300 hover:bg-aquamarine-dark  font-bold py-2 px-4 rounded' type="submit">Partager</button>
                </form>
            )}
        </>

    );
};

export default PartagerPage;