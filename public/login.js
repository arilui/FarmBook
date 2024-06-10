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

    // Function to redirect to create account page when create account button is clicked
    function redirectToCreateAccountPage() {
        console.log("Redirecting to create an account...");
        window.location.href = "createaccount.html";
    }

    // Function to handle login form submission
    async function handleLoginFormSubmission(event) {
        console.log("Login form submitted");
        event.preventDefault(); // Prevent the form from submitting normally
        
        // Retrieve form data
        var username = document.getElementById("login-username").value;
        var password = document.getElementById("login-password").value;
        
        // Send login request to server
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password })
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log("Server response:", data); // Log the server response
                
                if (data.isSeller) {
                    console.log("Redirecting to seller page");
                    // Redirect to seller page
                    window.location.href = "sellerpage.html";
                } else {
                    console.log("Redirecting to index page");
                    // Redirect to index page
                    window.location.href = "index.html";
                }
            } else {
                console.error('Login failed:', response.statusText);
                // Reset form fields
                document.getElementById("login-username").value = "";
                document.getElementById("login-password").value = "";
                // Display an error message to the user
                alert('Login failed. Please check your username and password and try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            // Display an error message to the user
            alert('An error occurred during login. Please try again later.');
        }
    }
    
    
    

    // Attach event listeners
    document.querySelector(".logo-button").addEventListener("click", redirectToIndexPage);
    document.querySelector(".back-button").addEventListener("click", goBack);
    document.querySelector("form").addEventListener("submit", handleLoginFormSubmission);
    document.getElementById("create-account-button").addEventListener("click", redirectToCreateAccountPage);
});
