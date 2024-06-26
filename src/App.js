
import React, { useState } from 'react';
import LoginSignUp from './Components/LoginSignUp/LoginSignUp';
import Navbar from './Components/Navbar/Navbar';
import InscriptionPage from './Components/Inscription/Inscription';
import ComptePage from './Components/Compte/Compte';
import TrajetPage from './Components/Trajet/Trajet';
// import PartagerPage from './Components/Partager/Partager';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Demandes from './Components/Demandes/demandes';
const App = () => {
    const [option, setOption] = useState('home');
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
        case 'home':
            pageToDisplay = <Home onOptionChange={handleOptionChange} isLoggedIn={isLoggedIn} onLogin={handleLogin} />;
            break;
        case 'connexion':
            pageToDisplay = <LoginSignUp onOptionChange={handleOptionChange} isLoggedIn={isLoggedIn} onLogin={handleLogin} />;
            break;
        case 'inscription':
            pageToDisplay = <InscriptionPage onOptionChange={handleOptionChange} isLoggedIn={isLoggedIn} onLogin={handleLogin} />;
            break;
        case 'compte':
            pageToDisplay = <ComptePage onOptionChange={handleOptionChange} isLoggedIn={isLoggedIn} onLogin={handleLogin}/>;
            break;
        case 'trajet':
            pageToDisplay = <TrajetPage onOptionChange={handleOptionChange} isLoggedIn={isLoggedIn} onLogin={handleLogin}/>;
            break;
        case 'demande':
            pageToDisplay = <Demandes onOptionChange={handleOptionChange} isLoggedIn={isLoggedIn} onLogin={handleLogin}/>;
            break;
        default:
            pageToDisplay = null;
    }

    return (
        <div>
            <Navbar onOptionChange={handleOptionChange} isLoggedIn={isLoggedIn} onLogout={handleLogout} option={option}/>
            <div className='Page'>               
                {pageToDisplay}
                
            </div>
            <Footer/>           
        </div>
    );
}
 
export default App;

