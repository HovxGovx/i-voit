import React, { useState } from 'react';
import './LoginSignUp.css';
import axios from 'axios';
const Login = ({ onOptionChange, isLoggedIn, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("votsindry");
        try {
            const response = await fetch('http://localhost:8081/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (data.login) {
                console.log('Succès login');
                onOptionChange('trajet');
                onLogin();
            } else {
                alert("Aucun donnees");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
      
            <section className="inscription">
                <div className="right">
                    <form className="form" onSubmit={handleSubmit}>
                        <p className="title">Connexion</p>
                        <p className="message">S'inscrire pour profiter des offres. </p>

                        <label>
                            <input required placeholder type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <span>Pseudo</span>
                            <span className="error-text">Erreur de saisie</span> {/* Texte d'erreur */}
                        </label>

                        <label>
                            <input required placeholder type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <span>Mot(s) de passe</span>
                            <span className="error-text">Erreur de saisie</span> {/* Texte d'erreur */}
                        </label>

                        <button type="submit" className="submit">Se connecter</button>
                        <p></p>
                    </form>
                </div>
                <div className="left">
                    <h1>Bon retour !</h1>
                    <p>Connectez-vous avec votre compte<br />pour nous rejoindre !</p>
                </div>

            </section>
       
    );
};

export default Login;
