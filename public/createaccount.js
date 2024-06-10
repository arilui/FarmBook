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

    let isSeller = false; // Initialize isSeller to false
    
    const seller = document.querySelector('#seller');
    seller.addEventListener('change', () => {
        isSeller = seller.checked; // Set isSeller to true if seller checkbox is checked
    });
  
    const buyer = document.querySelector('#buyer');
    buyer.addEventListener('change', () => {
        isSeller = !buyer.checked; // Set isSeller to false if buyer checkbox is checked
    });

    // Function to handle form submission
    async function handleFormSubmission(event) {
        console.log("Form submitted");
        event.preventDefault(); // Prevent the form from submitting normally
        
        // Retrieve form data
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        
        // Determine the value of isSeller based on the checkbox selection
        var isSeller = document.getElementById("seller").checked;

        // Validate email format using regex
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        // Display error message if email format is invalid
        alert("Please enter a valid email address");
        return; // Exit the function if email format is invalid
        }

        // Example: Display the form data in the console
        console.log("Email: " + email);
        console.log("Password: " + password);
        console.log("Is Seller: " + isSeller);

        // Send the form data to server using fetch
        const response = await fetch('/createaccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, isSeller })
        });

        try {
            
            // Handle server response
            if (response.ok) {
                const responseData = await response.json(); // Read response body 
                console.log("Account created successfully");
                // Redirect the user to index page or seller page based on isSeller value
                if (isSeller) {
                    window.location.href = "sellerpage.html";
                } else {
                    window.location.href = "index.html";
                }
            } else {
                const responseData = await response.json(); // Read response body 
                console.error("Error creating account:", responseData.message);
                // Display error message to the user
                alert(responseData.message);
            }
        } catch (error) {
            console.error("Error creating account:", error);
            // Display error message to the user
            alert("An error occurred. Please try again later.");
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
