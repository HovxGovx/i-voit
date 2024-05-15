import './home.css'
import logo from '../Assets/Icons/covoiturage.png';
import "react-multi-carousel/lib/styles.css";
import Cards from '../Trajet/cards';
import CardsPersonne from '../Trajet/cardsPersonne';
const Home = () => {
    return (
        <>
            <section className="home" id="home">
                <div className="home-text">
                    <h1>
                        Covoiturez, libérez les voies,  <br />  <span>i-Voit !</span>
                    </h1>
                    
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
                    <p><span id='nomms'>Le covoiturage</span>, également connu sous le nom de covoiturage automobile,
                        est une pratique où plusieurs personnes se partagent un même véhicule pour se rendre à un endroit commun.
                        Cette méthode de transport permet aux individus de diviser les frais liés au voyage, tels que l'essence,
                        ce qui rend le déplacement plus économique pour tous les participants.</p>
                    <p><span id='nomm'>I-voit</span>, un plateforme de covoiturage qui facilite la mise en relation entre conducteurs et passagers en leur permettant de publier et de rechercher des trajets correspondant à leurs besoins et à leurs préférences.
                        Ces plateformes offrent souvent des fonctionnalités telles que la réservation en ligne,
                        le partage des frais de manière équitable et la vérification des profils des utilisateurs pour garantir la sécurité et la confiance.</p>
                    
                </div>
            </section>

            <section className="products" id="products">
                <div className="heading">
                    <h2> trajets </h2>
                </div>
                {/*  cards chauffeure */}
                <Cards />
            </section>
            

            <section className="products">
                <div className="heading">
                    <h2> demandes </h2>
                </div>
                {/* cards personne */}
                <CardsPersonne />
            </section>

        </>
    );
}

export default Home;