import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UserProfile(props) {
    const [name,setUsername] = useState('');
    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => {
                if(res.data.valid){
                    setUsername(res.data.username);
                    console.log("User",name);
                    props.onOptionChange('compte');
                }
                else{
                    props.onOptionChange('connexion');
                }
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <h2>Profil Utilisateur {name}</h2>
        </div>
    );
}

export default UserProfile;