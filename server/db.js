import mysql from 'mysql';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
let currentSessionId = null;
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        name: "ttt",
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))



const db = mysql.createConnection({
    host: 'localhost',
    user: "covoituser",
    password: "mirahona.1",
    database: "covoiturage"
})
app.use((req, res, next) => {
    console.log('Session:', req.session);
    next();
});
app.post('/signup', (req, res) => {
    const is_admin = false;
    const registration_date = new Date();
    const values = [
        req.body.username,
        req.body.password,
        req.body.phoneNumber,
        is_admin,
        registration_date
    ];
    const sql = "INSERT INTO usercocovoiturage (`username`, `password`, `phone_number`, `is_admin`, `registration_date`) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.json({ Message: "Error in NODE" });
        } else {
            return res.json(result);
        }
    });
});
// Fonction pour générer un ID de session aléatoire
function generateSessionId() {
    // Logique pour générer un ID de session unique, par exemple :
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Endpoint pour créer une session
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const sql = "SELECT * FROM usercocovoiturage WHERE username=? AND password=?";
        const [rows, fields] = await pool.query(sql, [username, password]);
        
        if (rows.length > 0) {
            const user_id = rows[0].user_id;
            const sessionId = generateSessionId(); // Générer un nouvel ID de session
            const data = JSON.stringify({ username: rows[0].username }); // Données de session
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 jour à partir de maintenant

            // Insérer une nouvelle session dans la base de données
            await pool.query(
                'INSERT INTO sessions (session_id, user_id, data, expires) VALUES (?, ?, ?, ?)',
                [sessionId, user_id, data, expires]
            );

            // Retourner une réponse de connexion réussie avec l'ID de session
            return res.json({ login: true, session_id: sessionId });
        } else {
            return res.json({ login: false });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Error during login' });
    }
});

// Endpoint pour récupérer la session en cours
app.get('/session', async (req, res) => {
    try {
        const sessionId = req.headers['x-session-id']; // Récupérer l'ID de session depuis les en-têtes de la requête

        if (!sessionId) {
            return res.status(401).json({ message: 'Session ID not provided' });
        }

        // Requête pour récupérer les données de session en fonction de l'ID de session
        const sql = "SELECT * FROM sessions WHERE session_id = ? AND expires > NOW()";
        const [rows, fields] = await pool.query(sql, [sessionId]);

        if (rows.length > 0) {
            const sessionData = JSON.parse(rows[0].data);
            return res.json({ session: sessionData });
        } else {
            return res.status(401).json({ message: 'Invalid session ID or session expired' });
        }
    } catch (error) {
        console.error('Error fetching session:', error);
        return res.status(500).json({ message: 'Error fetching session' });
    }
});


app.listen(8081, () => {
    console.log('Connected to the server');
})