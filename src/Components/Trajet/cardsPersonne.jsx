import special from '../Assets/Icons/utilisateur-du-cercle.png'
import special2 from '../Assets/Icons/partage-de-voiture(1).png'
import special3 from '../Assets/Icons/partage-de-voiture.png'
import './TrajetStyles.css'
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react'

const CardsPersonne = () => {
    return (
        <>
            <div className="products-container">
                <div className="box">
                    <img src={special} alt="description" />
                    <h3>
                        <i className="fas fa-calendar-alt"></i>
                        <span> 22 mai  </span>
                        <span id='prices'>5000 Ar</span>
                    </h3>
                    <h3>
                        <i className="fas fa-map-marker-alt"></i>
                        <span> A à 12h00</span>
                    </h3>
                    <h3>
                        <i className="fas fa-flag-checkered"></i>
                        <span> B </span>
                    </h3>
                    <h3>
                            <i className="fas fa-user-alt" ></i>
                            <i className="fas fa-user-alt" ></i>
                            <i className="fas fa-user-alt" ></i>
                            <i className="fas fa-user-alt" ></i>
                            <i className="fas fa-user-alt" ></i>
                        
                    </h3>
                    <div className="usersss" >
                        <img src={special} alt="" id="images" />
                        <div>
                            <h3> Username </h3>
                            <h3> 0348958354 </h3>
                        </div>
                    </div>
                    <div className="content">
                        <span>50000Ar</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardsPersonne;