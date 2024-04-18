
import React, { useState } from 'react';
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';
import Navbar from './Components/Navbar/Navbar'
import InscriptionPage from './Components/Inscription/Inscription'
import ComptePage from './Components/Compte/Compte';
import TrajetPage from './Components/Trajet/Trajet';
import PartagerPage from './Components/Partager/Partager';
const App = () => {
    const [option, setOption] = useState('trajet');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = () => {
        setIsLoggedIn(true);
      };
      const handleLogout = () => {
        setIsLoggedIn(false);
      };
    const handleOptionChange = (newOption) => {
        // Faire quelque chose avec la nouvelle option, par exemple :
        console.log("Nouvelle option sélectionnée :", newOption);
        setOption(newOption);
    };
    let pageToDisplay;
    switch (option) {
        case 'connexion':
            pageToDisplay = <LoginSignUp onOptionChange={handleOptionChange} isLoggedIn={isLoggedIn} onLogin={handleLogin} />;
            break;
        case 'inscription':
            pageToDisplay = <InscriptionPage onOptionChange={handleOptionChange} isLoggedIn={isLoggedIn} onLogin={handleLogin} />;
            break;
        case 'compte':
            pageToDisplay = <ComptePage onOptionChange={handleOptionChange}/>;
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
            <Navbar onOptionChange={handleOptionChange} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <div className='Page'>
                {pageToDisplay}
            </div>
                       
        </div>
    );
}
 
export default App;

