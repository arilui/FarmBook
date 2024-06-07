const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB connection setup
const uri = "mongodb+srv://dbUser:passw0rd@farmbook.rsj9viv.mongodb.net/?retryWrites=true&w=majority&appName=FarmBook";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error(e);
  }
}

// Express setup
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' folder

// Endpoint to fetch products from MongoDB
// app.get('/Products', async (req, res) => {
//   try {
//     await connectToDatabase();
//     const db = client.db('FarmBook'); // Replace with your database name
//     const products = await db.collection('Product').find({}).toArray();
//     res.json(products);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });
app.get('/products', async(req, res) => {
  let client = await connectToMongo();
  try{
    let database = client.db('FarmBook');
    let collection = database.collection('Product');
    let products = await collection.find().toArray();
    res.status(SUCCESS_STATUS_CODE).json(products);
  } catch (err) {
    res.status(SERVER_SIDE_ERROR_STATUS_CODE).json({message: err.message});
  } finally {
    client.close();
    console.log("close");
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
