import mysql from 'mysql';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: "covoituser",
    password: "mirahona.1",
    database: "covoiturage"
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
    // Vous n'avez pas besoin de mettre les valeurs entre crochets ici
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.json({ Message: "Error in NODE" });
        } else {
            return res.json(result);
        }
    });
});




app.listen(8081, () => {
    console.log('Connected to the server');
})