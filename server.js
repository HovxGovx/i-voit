const express = require('express');
const app = express();

const PORT = process.env.SERVER_PORT || 5000;


app.use(express.json());
const cors = require('cors');
app.use(cors());

const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    password: 'mirahona1.',
    host: 'localhost',
    port: '5432',
    database: 'covoiturage'
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Inscription
app.post('/signup', async (req, res) => {
    const { username, password, phone_number } = req.body;

    try {
        // Insérer le nouvel utilisateur dans la base de données
        const insertUserQuery = `
            INSERT INTO usercocovoiturage (username, password,  phone_number, is_admin, registration_date)
            VALUES ($1, $2,  $3, $4, CURRENT_TIMESTAMP)
            RETURNING user_id, username,  phone_number, is_admin, registration_date
        `;
        const insertedUser = await pool.query(insertUserQuery, [username, password,  phone_number, false]);

        res.status(201).json({ message: 'Inscription réussie', user: insertedUser.rows[0] });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ message: 'Erreur lors de l\'inscription' });
    }
});
//recuperations des nom d'utilisateurs
app.get('/usernames', async (req, res) => {
    try {
        const getAllUsernamesQuery = 'SELECT username FROM usercocovoiturage';
        const usernamesResult = await pool.query(getAllUsernamesQuery);

        const usernames = usernamesResult.rows.map(row => row.username);
        res.status(200).json(usernames);
    } catch (error) {
        console.error('Erreur lors de la récupération des noms d\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des noms d\'utilisateur' });
    }
});
//recuperations les phones d'utilisateurs
app.get('/phone_number', async (req, res) => {
    try {
        const getAllphone_numberQuery = 'SELECT phone_number FROM usercocovoiturage';
        const phone_numberResult = await pool.query(getAllphone_numberQuery);

        const phone_number = phone_numberResult.rows.map(row => row.phone_number);
        res.status(200).json(phone_number);
    } catch (error) {
        console.error('Erreur lors de la récupération des Numeros d\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des Numeros d\'utilisateur' });
    }
});
//Suppression d'un utilisateur
app.delete('/users/:user_id', async (req, res) => {
    const userId = req.params.user_id;

    try {
    // Supprimer l'utilisateur de la base de données
        const deleteUserQuery = 'DELETE FROM usercocovoiturage WHERE user_id = $1';
        await pool.query(deleteUserQuery, [userId]);

        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
    }
});

app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});
