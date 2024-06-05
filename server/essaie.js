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
// ! Genere le numero de la session aleatoirement
function generateSessionId() {
    const randomNumber1 = Math.floor(Math.random() * 100);
    const randomNumber2 = Math.floor(Math.random() * 100);
    return `${randomNumber1}${randomNumber2}`;
}
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
        db.query(insertUserQuery, [username, password, phone_number, false], async (insertError, result) => {
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
        const session_id = currentSessionId;

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
                return res.json({ sessionData, userData });
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
        const { origin, destination, departureDate, available_seats, car_details, preferences, departureTime, prix } = req.body;
        const userId = req.headers.session_id;

        // Vérifier si l'utilisateur est connecté
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized - Please login to add a ride' });
        }
        // Insérer le nouveau trajet dans la base de données
        const insertRideQuery = `
                INSERT INTO rideoffer (user_id, origin, destination, departure_datetime, available_seats, car_details, preferences,heure, creation_date,prix)
                VALUES (?, ?, ?, ?, ?, ?, ?,?, CURRENT_TIMESTAMP,?)
            `;
        db.query(insertRideQuery, [userId, origin, destination, departureDate, available_seats, car_details, preferences, departureTime, prix], async (insertError, result) => {
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
// ! Endpoint pour l'ajout d'un personne
app.post('/add-personne', async (req, res) => {
    try {
        const { origin, destination, departureDate, available_seats, departureTime, prix } = req.body;
        const userIds = req.headers.session_id;

        // Vérifier si l'utilisateur est connecté
        if (!userIds) {
            return res.status(401).json({ message: 'Unauthorized - Please login to add a ride' });
        }
        // Insérer le nouveau trajet dans la base de données
        const insertRideQuery = `
                INSERT INTO personne (user_id, origin, destination, departure_datetime, seats, heure, prix,state)
                VALUES (?, ?, ?, ?, ?, ?, ?,'nonprise')
            `;
        db.query(insertRideQuery, [userIds, origin, destination, departureDate, available_seats, departureTime, prix], async (insertError, result) => {
            if (insertError) {
                console.error('Error adding personne:', insertError);
                return res.status(500).json({ message: 'Error adding ride' });
            }

            return res.status(201).json({ message: 'Ride added successfully', ride_id: result.insertId });
        });

    } catch (error) {
        console.error('Error adding ride:', error);
        return res.status(500).json({ message: 'Error adding ride' });
    }
});
// ! Endpoint pour récupérer toutes les origines
app.get('/origins', async (req, res) => {
    try {
        const selectOriginsQuery = `
            SELECT location_name FROM city_locations
        `;
        db.query(selectOriginsQuery, (error, results) => {
            if (error) {
                console.error('Error fetching origins:', error);
                return res.status(500).json({ message: 'Error fetching origins' });
            }
            const origins = results.map(result => result.location_name);
            return res.status(200).json({ origins });
        });
    } catch (error) {
        console.error('Error fetching origins:', error);
        return res.status(500).json({ message: 'Error fetching origins' });
    }
});

// ! Endpoint pour récupérer les offres de trajets avec les informations sur l'utilisateur
app.get('/ride-offers', async (req, res) => {
    try {
        // Sélectionner toutes les offres de trajets avec les informations sur l'utilisateur
        const rideOffersQuery = `
        SELECT 
            rideoffer.offer_id, 
            rideoffer.origin,
            rideoffer.user_id AS rideoffer_user_id,
            rideoffer.destination, 
            rideoffer.departure_datetime, 
            rideoffer.available_seats, 
            rideoffer.car_details, 
            rideoffer.preferences, 
            rideoffer.creation_date,
            rideoffer.heure,
            rideoffer.prix, 
            usercocovoiturage.username AS user_username,
            usercocovoiturage.phone_number AS user_phone_number
        FROM rideoffer
        INNER JOIN usercocovoiturage ON rideoffer.user_id = usercocovoiturage.user_id
    
        `;

        db.query(rideOffersQuery, (error, results) => {
            if (error) {
                console.error('Error fetching ride offers:', error);
                return res.status(500).json({ message: 'Error fetching ride offers' });
            }
            // Retourner les offres de trajets avec les informations sur l'utilisateur
            return res.status(200).json({ rideOffers: results });
        });
    } catch (error) {
        console.error('Error fetching ride offers:', error);
        return res.status(500).json({ message: 'Error fetching ride offers' });
    }
});
// ! Endpoint pour récupérer les personnes avec les informations sur l'utilisateur
app.get('/personne', async (req, res) => {
    try {
        // Sélectionner toutes les offres de trajets avec les informations sur l'utilisateur
        const personneQuery = `
        SELECT 
            personne.personneId, 
            personne.origin,
            personne.user_id AS personne_user_id,
            personne.destination, 
            personne.departure_datetime, 
            personne.seats, 
            personne.creationDate,
            personne.heure,
            personne.prix, 
            usercocovoiturage.username AS user_username,
            usercocovoiturage.phone_number AS user_phone_number
        FROM personne
        INNER JOIN usercocovoiturage ON personne.user_id = usercocovoiturage.user_id
    
        `;
        db.query(personneQuery, (error, results) => {
            if (error) {
                console.error('Error fetching Personnes:', error);
                return res.status(500).json({ message: 'Error fetching ride offers' });
            }
            // Retourner les offres de trajets avec les informations sur l'utilisateur
            return res.status(200).json({ personne: results });
        });
    } catch (error) {
        console.error('Error fetching ride offers:', error);
        return res.status(500).json({ message: 'Error fetching ride offers' });
    }
});

// ! Endpoint pour ajouter un ride offer parmi les bookings
app.post('/add-booking', async (req, res) => {
    try {
        const { ride_id, passenger_id, cout, place } = req.body;

        // Insérer le ride offer parmi les bookings dans la base de données
        const insertBookingQuery = `
            INSERT INTO booking (ride_id, passenger_id, booking_status, booking_date, prix, place)
            VALUES (?, ?, 'pending', CURRENT_TIMESTAMP, ?, ?)
        `;
        db.query(insertBookingQuery, [ride_id, passenger_id, cout, place], (error, result) => {
            if (error) {
                console.error('Error adding ride offer to bookings:', error);
                return res.status(500).json({ message: 'Error adding ride offer to bookings' });
            }

            // Mettre à jour le nombre de places disponibles dans le rideoffer
            const updateRideOfferQuery = `
                UPDATE rideoffer
                SET available_seats = available_seats - ?
                WHERE offer_id = ?
            `;
            db.query(updateRideOfferQuery, [place, ride_id], (error, result) => {
                if (error) {
                    console.error('Error updating available seats in ride offer:', error);
                    return res.status(500).json({ message: 'Error updating available seats in ride offer' });
                }
                return res.status(201).json({ message: 'Ride offer added to bookings successfully' });
            });
        });
        
    } catch (error) {
        console.error('Error adding ride offer to bookings:', error);
        return res.status(500).json({ message: 'Error adding ride offer to bookings' });

    }
});


//  ! recuperation de rideoffers d'une persone 
app.get('/user/rideoffers', async (req, res) => {
    const userId = req.headers.userId;

    const rideOffersQuery = `
        SELECT 
            rideoffer.offer_id, 
            rideoffer.origin,
            rideoffer.destination, 
            rideoffer.departure_datetime, 
            rideoffer.available_seats, 
            rideoffer.car_details, 
            rideoffer.preferences, 
            rideoffer.creation_date,
            rideoffer.heure,
            rideoffer.prix
        FROM rideoffer
        WHERE rideoffer.user_id = ?
    `;

    db.query(rideOffersQuery, [userId], (error, results) => {
        if (error) {
            console.error('Error fetching ride offers for user:', error);
            return res.status(500).json({ message: 'Error fetching ride offers for user' });
        }
        return res.status(200).json({ traG: results });
    });
});
// Définition de la route GET pour récupérer les offres de trajet d'un utilisateur
app.get('/rides/:user_id', (req, res) => {
    const userId = req.params.user_id;

    // Requête SQL pour récupérer les offres de trajet d'un utilisateur spécifique
    const sql = `SELECT * FROM rideoffer WHERE user_id = ?`;

    // Exécution de la requête SQL avec le user_id fourni
    db.query(sql, [userId], (error, results) => {
        if (error) {
            console.error('Erreur lors de l\'exécution de la requête : ' + error.stack);
            res.status(500).send('Erreur lors de la récupération des offres de trajet');
            return;
        }

        // Répond avec les données récupérées
        res.json(results);
    });
});
// Définition de la route GET pour récupérer les offres de trajet d'un utilisateur
app.get('/personnes/:user_id', (req, res) => {
    const userId = req.params.user_id;

    // Requête SQL pour récupérer les offres de trajet d'un utilisateur spécifique
    const sql = `SELECT * FROM personne WHERE user_id = ?`;

    // Exécution de la requête SQL avec le user_id fourni
    db.query(sql, [userId], (error, results) => {
        if (error) {
            console.error('Erreur lors de l\'exécution de la requête : ' + error.stack);
            res.status(500).send('Erreur lors de la récupération des offres de trajet');
            return;
        }

        // Répond avec les données récupérées
        res.json(results);
    });
});
// Endpoint pour récupérer les utilisateurs ayant réservé le même rideoffer
app.get('/rideoffer/bookings/:offerId/users', (req, res) => {
    const offerId = req.params.offerId;

    // Requête SQL pour récupérer les utilisateurs ayant réservé le même rideoffer avec les détails de réservation
    const sql = `
      SELECT u.*, b.place, b.prix
      FROM usercocovoiturage u
      INNER JOIN booking b ON u.user_id = b.passenger_id
      WHERE b.ride_id = ?
    `;

    db.query(sql, [offerId], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête SQL : ', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs ayant réservé le même rideoffer' });
            return;
        }

        // Renvoyer les résultats au format JSON
        res.json(results);
    });
});
app.get('/user/bookings/:userId', (req, res) => {
    const userId = req.params.userId;

    // Requête SQL pour récupérer les réservations d'une personne avec les détails du rideoffer associé
    const sql = `
      SELECT b.*, r.*
      FROM booking b
      INNER JOIN rideoffer r ON b.ride_id = r.offer_id
      WHERE b.passenger_id = ?
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête SQL : ', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des réservations de l\'utilisateur' });
            return;
        }
        // Renvoyer les résultats au format JSON
        res.json(results);
    });
});


//! Port d'ecoute
app.listen(8081, () => {
    console.log('Connected to the server');
});
