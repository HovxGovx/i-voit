import { useEffect, useState } from "react";
//import special from '../Assets/Icons/voiture(1).png'
 import special2 from '../Assets/Icons/covoiturage(3).png'
import special3 from '../Assets/Icons/9044442_flagging_taxi_icon.png'
import axios from 'axios';
import CustomNum from "../Home/nombre";
import Demander from "../Partager/Demander";
const Demandes = ({ onOptionChange }) => {

    const [showFive, setShowFive] = useState(true);
    const handleNombreChange = () => {
        setShowFive(!showFive);
    };
    const [value, setValue1] = useState(1);
    const handleValueChange = (newValue) => {
        setValue1(newValue);
    };


    // États pour les valeurs des filtres
    const [originFilter, setOriginFilter] = useState('');
    const [destinationFilter, setDestinationFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [heureFilter, setHeureFilter] = useState('');
    // Fonction de filtrage des trajets
    const filterPersonne = (pers) => {
        //const currentDate = new Date().toISOString().split('T')[0];
        return (
            pers.origin.toLowerCase().includes(originFilter.toLowerCase()) &&
            pers.destination.toLowerCase().includes(destinationFilter.toLowerCase()) &&
            pers.departure_datetime.includes(dateFilter) &&
            pers.heure.includes(heureFilter) &&
            pers.seats >= value &&
            // offer.departure_datetime >= currentDate &&  Ne pas afficher les trajets passés
            pers.rideoffer_user_id !== userInfo.user_id // Ne pas afficher les trajets de l'utilisateur connecté
        );
    };

    const [userInfo, setUserInfo] = useState('');
    const [sessionInfo, setSessionInfo] = useState(null);
    const [personne, setPersonne] = useState(null);
    const handlClick = () => {
        onOptionChange('demande');
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
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long' };
        return date.toLocaleDateString('fr-FR', options);
    }
    function handleTakeAsk(truc, trucs) {
        console.log(truc, trucs);
    }
    return (
        <>
            <section className="container-trajet">
                <div className="filtrage">
                    <h1>Filtrer les demandes</h1>
                    {/* Champs d'entrée pour les filtres */}

                    <div>
                        <label htmlFor="origin">Origine</label><br />
                        <input
                            class="search-bar"
                            type="text"
                            placeholder="Origin"
                            value={originFilter}
                            onChange={(e) => setOriginFilter(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="destination">Destination</label><br />
                        <input
                            class="search-bar"
                            type="text"
                            placeholder="Destination"
                            value={destinationFilter}
                            onChange={(e) => setDestinationFilter(e.target.value)}
                        />
                    </div>

                    <div className="hidden">
                        <label htmlFor="date">Date</label><br />
                        <input
                            class="search-bar"
                            type="date"
                            placeholder="Date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                    </div>

                    <div className="hidden">
                        <label htmlFor="date">heure</label><br />
                        <input
                            class="search-bar"
                            type="time"
                            placeholder=""
                            value={heureFilter}
                            onChange={(e) => setHeureFilter(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="date">Nombre de place</label><br />
                    <CustomNum value={value} onValueChange={handleValueChange} />
                </div>

                <section className="products" id="products">
                    <div className="heading">
                        <h2>Demandes</h2>
                    </div>
                    <div className="products-container">
                        {personne && shuffleArray(personne.filter(filterPersonne)).slice(0, showFive ? 5 : 20).map((pers) => (
                            <div className="box" key={pers.personneId} onClick={handlClick}>
                                <img src={special2} alt="description" />
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
                                    <span className="tooltip">{pers.seats}places</span>
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
                                {userInfo && <div className="content">
                                    <span >{pers.prix * value} Ar</span>
                                    {/* <button className="btn" onClick={() => handleTakeAsk(pers.personneId, userInfo.user_id)}>Prendre</button> */}
                                </div>}
                            </div>
                        ))}
                    </div>

                </section>

                <label className="containere" >
                    <input defaultChecked="checked" type="checkbox" onClick={handleNombreChange} />
                    <svg viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="chevron-down"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                </label>

                {userInfo && <button type="button" className="button" data-bs-toggle="modal" data-bs-target="#personModal">
                    <span className="button__text">Demander</span>
                    <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height={24} fill="none" className="svg"><line y2={19} y1={5} x2={12} x1={12} /><line y2={12} y1={12} x2={19} x1={5} /></svg></span>
                </button>}
                <div>
                    <div className="modal fade" id="personModal" tabIndex={-2} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Patage de trajet</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <Demander />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Demandes;