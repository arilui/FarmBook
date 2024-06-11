/*
 * Names: Hannah King and Mariana Pereira
 * Date: 06.10.2024
 * Groupmates: Paige Lui and Hawraa Al Hasnawi
 *
 * This is the JS to implement the API for the FarmBook website and allows the program to
 * grab the information needed to display to the users, including all our products and the
 * details about each individual item. In addition, the API checks whether or not logins/signups
 * are successful. This also hosts the program on a web server via Node.js.
 */
"use strict";

const express = require('express');
const app = express();

const multer = require('multer');
app.use(multer().none());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

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
  }
})

// returns a JSON of the given product's information
app.get('/productpage.html/product', async(req, res) => {
  let client = await connectToMongo();
  try{
    let database = client.db('FarmBook');
    let collection = database.collection('Product');
    let id = new ObjectId(req.query.id);
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
      // Respond with user data including isSeller and storeName if authentication succeeds
      if (password === user.password) {
        let storeName = user.storeName || '';
        res.status(200).json({ message: 'Login successful', isSeller: user.isSeller, storeName: storeName });
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

  let client = await connectToMongo();
  const { email, password, isSeller } = req.body;

  try {
    let database = client.db('FarmBook');
    let collection = database.collection('User');
    let existingUser = await collection.findOne({ email }); // Use email here

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }


    // Insert the new user into the database with the incremented userCount
    await collection.insertOne({ email, password, isSeller, storeName });

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

app.post('/createproduct', async (req, res) => {
  // Connect to the MongoDB database
  let client = await connectToMongo();

  // Extract product data from the request body
  const { name: productName, price: productPrice, description: productDescription } = req.body;

  try {
    console.log('Request Body:', req.body); // Log the request body to check the extracted product data

    // Access the "products" collection
    let database = client.db('FarmBook');
    let collection = database.collection('Product');

    // Check if the product already exists in the database
    let existingProduct = await collection.findOne({ productName });

    if (existingProduct) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    // Insert the new product into the database
    //no image graphic by HideMaru, available at: https://www.freepik.com/search
    const result = await collection.insertOne({name: productName, price: productPrice, description: productDescription, image: "images/no-available-image.png"});
    console.log('Database Insert Result:', result); // Log the result of the database operation

    // Respond with a success message
    res.status(201).json({ message: 'Product registered successfully' });
  } catch (error) {
    console.error('Error during product registration:', error); // Log any errors that occur
    res.status(500).json({ message: 'An error occurred during product registration. Please try again later.' });
  } finally {
    // Close the database connection
    client.close();
    console.log("Database connection closed");
  }
});

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);