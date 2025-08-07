const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

const pool = new Pool({
    user: 'your_db_username',
    host: 'localhost',
    database: 'your_database_name',
    password: 'your_db_password',
    port: 5432,
});

pool.on('error', (err, client) => {
    console.error('Error on PostgreSQL connection pool:', err);
});

app.use(cors());

app.use(express.json());

app.post('/submit-info', async (req, res) => {
    const { name, phone, email } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO users (name, phone, email) VALUES ($1, $2, $3) RETURNING id',
            [name, phone, email]
        );
        res.status(201).json({ message: 'Form data submitted successfully', userId: result.rows[0].id });
    } catch (error) {
        console.error('Error submitting form data:', error);
        res.status(500).json({ message: 'Error submitting form data' });
    }
});

// Start the server.
app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
