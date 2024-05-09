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
                <img src={special} alt="" />
            
            </div>
        </div>
        </>
     );
}
 
export default CardsPersonne;