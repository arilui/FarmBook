"use strict";

const express = require('express');
const app = express();
const multer = require('multer');
app.use(multer().none());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbUser:passw0rd@farmbook.rsj9viv.mongodb.net/?retryWrites=true&w=majority&appName=FarmBook";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/posts', function (req, res) {
  res.type("text").send("Hello World");
});

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
const PORT = process.env.PORT || 3000;
app.listen(PORT);