import './home.css'
import logo from '../Assets/Icons/covoiturage.png';
import Exemple from './exemple';
const Home = () => {
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
                    <img src={logo} alt="Logo i-voit" />
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
                    <p>Les plateformes de covoiturage en ligne facilitent la mise en relation entre conducteurs et passagers en leur permettant de publier et de rechercher des trajets correspondant à leurs besoins et à leurs préférences.
                        Ces plateformes offrent souvent des fonctionnalités telles que la réservation en ligne,
                        le partage des frais de manière équitable et la vérification des profils des utilisateurs pour garantir la sécurité et la confiance.</p>
                    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quisquam voluptatem recusandae, neque at
                        deleniti consectetur aliquid nisi. Pariatur harum rem iste consequatur? Ipsam amet earum enim tempore
                        aliquam? Ex.</p> */}
                    <button className="btn">Learn more</button>
                </div>
            </section>
            <section className='products'>
                <div class="heading">
                    <h2>Our popular products</h2>
                </div>
                <Exemple />
            </section>
        </>
    );
}

export default Home;