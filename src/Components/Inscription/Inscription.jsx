import React, { useState } from 'react';
import './InscriptionStyles.css';

const LoginSignUp = (props) => {
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérifier si les mots de passe correspondent
        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }
        try {
            const response = await fetch('http://localhost:8081/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, phoneNumber, password })
            });

            if (response.ok) {
                console.log('Succès');
                props.onOptionChange('compte');
            } else {
                throw new Error('Erreur lors de la requête.');
            }
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className='Container'>
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">Inscriptions </p>
                <p className="message">S'inscrire pour profiter des offres. </p>

                <label>
                    <input required placeholder type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <span>Pseudo</span>
                    <span className="error-text">Erreur de saisie</span> {/* Texte d'erreur */}
                </label>

                <label>
                    <input required placeholder type="text" className="input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    <span>Téléphone</span>
                    <span className="error-text">Erreur de saisie</span> {/* Texte d'erreur */}
                </label>

                <label>
                    <input required placeholder type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span>Mot(s) de passe</span>
                    <span className="error-text">Erreur de saisie</span> {/* Texte d'erreur */}
                </label>

                <label>
                    <input required placeholder type="password" className="input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <span>Confirmer le mot de passe</span>
                    <span className="error-text">Erreur de saisie</span> {/* Texte d'erreur */}
                </label>

                <button type="submit" className="submit">S'inscrire</button>
                <p className="signin">Déjà membre ?  </p>
            </form>
        </div>
    );
};

export default LoginSignUp;
