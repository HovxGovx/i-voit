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

app.use(bodyParser.json());
const db = mysql.createConnection({
    host: 'localhost',
    user: "covoituser",
    password: "mirahona.1",
    database: "covoiturage"
});
let currentSessionId = null;
app.post('/logout', async (req, res) => {
    try {
        const  session_id  = currentSessionId; 

        if (!currentSessionId) {
            return res.status(401).json({ message: 'No session found' });
        }

        const expires = new Date(); // Set expiration date to current date (effectively closing the session)

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

function generateSessionId() {
    const randomNumber1 = Math.floor(Math.random() * 100); // Génère un chiffre aléatoire de 0 à 99
    const randomNumber2 = Math.floor(Math.random() * 100); // Génère un autre chiffre aléatoire de 0 à 99
    return `${randomNumber1}${randomNumber2}`; // Concatène les deux chiffres pour former l'ID de session
}



app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body; // Get username and password from request body

        // Check if both username and password are provided
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
 

// Endpoint pour récupérer les informations de la session et de l'utilisateur
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
                return res.json({ session: sessionData, user: userData});
            });
        });
    } catch (error) {
        console.error('Error fetching session info:', error);
        return res.status(500).json({ message: 'Error fetching session info' });
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

app.listen(8081, () => {
    console.log('Connected to the server');
});
