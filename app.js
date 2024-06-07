"use strict";

const express = require('express');//
const app = express();//

const multer = require('multer');
app.use(multer().none());

app.use(express.urlencoded({extended: true}));
app.use(express.json());//

const { MongoClient, ServerApiVersion } = require('mongodb');//
const uri = "mongodb+srv://dbUser:passw0rd@farmbook.rsj9viv.mongodb.net/?retryWrites=true&w=majority&appName=FarmBook";

const SERVER_SIDE_ERROR_STATUS_CODE = 500;
const CLIENT_SIDE_ERROR_STATUS_CODE = 400;
const SUCCESS_STATUS_CODE = 200;

/**
 * Establishes a database connection to the database and returns the database object.
 * Any errors that occur should be caught in the function that calls this one.
 * @returns { MongoClient, ServerApiVersion } - The database object for the connection.
 */
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


// returns a JSON of all of each product's information
app.get('/helloworld', function (req, res) {
  console.log("test test test");
  res.type("text").send("Hello World!");
});

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

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);