const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: ["https://grocery-x.vercel.app"], credentials: true }));
app.use(express.json());

// MongoDB Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db('groceryX');
        const productCollection = db.collection('products');

        app.get("/api/v1/products", async (req, res) => {
            let query = {};
            if (req.query.priceRange) {
                query.price = { $lte: Number(req.query.priceRange) };
            }
            if (req.query.category) {
                query.category = req.query.category;
            }
            if (req.query.rating) {
                query.rating = { $gte: Number(req.query.rating) };
            }
            const result = await productCollection.find(query).sort({ price: -1 }).toArray();
            res.json(result);
        });

        app.get("/api/v1/products/:id", async (req, res) => {
            const query = { objectID: Number(req.params.id) };
            const result = await productCollection.findOne(query);
            res.json(result);
        });

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } finally {
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    const serverStatus = {
        message: 'Server is running smoothly',
        timestamp: new Date()
    };
    res.json(serverStatus);
});