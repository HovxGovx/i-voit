import './home.css'
import logo from '../Assets/Icons/covoiturage.png';
import special from '../Assets/Icons/utilisateur-du-cercle.png'
import special2 from '../Assets/Icons/partage-de-voiture(1).png'
import special3 from '../Assets/Icons/partage-de-voiture.png'
import { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from 'axios';
import CustomNum from '../Home/nombre';
const Home = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 2048, min: 1848 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 1848, min: 1321 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1321, min: 800},
            items: 2
        },
        mobile: {
            breakpoint: { max: 800, min: 0 },
            items: 1
        }
    };
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
    return (
        <>
            <section className="home" id="home">
                <div className="home-text">
                    <h1>
                        Covoiturez, libérez les voies,  <br />  <span>i-Voit !</span>
                    </h1>
                    <p> Votre plateforme de covoiturage simple, rapide et conviviale pour des trajets quotidiens ou des escapades. </p>

                </div>
                <div className="home-img">
                    <img a src={logo} alt="Logo i-voit" />
                </div>
            </section>

            <section className="about" id="about">
                <div className="about">
                    <img src={logo} alt="Logo i-voit" />
                </div>
                <div className="about-text">
                    <h2>Le covoiturage , c'est quoi ?</h2>
                    <p>Le covoiturage, également connu sous le nom de covoiturage automobile,
                        est une pratique où plusieurs personnes se partagent un même véhicule pour se rendre à un endroit commun.
                        Cette méthode de transport permet aux individus de diviser les frais liés au voyage, tels que l'essence,
                        ce qui rend le déplacement plus économique pour tous les participants.</p>
                    <p>I-voit, un plateforme de covoiturage qui facilite la mise en relation entre conducteurs et passagers en leur permettant de publier et de rechercher des trajets correspondant à leurs besoins et à leurs préférences.
                        Ces plateformes offrent souvent des fonctionnalités telles que la réservation en ligne,
                        le partage des frais de manière équitable et la vérification des profils des utilisateurs pour garantir la sécurité et la confiance.</p>
                    <button className="btn">Learn more</button>
                </div>
            </section>
            {/* Products 
            <section className="products" id="products">
                <div className="heading">
                    <h2>Les trajets disponibles</h2>
                </div>
                <div className="products-container">
                    <div className="box ">
                        <img alt=' decoratif' src={special2} />
                        <h3><i className="fas fa-calendar-alt"></i> <span> 24 Mars </span> <span id='prices'>Ar 50000</span></h3>
                        <h3><i className="fas fa-map-marker-alt"></i><span> Point de depart à 12:34</span></h3>
                        <h3><i className="fas fa-flag-checkered"></i><span> Point d'arrive</span> </h3>
                        <h3>
                            <i className="fas fa-user-alt"></i><span> </span>
                            <i className="fas fa-user-alt"></i><span> </span>
                            <i className="fas fa-user-alt"></i><span> </span>
                            <i className="fas fa-user-alt"></i><span> </span>
                        </h3>
                        <div className="usersss" >
                            <img src={special} alt="" id="images" />
                            <div>
                                <h3>Angelot</h3>
                                <h3>0348958354</h3>
                            </div>
                        </div>

                        <div className="content">
                            <button className="btn">Reserver</button>
                        </div>
                    </div>
                    <div className="box ">
                        <img alt=' decoratif' src={special2} />
                        <h3><i className="fas fa-calendar-alt"></i> <span> 24 Mars </span> <span id='prices'>Ar 50000</span></h3>
                        <h3><i className="fas fa-map-marker-alt"></i><span> Point de depart à 12:34</span></h3>
                        <h3><i className="fas fa-flag-checkered"></i><span> Point d'arrive</span> </h3>
                        <h3><i className="fas fa-user-alt"></i><span> </span>
                            <i className="fas fa-user-alt"></i><span> </span>
                            <i className="fas fa-user-alt"></i><span> </span>
                            <i className="fas fa-user-alt"></i><span> </span>
                        </h3>
                        <div className="usersss" >
                            <img src={special} alt="" id="images" />
                            <div>
                                <h3>Angelot</h3>
                                <h3>0348958354</h3>
                            </div>
                        </div>

                        <div className="content">
                            <button className="btn">Reserver</button>
                        </div>
                    </div>
                    <div className="box ">
                        <img alt=' decoratif' src={special2} />
                        <h3><i className="fas fa-calendar-alt"></i> <span> 24 Mars </span> <span id='prices'>Ar 50000</span></h3>
                        <h3><i className="fas fa-map-marker-alt"></i><span> Point de depart à 12:34</span></h3>
                        <h3><i className="fas fa-flag-checkered"></i><span> Point d'arrive</span> </h3>
                        <h3><i className="fas fa-user-alt"></i><span> </span>
                            <i className="fas fa-user-alt"></i><span> </span>
                            <i className="fas fa-user-alt"></i><span> </span>
                            <i className="fas fa-user-alt"></i><span> </span>
                        </h3>
                        <div className="usersss" >
                            <img src={special} alt="" id="images" />
                            <div>
                                <h3>Angelot</h3>
                                <h3>0348958354</h3>
                            </div>
                        </div>

                        <div className="content">
                            <button className="btn">Reserver</button>
                        </div>
                    </div>

                    <div className="box ">
                        <img alt=' decoratif' src={special} />
                        <h3><i className="fas fa-calendar-alt"></i> <span> 24 Mars </span><span id='prices'>Ar 50000</span></h3>
                        <h3><i className="fas fa-map-marker-alt"></i><span> Point de depart à 12:34</span></h3>
                        <h3><i className="fas fa-flag-checkered"></i><span> Point d'arrive</span> </h3>
                        <h3><i className="fas fa-user-alt"></i><span> </span>
                            <i className="fas fa-user-alt"></i><span> </span>
                            <i className="fas fa-user-alt"></i><span> </span>
                            <i className="fas fa-user-alt"></i><span> </span>
                        </h3>
                        <div className="usersss" >
                            <img src={special} alt="" id="images" />
                            <div>
                                <h3>Angelot</h3>
                                <h3>0348958354</h3>
                            </div>
                        </div>

                        <div className="content">
                            <button className="btn">Reserver</button>
                        </div>
                    </div>

                    <div className="box ">
                        <img alt=' decoratif' src={special2} />
                        <h3><i className="fas fa-calendar-alt"></i> <span> 24 Mars </span><span id='prices'>Ar 50000</span></h3>
                        <h3><i className="fas fa-map-marker-alt"></i><span> Point de depart à 12:34</span></h3>
                        <h3><i className="fas fa-flag-checkered"></i><span> Point d'arrive</span> </h3>
                        <h3><i className="fas fa-user-alt"></i><span> </span>
                            <i className="fas fa-user-alt"></i><span> </span>
                            <i className="fas fa-user-alt"></i><span> </span>
                            <i className="fas fa-user-alt"></i><span> </span>
                        </h3>
                        <div className="usersss" >
                            <img src={special} alt="" id="images" />
                            <div>
                                <h3>Angelot</h3>
                                <h3>0348958354</h3>
                            </div>
                        </div>

                        <div className="content">
                            <button className="btn">Reserver</button>
                        </div>
                    </div>
                </div>
                <div className="box ">
                    <img alt=' decoratif' src={special} />
                    <h3><i className="fas fa-calendar-alt"></i> <span> 24 Mars </span><span id='prices'>Ar 50000</span></h3>
                    <h3><i className="fas fa-map-marker-alt"></i><span> Point de depart à 12:34</span></h3>
                    <h3><i className="fas fa-flag-checkered"></i><span> Point d'arrive</span> </h3>
                    <h3><i className="fas fa-user-alt"></i><span> </span>
                        <i className="fas fa-user-alt"></i><span> </span>
                        <i className="fas fa-user-alt"></i><span> </span>
                        <i className="fas fa-user-alt"></i><span> </span>
                    </h3>
                    <div className="usersss" >
                        <img src={special} alt="" id="images" />
                        <div>
                            <h3>Angelot</h3>
                            <h3>0348958354</h3>
                        </div>
                    </div>

                    <div className="content">
                        <button className="btn">Reserver</button>
                    </div>
                </div>
            </section>
            */}
            <div className="filtrage">
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
                <CustomNum value={value} onValueChange={handleValueChange} />
            </div>
            <section className="products" id="products">
                <div className="heading">
                    <h2>Les trajets disponibles</h2>
                </div>
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    autoPlay={false}
                    infinite={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="products-container"
                >
                    {rideOffer && rideOffer.filter(filterRides).map((offer) => (
                        <div key={offer.offer_id} className='box'>
                            <img alt=' decoratif' src={special2} />
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
                            <h3>
                                <i className="fas fa-user-alt"></i><span> </span>
                                <i className="fas fa-user-alt"></i><span> </span>
                                <i className="fas fa-user-alt"></i><span> </span>
                                <i className="fas fa-user-alt"></i><span> </span>
                            </h3>
                            <div className="usersss" >
                                <img src={special} alt="" id="images" />
                                <div>
                                    <h3> {offer.user_username}</h3>
                                    <h3> {offer.user_phone_number}</h3>
                                </div>
                            </div>
                            <div className="content">
                                <span>{offer.prix} Ar</span>
                                {userInfo && <button className="btn" onClick={() => handleAddBooking(offer.offer_id, userInfo.user_id)}>Reserver</button>}
                            </div>
                        </div>

                    ))}
                </Carousel>
            </section>
            {/* Customers  
            <section className="customers" id="customers">
                <div className="heading">
                    <h2>Our Customer's</h2>
                </div>
                <div className="customers-container">
                    <div className="box">
                        <div className="stars">
                            <i className="bx bxs-star" />
                            <i className="bx bxs-star" />
                            <i className="bx bxs-star" />
                            <i className="bx bxs-star" />
                            <i className="bx bxs-star" />
                            <i className="bx bxs-star-half" />
                        </div>
                        <h3>Origin : <span> Point de depart</span></h3>
                        <h3>Destination:<span>Point d'arrive</span></h3>
                        <h3>Heure:<span>12:34</span></h3>
                        <h3>Place disponible:<span>4</span></h3>
                        <CustomNum value={value1} onValueChange={handleValueChange1} />
                        <h2>Yasin Arafat</h2>
                        <div className="content">
                            <button className="btn">Reserver</button>
                        </div></div>
                    <div className="box">
                        <div className="stars">
                            <i className="bx bxs-star" />
                            <i className="bx bxs-star" />
                            <i className="bx bxs-star" />
                            <i className="bx bxs-star" />
                            <i className="bx bxs-star" />
                            <i className="bx bxs-star-half" />
                        </div>
                        <h3>Origin : <span> Point de depart à 12:34</span></h3>
                        <h3>Destination:<span>Point d'arrive</span></h3>
                        <h3>Place disponible:<span>4</span></h3>
                        <h2>Yasin Arafat</h2>
                        <div className="content">
                            <button className="btn">Reserver</button>
                        </div> </div>
                    <div className="box">
                        <div className="stars">
                            <i className="bx bxs-star" />
                            <i className="bx bxs-star" />
                            <i className="bx bxs-star" />
                            <i className="bx bxs-star" />
                            <i className="bx bxs-star" />
                            <i className="bx bxs-star-half" />
                        </div>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque, ratione? Illum aliquid, ab, non
                            recusandae labore quaerat exercitationem fugit, autem deleniti quod fugiat natus debitis quasi saepe
                            laudantium expedita iste.</p>
                        <CustomNum value={value1} onValueChange={handleValueChange1} />

                        <h2>Yasin Arafat</h2>
                        <div className="content">
                            <button className="btn">Reserver</button>
                        </div></div>
                </div>
            </section>
            */}
            <div>
            </div>
        </>
    );
}

export default Home;