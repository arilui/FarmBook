"use strict";

const express = require('express');
const app = express();

const multer = require('multer');
app.use(multer().none());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// })

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

// returns a JSON of the given product's information
app.get('/products/:id', async(req, res) => {
  let client = await connectToMongo();
  try{
    let database = client.db('FarmBook');
    let collection = database.collection('Product');
    let id = new ObjectId(req.params);
    let productInfo = await collection.findOne({_id: id});
    if (productInfo) {
      res.status(SUCCESS_STATUS_CODE).json({exists: true, productInfo});
    } else {
      res.status(CLIENT_SIDE_ERROR_STATUS_CODE).json({exists: false});
    }
  } catch (err) {
    res.status(SERVER_SIDE_ERROR_STATUS_CODE).json({message: err.message});
  } finally {
    client.close();
    console.log("close");
  }
})

// checks to see if the username and password are in the database
app.post('/login', async (req, res) => {
  // Connecting with MongoDB
  let client = await connectToMongo();

  // Extract email and password from the request body
  const { username, password } = req.body;

  console.log('Username: ' + username);
  console.log('Password: ' + password);

  try {
    // Connecting with user collection
    let database = client.db('FarmBook');
    let collection = database.collection('User');

    let user = await collection.findOne({email: username});

    if (user) {
      // Respond with user data including isSeller if authentication succeeds
      if(password === user.password){
        res.status(200).json({ message: 'Login successful', isSeller: user.isSeller });
      } else {
        // Respond with an error message if authentication fails
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).json({ message: 'User not found' });
    }
  } catch (error) {
    // Handle server-side errors
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred during login. Please try again later.' });
  } finally {
    // Finish connection with database
    client.close();
    console.log("close");
  }
});

let userCount = 6; // Initialize userCount to 6
// adds the given new user's information to the database
app.post('/createaccount', async (req, res) => {
  const { email, password, isSeller } = req.body;
  let client = await connectToMongo();

  try {
    let database = client.db('FarmBook');
    let collection = database.collection('User');
    let existingUser = await collection.findOne({ email }); // Use email here

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Increment the userCount for the next user
    userCount++;

    // Insert the new user into the database with the incremented userCount
    await collection.insertOne({ userID: userCount, email, password, isSeller });

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'An error occurred during registration. Please try again later.' });
  } finally {
    // Close the database connection
    client.close();
    console.log("close");
  }
});

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);