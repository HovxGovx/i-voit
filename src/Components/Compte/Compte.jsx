import React, { useEffect, useState } from 'react';

function UserProfile() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Fonction pour récupérer les informations de l'utilisateur
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:5000/userinfo', {
                    method: 'GET',
                    credentials: 'include' // Inclure les cookies dans la requête
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUserInfo(userData);
                } else {
                    console.error('Erreur lors de la récupération des informations de l\'utilisateur');
                }
            } catch (error) {
                console.error('Erreur réseau :', error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div>
            <h2>Profil Utilisateur</h2>
            {userInfo ? (
                <div>
                    <p>Nom d'utilisateur : {userInfo.username}</p>
                    <p>Numéro de téléphone : {userInfo.phone_number}</p>
                </div>
            ) : (
                <p>Chargement des informations de l'utilisateur...</p>
            )}
        </div>
    );
}

export default UserProfile;