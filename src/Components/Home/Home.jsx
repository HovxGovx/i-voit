import './home.css'
import logo from '../Assets/Icons/covoiturage.png';
const Home = () => {
    return (
        <>
            <section className="home" id="home">
                <div className="home-text">
                    <h1>
                        Strat your Day <br /> with coffee
                    </h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem consequatur autem architecto
                        perspiciatis, atque esse aspernatur possimus quisquam quia quam, voluptatum ducimus mollitia laboriosam
                        eos officiis reprehenderit fuga pariatur enim.</p>
                
                </div>
                <div className="home-img">
                    <img src={logo} alt="Logo i-voit"/>
                </div>
            </section>

            <section className="about" id="about">
                <div className="about">
                    <img src={logo} alt="Logo i-voit"/>
                </div>
                <div className="about-text">
                    <h2>Our History</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi mollitia atque nesciunt, cupiditate
                        praesentium in fugiat possimus id dignissimos eius placeat recusandae dolorem amet laborum temporibus
                        iusto tempore similique voluptatibus!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae delectus tenetur vel culpa, minus dolor
                        fugit suscipit a iusto facere officia possimus perspiciatis dolore laborum, iste quasi? Commodi,
                        blanditiis. Architecto.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quisquam voluptatem recusandae, neque at
                        deleniti consectetur aliquid nisi. Pariatur harum rem iste consequatur? Ipsam amet earum enim tempore
                        aliquam? Ex.</p>
                    <button className="btn">Learn more</button>
                </div>
            </section>
            
        </>
    );
}

export default Home;