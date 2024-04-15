import React, { useState } from 'react';
import './LoginSignUp.css';
import axios from 'axios';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post('http://localhost:8087/signup',username,password)
            .then(res => console.log('succes'))
            .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <div className="inscription">
                <div className="left">
                    <h1>Bon retour !</h1>
                    <p>Connectez-vous avec votre compte<br />pour nous rejoindre !</p>
                </div>
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
            </div>
        </div>
    );
};

export default Login;
