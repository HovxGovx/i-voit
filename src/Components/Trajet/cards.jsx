import special from '../Assets/Icons/utilisateur-du-cercle.png'
import special2 from '../Assets/Icons/partage-de-voiture(1).png'
import special3 from '../Assets/Icons/partage-de-voiture.png'
import './TrajetStyles.css'

const Cards = () => {
    return (
        <>
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
                    <img alt=' decoratif' src={special3} />
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
            </div>
        </>
    );
}

export default Cards;