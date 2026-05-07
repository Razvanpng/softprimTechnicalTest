const express = require('express');
const cors = require('cors');
const dbPool = require('./db');
require('dotenv').config();

const app = express();
const appPort = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/categories', async (req, res) => {
    try {
        const [cats] = await dbPool.query('SELECT id, name, slug FROM categories ORDER BY name ASC');
        res.status(200).json(cats);
    } catch (err) {
        console.log('eroare la categorii: ', err);
        res.status(500).json({ message: 'eroare de server' });
    }
});

app.get('/api/products', async (req, res) => {
    const filterId = req.query.category_id;

    try {
        let sql = 'SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id';
        let queryParams = [];

        if (filterId) {
            // validare parametru
            if (isNaN(filterId)) {
                return res.status(400).json({ message: 'id invalid' });
            }
            
            sql = sql + ' WHERE p.category_id = ?';
            queryParams.push(parseInt(filterId));
        }

        const [prods] = await dbPool.query(sql, queryParams);
        res.status(200).json(prods);
        
    } catch (err) {
        console.log('eroare la produse: ', err);
        res.status(500).json({ message: 'eroare de server' });
    }
});

app.listen(appPort, () => {
    console.log(`api merge pe portul ${appPort}`);
});