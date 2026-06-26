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
        { id: 4, name: 'Product 4', price: 400 },
        { id: 5, name: 'Product 5', price: 500 },
        { id: 6, name: 'Product 6', price: 600 },
        { id: 7, name: 'Product 7', price: 700 },
        { id: 8, name: 'Product 8', price: 800 },
        { id: 9, name: 'Product 9', price: 900 },
        { id: 10, name: 'Product 10', price: 1000 },
        { id: 11, name: 'Product 11', price: 1100 },
        { id: 12, name: 'Product 12', price: 1200 },
        { id: 13, name: 'Product 13', price: 1300 },
        { id: 14, name: 'Product 14', price: 1400 },
        { id: 15, name: 'Product 15', price: 1500 },
        { id: 16, name: 'Product 16', price: 1600 },
        { id: 17, name: 'Product 17', price: 1700 },
        { id: 18, name: 'Product 18', price: 1800 },
        { id: 19, name: 'Product 19', price: 1900 },
        { id: 20, name: 'Product 20', price: 2000 },
        { id: 21, name: 'Product 21', price: 2100 },
        { id: 22, name: 'Product 22', price: 2200 },
        { id: 23, name: 'Product 23', price: 2300 },
        { id: 24, name: 'Product 24', price: 2400 },
        { id: 25, name: 'Product 25', price: 2500 },
        { id: 26, name: 'Product 26', price: 2600 },
        { id: 27, name: 'Product 27', price: 2700 },
        { id: 28, name: 'Product 28', price: 2800 },
        { id: 29, name: 'Product 29', price: 2900 },
        { id: 30, name: 'Product 30', price: 3000 },
        { id: 31, name: 'Product 31', price: 3100 },

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