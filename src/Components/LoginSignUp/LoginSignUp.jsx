import React, { useState } from 'react';
import './LoginSignUp.css';
import axios from 'axios';
const Login = ({ onOptionChange, isLoggedIn, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        
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
                alert("Veuillez réessayer.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
      
        <section className="inscription flex justify-center items-center h-screen">
        <div className="right">
            <form className="form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <p className="title text-2xl mb-4">Connexion</p>
                <p className="message text-gray-700 text-base mb-8">S'inscrire pour profiter des offres.</p>
    
                <label className="block mb-4">
                <label htmlFor="text"> Pseudo</label><span className="error-text text-red-500">*</span>
                    <input required placeholder type="text" className="input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={username} onChange={(e) => setUsername(e.target.value)} />
                    
                </label>
    
                <label className="block mb-6">
                <label htmlFor="text"> Mot de passe</label><span className="error-text text-red-500">*</span>
                    <input required placeholder type="password" className="input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={password} onChange={(e) => setPassword(e.target.value)} />
                    
                </label>
    
                <button type="submit" className="submit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Se connecter</button>
                <p className="text-gray-700 text-base mt-4"></p>
            </form>
        </div>
        <div className="left">
            <h1 className="text-3xl font-bold mb-2">Bon retour !</h1>
            <p className="text-gray-700 text-base mb-4">Connectez-vous avec votre compte pour nous rejoindre !</p>
        </div>
    </section>
    
       
    );
};

export default Login;
