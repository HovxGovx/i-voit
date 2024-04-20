import mysql from 'mysql';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["POST", "GET"],
    credentials: true
}));
// ! Connexion a la BD
app.use(bodyParser.json());
const db = mysql.createConnection({
    host: 'localhost',
    user: "covoituser",
    password: "mirahona.1",
    database: "covoiturage"
});
let currentSessionId = null;
//  ! Endpoint d'Inscription
app.post('/signup', async (req, res) => {
    const { username, password, phone_number } = req.body;

    try {
        // Insérer l'utilisateur dans la base de données
        const insertUserQuery = `
            INSERT INTO usercocovoiturage (username, password,  phone_number, is_admin, registration_date)
            VALUES (?, ?,  ?, ?, CURRENT_TIMESTAMP)
        `;
        db.query(insertUserQuery, [username, password,  phone_number, false], async (insertError, result) => {
            if (insertError) {
                console.error('Erreur lors de l\'inscription :', insertError);
                return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
            }

            // Récupérer l'ID de l'utilisateur nouvellement inscrit
            const userId = result.insertId;

            // Générer une session pour l'utilisateur
            const sessionId = generateSessionId();
            const data = JSON.stringify({ username: username });
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

            // Insérer la session dans la base de données
            db.query(
                'INSERT INTO sessions (session_id, user_id, data, expires) VALUES (?, ?, ?, ?)',
                [sessionId, userId, data, expires],
                (sessionInsertError, sessionResult) => {
                    if (sessionInsertError) {
                        console.error('Erreur lors de la création de la session :', sessionInsertError);
                        return res.status(500).json({ message: 'Erreur lors de la création de la session' });
                    }

                    // Définir la session actuelle
                    currentSessionId = sessionId;

                    // Répondre avec succès et renvoyer l'ID de session
                    return res.status(201).json({ message: 'Inscription réussie', session_id: sessionId });
                }
            );
        });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
    }
});
// ! deconnexion
app.post('/logout', async (req, res) => {
    try {
        const  session_id  = currentSessionId; 

        if (!currentSessionId) {
            return res.status(401).json({ message: 'No session found' });
        }

        const expires = new Date(); 

        db.query(
            'UPDATE sessions SET expires = ? WHERE session_id = ?',
            [expires, session_id],
            (updateError, result) => {
                if (updateError) {
                    console.error('Error updating session:', updateError);
                    console.log(currentSessionId);
                    return res.status(500).json({ message: 'Error during logout' });
                }

                currentSessionId = null;
                return res.json({ logout: true });
            }
        );
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Error during logout' });
    }
});

// ! Genere le numero de la session aleatoirement
function generateSessionId() {
    const randomNumber1 = Math.floor(Math.random() * 100);
    const randomNumber2 = Math.floor(Math.random() * 100); 
    return `${randomNumber1}${randomNumber2}`; 
}
// ! Connexion
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body; 

        
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const sql = "SELECT * FROM usercocovoiturage WHERE username=? AND password=?";
        db.query(sql, [username, password], async (error, rows, fields) => {
            if (error) {
                console.error('Error during login:', error);
                return res.status(500).json({ message: 'Error during login' });
            }

            if (rows.length > 0) {
                const user_id = rows[0].user_id;
                const sessionId = generateSessionId();
                const data = JSON.stringify({ username: rows[0].username });
                const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

                db.query(
                    'INSERT INTO sessions (session_id, user_id, data, expires) VALUES (?, ?, ?, ?)',
                    [sessionId, user_id, data, expires],
                    (insertError, result) => {
                        if (insertError) {
                            console.error('Error inserting session:', insertError);
                            return res.status(500).json({ message: 'Error during session\'s creation' });
                        }

                        currentSessionId = sessionId;
                        return res.json({ login: true, session_id: sessionId });
                    }
                );
            } else {
                return res.json({ login: false });
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Error during login' });
    }
});


//  ! Session Inormation
app.get('/session-info', async (req, res) => {
    try {
        if (!currentSessionId) {
            return currentSessionId;
        }

        const sessionQuery = "SELECT * FROM sessions WHERE session_id = ? AND expires > NOW()";
        db.query(sessionQuery, [currentSessionId], async (error, sessionRows, sessionFields) => {
            if (error) {
                console.error('Error fetching session info:', error);
                return res.status(500).json({ message: 'Error fetching session info' });
            }

            if (sessionRows.length === 0) {
                return res.status(404).json({ message: 'Session not found or expired' });
            }

            const sessionData = JSON.parse(sessionRows[0].data);
            const userId = sessionRows[0].user_id;

            const userQuery = "SELECT * FROM usercocovoiturage WHERE user_id = ?";
            db.query(userQuery, [userId], async (userError, userRows, userFields) => {
                if (userError) {
                    console.error('Error fetching user info:', userError);
                    return res.status(500).json({ message: 'Error fetching session info' });
                }

                if (userRows.length === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }
                const userData = userRows[0];
                return res.json({  sessionData,userData});
            });
        });
    } catch (error) {
        console.error('Error fetching session info:', error);
        return res.status(500).json({ message: 'Error fetching session info' });
    }
});

// ! Endpoint pour l'ajout d'un nouveau trajet
app.post('/add-ride', async (req, res) => {
    try {
        const { origin, destination, departure_datetime, available_seats, car_details, preferences } = req.body;
        const userId = req.headers.session_id;

        // Vérifier si l'utilisateur est connecté
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized - Please login to add a ride' });
        }
            // Insérer le nouveau trajet dans la base de données
            const insertRideQuery = `
                INSERT INTO rideoffer (user_id, origin, destination, departure_datetime, available_seats, car_details, preferences, creation_date)
                VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            `;
            db.query(insertRideQuery, [userId, origin, destination, departure_datetime, available_seats, car_details, preferences], async (insertError, result) => {
                if (insertError) {
                    console.error('Error adding ride:', insertError);
                    return res.status(500).json({ message: 'Error adding ride' });
                }

                return res.status(201).json({ message: 'Ride added successfully', ride_id: result.insertId });
            });
      
    } catch (error) {
        console.error('Error adding ride:', error);
        return res.status(500).json({ message: 'Error adding ride' });
    }
});


//! Port 
app.listen(8081, () => {
    console.log('Connected to the server');
});
