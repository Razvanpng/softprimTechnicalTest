const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// get categories
app.get('/api/categories', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, name, slug FROM categories ORDER BY name ASC');
        res.status(200).json(rows);
    } catch (error) {
        console.error('db error:', error);
        res.status(500).json({ error: 'internal server error' });
    }
});

// get products with optional category filter
app.get('/api/products', async (req, res) => {
    const categoryId = req.query.category_id;

    try {
        let query = `
            SELECT p.*, c.name as category_name 
            FROM products p 
            JOIN categories c ON p.category_id = c.id
        `;
        let params = [];

        if (categoryId) {
            if (!/^\d+$/.test(categoryId)) {
                return res.status(400).json({ error: 'invalid category_id' });
            }
            query += ' WHERE p.category_id = ?';
            params.push(Number(categoryId));
        }

        const [rows] = await pool.query(query, params);
        res.status(200).json(rows);
    } catch (error) {
        console.error('db error:', error);
        res.status(500).json({ error: 'internal server error' });
    }
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});