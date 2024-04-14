
import React, { useState } from 'react';
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';
import Navbar from './Components/Navbar/Navbar'
import InscriptionPage from './Components/Inscription/Inscription'
import ComptePage from './Components/Compte/Compte';
import TrajetPage from './Components/Trajet/Trajet';
import PartagerPage from './Components/Partager/Partager';
const App = () => {
    const [option, setOption] = useState('');

    const handleOptionChange = (newOption) => {
        // Faire quelque chose avec la nouvelle option, par exemple :
        console.log("Nouvelle option sélectionnée :", newOption);
        setOption(newOption);
    };

    let pageToDisplay;
    switch (option) {
        case 'connexion':
            pageToDisplay = <LoginSignUp />;
            break;
        case 'inscription':
            pageToDisplay = <InscriptionPage />;
            break;
        case 'compte':
            pageToDisplay = <ComptePage />;
            break;
        case 'trajet':
            pageToDisplay = <TrajetPage />;
            break;
        case 'partager':
            pageToDisplay = <PartagerPage />;
            break;
        default:
            pageToDisplay = null;
    }

    return (
        <div >
            <Navbar onOptionChange={handleOptionChange} />
            <div className='Page'>
                {pageToDisplay}
            </div>
                       
        </div>
    );
}
 
export default App;

