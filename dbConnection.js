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

// Express setup
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' folder

async function connectToMongo() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  await client.connect();
  console.log("connected");
  return client;
}

app.get('/products', async(req, res) => {
  let client = await connectToMongo();
  try{
    let database = client.db('FarmBook');
    let collection = database.collection('Product');
    let products = await collection.find().toArray();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    client.close();
    console.log("close");
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
