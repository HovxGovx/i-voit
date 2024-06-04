import './home.css'
import logo from '../Assets/Icons/covoiturage.png';
import "react-multi-carousel/lib/styles.css";
import Cards from '../Trajet/cards';
import CardsPersonne from '../Trajet/cardsPersonne';
const Home = ({ onOptionChange }) => {
    const handleClick1 = (option) => {
        if (onOptionChange) {
            onOptionChange(option);
        }
    };
    const handleClick = () => {
        if (onOptionChange) {
            onOptionChange('trajet');
        }
    };
    const handleClick2 = () => {
        if (onOptionChange) {
            onOptionChange('demande');
        }
    };
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
                    <p><span className='nomm' onClick={handleClick}>Le covoiturage</span>, également connu sous le nom de covoiturage automobile,
                        est une pratique où plusieurs personnes se partagent un même véhicule pour se rendre à un endroit commun.
                        Cette méthode de transport permet aux individus de diviser les frais liés au voyage, tels que l'essence,
                        ce qui rend le déplacement plus économique pour tous les participants.</p>
                    <p><span className='nomm' onClick={handleClick}>I-voit</span>, un plateforme de covoiturage qui facilite la mise en relation entre conducteurs et passagers en leur permettant de publier et de rechercher des trajets correspondant à leurs besoins et à leurs préférences.
                    </p>
                    <p>
                        <span className='nomm' onClick={handleClick}>Trajet</span>
                        , dans cette section, vous trouverez les trajets proposés par des conducteurs prêts à partager leur voiture avec d'autres personnes.</p>
                    <p>
                        <span className="nomm" onClick={handleClick2}>Demande</span>
                        , dans cette section, vous verrez les demandes des personnes recherchant un conducteur pour partager un trajet. Vous pouvez utiliser les filtres pour trouver des passagers avec qui partager votre voyage.</p>
                </div>
            </section>

            <section className="products" id="products">
                <div className="heading">
                    <h2> trajets </h2>
                </div>
                {/*  cards chauffeure */}
                <Cards onOptionChange={handleClick1} />
            </section>


            <section className="products">
                <div className="heading">
                    <h2> demandes </h2>
                </div>
                {/* cards personne */}
                <CardsPersonne onOptionChange={handleClick1} />
            </section>

        </>
    );
}

export default Home;