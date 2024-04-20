import { useEffect, useState } from 'react';
import './PartagerStyles.css'
import axios from 'axios';
const PartagerPage = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDatetime, setDepartureDatetime] = useState('');
    const [availableSeats, setAvailableSeats] = useState('');
    const [carDetails, setCarDetails] = useState('');
    const [preferences, setPreferences] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        const fetchSessionInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8081/session-info');
                if (response.data) {
                    alert(response.data)
                    setSessionId(response.data);
                }
            } catch (error) {
                console.error('Error fetching session info:', error.response.data.message);
                setErrorMessage('Error fetching session info');
            }
        };

        fetchSessionInfo();
    }, []);

    const handleSubmit = async (e) => { 
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8081/add-ride', {
                origin,
                destination,
                departure_datetime: departureDatetime,
                available_seats: availableSeats,
                car_details: carDetails,
                preferences
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'session_id': sessionId
                }
            });

            console.log(response.data);
            // Réinitialiser le formulaire après la soumission réussie
            setOrigin('');
            setDestination('');
            setDepartureDatetime('');
            setAvailableSeats('');
            setCarDetails('');
            setPreferences('');
            setErrorMessage('');
        } catch (error) {
            console.error('Error adding ride:', error.response.data.message);
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <section className='home'>
            <h2>Ajouter un nouveau trajet</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {!sessionId && <p style={{ color: 'red' }}>Veuillez vous connecter pour ajouter un trajet</p>}
            {sessionId && (
                <form onSubmit={handleSubmit}>
                    <label>Origine:</label>
                    <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} required />

                    <label>Destination:</label>
                    <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />

                    <label>Date de départ:</label>
                    <input type="datetime-local" value={departureDatetime} onChange={(e) => setDepartureDatetime(e.target.value)} required />

                    <label>Places disponibles:</label>
                    <input type="number" value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} required />

                    <label>Détails du véhicule:</label>
                    <input type="text" value={carDetails} onChange={(e) => setCarDetails(e.target.value)} />

                    <label>Préférences:</label>
                    <textarea value={preferences} onChange={(e) => setPreferences(e.target.value)} />

                    <button type="submit">Ajouter trajet</button>
                </form>
            )}
        </section>
    );
};
 
export default PartagerPage;