const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// dbpassward = m0JkEgL3po6eHtDn
// name = mobileBazar

const app = express();

// middleware
app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://mobileBazar:m0JkEgL3po6eHtDn@cluster0.qbh9oi5.mongodb.net/?retryWrites=true&w=majority";
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const usersCollection = client.db('mobileBazar').collection('users');
        const categoryCollection = client.db('mobileBazar').collection('category');
        const productsCollection = client.db('mobileBazar').collection('products');

        app.get('/category', async (req, res) => {
            const query = {};
            const category = await categoryCollection.find(query).toArray();
            res.send(category);
        });

        app.get('/products', async (req, res) => {
            const query = {};
            const products = await productsCollection.find(query).toArray();
            res.send(products);
        });


        app.post('/users', async (req, res) => {
            const user = req.body;
            // console.log(user);
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })
    }
    finally {

    }
}

run().catch(console.log)


app.get('/', async (req, res) => {
    res.send('Buy Sell server is running');
})

app.listen(port, () => console.log(`Buy Sell running on ${port}`))