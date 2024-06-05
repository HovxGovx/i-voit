import React, { useState } from 'react';
import './InscriptionStyles.css';

const LoginSignUp = ({onOptionChange,isLoggedIn, onLogin}) => {
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
                onLogin();
                onOptionChange('trajet');

            } else {
                throw new Error('Erreur lors de la requête.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='home flex justify-center items-center h-screen w-1/2'>
    <form className="form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <p className="title text-2xl mb-4">Inscriptions</p>
        <p className="message text-gray-700 text-base mb-8">S'inscrire pour profiter des offres.</p>

        <label className="block mb-4">
            <label htmlFor="text"> Pseudo</label><span className="error-text text-red-500">*</span>
            <input required placeholder type="text" className="input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={username} onChange={(e) => setUsername(e.target.value)} />
            
        </label>

        <label className="block mb-4">
            <label htmlFor="text"> Numero</label><span className="error-text text-red-500">*</span>
            <input required placeholder type="text" className="input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            
        </label>

        <label className="block mb-4">

        <label htmlFor="text"> Mot de passe</label><span className="error-text text-red-500">*</span>
            <input required placeholder type="password" className="input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={password} onChange={(e) => setPassword(e.target.value)} />
            
        </label>

        <label className="block mb-6">
        <label htmlFor="text"> Confirmation du mot de passe</label><span className="error-text text-red-500">*</span>
            <input required placeholder type="password" className="input appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            
        </label>

        <button type="submit" className="submit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">S'inscrire</button>
        
    </form>
</div>

    );
};

export default LoginSignUp;
