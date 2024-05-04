import './home.css'
import logo from '../Assets/Icons/covoiturage.png';
import special from '../Assets/Icons/utilisateur-du-cercle.png'
import special2 from '../Assets/Icons/partage-de-voiture(1).png'
import { useState } from 'react';
const Home = () => {
    const [value1, setValue1] = useState(1);

    const handleValueChange1 = (newValue) => {
        setValue1(newValue);
    };
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
            {/* Products */}
            <section className="products" id="products">
                <div className="heading">
                    <h2>Les trajets disponibles</h2>
                </div>
                {/* container */}
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