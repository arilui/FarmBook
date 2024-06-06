// import { MongoClient, ServerApiVersion } from 'mongodb';
// const uri = "mongodb+srv://dbUser:passw0rd@farmbook.rsj9viv.mongodb.net/?retryWrites=true&w=majority&appName=FarmBook";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db('FarmBook').command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


document.addEventListener("DOMContentLoaded", function() {
    // Function to redirect to index page when logo button is clicked
    function redirectToIndexPage() {
        console.log("Redirecting to index page...");
        window.location.href = "index.html";
    }
    
    // Function to go back to the previous page when the back button is clicked
    function goBack() {
        console.log("Going back...");
        window.history.back();
    }

    let selectedOption = null;
    
    const seller = document.querySelector('#seller');
    seller.addEventListener('change', ()=> {
      
        selectedOption = seller.checked;
      
    });
  
    const buyer = document.querySelector('#buyer');
    buyer.addEventListener('change', ()=> {
      
        selectedOption = !buyer.checked;
      
    });

    // Function to handle form submission
    async function handleFormSubmission(event) {
        console.log("Form submitted");
        event.preventDefault(); // Prevent the form from submitting normally
        
        // Retrieve form data
        var email = document.getElementById("email").value;
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        
      
        // Example: Display the form data in the console
        console.log("Email: " + email);
        console.log("Username: " + username);
        console.log("Password: " + password);
        console.log("Account Type: " + (selectedOption ? 'Seller' : 'Buyer'));

        var userCount = 7;
        // Here send the form data to server using AJAX or fetch()
        try{
            const database = client.db('FarmBook');
            const collection = database.collection('User');
            const doc = {UserID : userCount, email : email, password : password, iSeller : selectedOption};

            await collection.insertOne(doc);

            userCount++;
            collection.insertOne(doc);
            // Reset the form
            document.querySelector(".center").reset();
        } catch(error){
            console.error("Error inserting document into MongoDB:", error);
        }

    }
    
    // Attach event listeners
    console.log("Attaching event listeners...");
    document.querySelector(".logo-button").addEventListener("click", redirectToIndexPage);
    document.querySelector(".back-button").addEventListener("click", goBack);

    // Debugging code to verify if the form element exists before adding the event listener
    var createAccountForm = document.getElementById("create-account-page-elements");
    console.log(createAccountForm); // Check if the element exists
    if (createAccountForm) {
        createAccountForm.addEventListener("submit", handleFormSubmission);
    } else {
        console.error("Element with id 'create-account-page-elements' not found");
    }
});
