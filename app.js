"use strict";

const express = require('express');//
const app = express();//

const multer = require('multer');
app.use(multer().none());

app.use(express.urlencoded({extended: true}));
app.use(express.json());//

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// })

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
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({message: err.message});
  } finally {
    client.close();
    console.log("close");
  }
})

app.post('/login', async (req, res) => {
  // Connecting with mongodb
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
    
    
      // Perform authentication check (e.g., check against database)
      // Example: You can use MongoDB to check if the email and password match a user document in the database

    if (user) {
          // Respond with a success message if authentication succeeds
      if(password === user.password){
        res.status(200).json({ message: 'Login successful' });
      
      } else {
        // Respond with an error message if authentication fails
        res.status(401).json({ message: 'Invalid email or password' });
      }

      }else {
        res.status(401).json({ message: 'User not found' });
      }

  }catch (error) {

    // Handle server-side errors
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred during login. Please try again later.' });

  } finally {
    // Finishing conection with database
    client.close();
    console.log("close");
  }
});




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