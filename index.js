require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database Connection Failed:', err);
        return;
    }

    console.log('MySQL Connected Successfully');
});

// also create home route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Express API Dynamic'
    });
});

// Get Users API
app.get('/api/users', (req, res) => {

    const sql = 'SELECT * FROM users';

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            total: result.length,
            data: result
        });
    });
});

// create one more products api and pass staic data
app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
        { id: 3, name: 'Product 3', price: 300 },
        { id: 4, name: 'Product 4', price: 400 }
    ];

    res.json({
        success: true,
        total: products.length,
        data: products
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});