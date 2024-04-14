const express = require('express');
const app = express();
const session = require('express-session');
const PORT = process.env.SERVER_PORT || 5000;
const { Pool } = require('pg');
app.use(express.json());
const cors = require('cors');
// Configure CORS to allow requests from localhost:5000
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true,
}));
const pool1 = new Pool({
    connectionString: 'connection'
});

const pool = new Pool({
    user: 'postgres',
    password: 'mirahona1.',
    host: 'localhost',
    port: '5432',
    database: 'covoiturage'
});

// Configuration de la session
app.use(session({
    secret: 'connection',
    resave: false,
    saveUninitialized: true,
}));
// Middleware pour l'authentification
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM usercocovoiturage WHERE username = $1', [username]);
        client.release();

        if (result.rows.length === 1) {
            const user = result.rows[0];
            // Vérification du mot de passe
            if (password === user.password) {
                // Création de la session utilisateur
                req.session.user = {
                    user_id: user.user_id,
                    username: user.username,
                    userphone: user.phone_number
                };
            } 
        } else {
            res.status(404).send('Utilisateur non trouvé');
        }
    } catch (error) {
        console.error('Erreur lors de l\'authentification :', error);
        res.status(500).send('Erreur serveur');
    }
});

// Middleware pour vérifier l'état de la session
app.get('/profil', (req, res) => {
    if (req.session.user) {
        res.send(`Bonjour ${req.session.user.username}`);
    } else {
        res.status(401).send('Non autorisé');
    }
});
// Middleware pour vérifier l'état de la session et récupérer les informations de l'utilisateur
app.get('/userinfo', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).send('Non autorisé');
    }
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
