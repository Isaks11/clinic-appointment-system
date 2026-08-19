const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to SQLite Database (creates a file named clinic.db automatically)
const db = new sqlite3.Database('./clinic.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create Appointments Table if it doesn't exist yet
db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patientName TEXT,
    doctor TEXT,
    appointmentDate TEXT
)`, (err) => {
    if (!err) {
        console.log('Appointments table ready.');
    }
});

// API Endpoint: Save a new appointment (POST)
app.post('/api/appointments', (req, res) => {
    const { patientName, doctor, appointmentDate } = req.body;
    
    const query = `INSERT INTO appointments (patientName, doctor, appointmentDate) VALUES (?, ?, ?)`;
    db.run(query, [patientName, doctor, appointmentDate], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Appointment booked successfully!', id: this.lastID });
    });
});

// API Endpoint: Get all appointments for Admin (GET)
app.get('/api/appointments', (req, res) => {
    const query = `SELECT * FROM appointments`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ appointments: rows });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});