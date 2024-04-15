import mysql from 'mysql';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["POST","GET"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: "secret",//cle secret d'enryptage
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }//propriete du cookie
}))


const db = mysql.createConnection({
    host: 'localhost',
    user: "covoituser",
    password: "mirahona.1",
    database: "covoiturage"
})
app.get('/', (req, res) => {
    if (req.session.username) {
        return res.json({ valid: true, username: req.session.username })
    } else {
        return res.json({ valid: false });
    }
})

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

app.post('/login', (req, res) => {
    const values = [
        req.body.username,
        req.body.password,
    ];
    const sql = "SELECT * FROM usercocovoiturage WHERE username=? AND password= ?";
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.json({ Message: "Error in NODE" });
        }
        if (result.length > 0) {
            req.session.username = result[0].username;
            return res.json({ Login: true});
        } else {
            return res.json({ Login: false });
        }
    });
});




app.listen(8081, () => {
    console.log('Connected to the server');
})