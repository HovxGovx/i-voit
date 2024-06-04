import React, { useState, useEffect } from 'react';
import Home from '../Home/Home';
import LoginSignUp from '../Inscription/Inscription';
import PersoTrajet from './trajetPerso';
import PersoDemande from './demandePerso';
import Choix from './LittleNavBar';

const ComptePage = ({ onOptionChange }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [error, setError] = useState(null);
  const [option, setOption] = useState('persotrajet');
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
    case 'persotrajet':
      pageToDisplay = <PersoTrajet onOptionChange={handleOptionChange}  />;
      break;
    case 'persodemande':
      pageToDisplay = <PersoDemande onOptionChange={handleOptionChange}   />;
      break;
      case 'reservation':
      pageToDisplay = <PersoDemande onOptionChange={handleOptionChange}   />;
      break;
      case 'prise':
      pageToDisplay = <PersoDemande onOptionChange={handleOptionChange}   />;
      break;
      case 'reservation':
      pageToDisplay = <PersoDemande onOptionChange={handleOptionChange}   />;
      break;

    default:
      pageToDisplay = null;
  }

  useEffect(() => {
    const fetchSessionInfo = async () => {
      try {
        const response = await fetch('http://localhost:8081/session-info');
        if (!response.ok) {
          throw new Error('Failed to fetch session info');
        }
        const data = await response.json();
        console.log(data.sessionData);
        setUserInfo(data.userData);
        setSessionInfo(data.sessionData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSessionInfo();
  }, []);

  return (
    <>

      {userInfo && <div className='compte'>
          <Choix onOptionChange={handleOptionChange}  option={option}/>
          {pageToDisplay}
      </div>}

      {!userInfo && <LoginSignUp />}
    </>


  );
}

export default ComptePage;
