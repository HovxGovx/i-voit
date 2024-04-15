const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.SERVER_PORT || 5000;
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    password: 'mirahona1.',
    host: 'localhost',
    port: '5432',
    database: 'covoiturage'
});
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // Remplacez ceci par l'URL de votre application React
    credentials: true // Autoriser l'envoi de cookies avec les requêtes cross-origin
  };
  
  app.use(cors(corsOptions));
  

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(morgan('combined'));

app.use(cors());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));
app.use(express.json());


// Route de connexion
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Vérifier les informations d'identification dans la base de données
      const userQuery = 'SELECT * FROM usercocovoiturage WHERE username = $1 AND password = $2';
      const userResult = await pool.query(userQuery, [username, password]);
  
      if (userResult.rows.length > 0) {
        // Informations d'identification valides, créer une session utilisateur
        req.session.userId = userResult.rows[0].user_id;
        res.status(200).json({ message: 'Connexion réussie' });
      } else {
        // Informations d'identification invalides
        res.status(401).json({ message: 'Identifiant ou mot de passe incorrect' });
      }
    } catch (error) {
      console.error('Erreur lors de la tentative de connexion :', error);
      res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
  });
app.get('/userinfo', (req, res) => {
    // Vérifier si l'utilisateur est connecté
    if (req.session.userId) {
        // Récupérer les informations de l'utilisateur depuis la session
        const userInfo = {
            username: req.session.username,
            phone_number: req.session.phone_number
            // Ajoutez d'autres informations d'utilisateur si nécessaire
        };
        res.status(200).json(userInfo);
    } else {
        res.status(401).json({ message: 'Utilisateur non connecté' });
    }
});
  
// Route d'Inscription
app.post('/signup', async (req, res) => {
    const { username, password, phone_number } = req.body;

    try {
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
