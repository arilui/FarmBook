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
    function handleLoginFormSubmission(event) {
        console.log("Login form submitted");
        event.preventDefault(); // Prevent the form from submitting normally
        
        // Retrieve form data
        var username = document.getElementById("login-username").value;
        var password = document.getElementById("login-password").value;
        
        // Example: Display the form data in the console
        console.log("Username: " + username);
        console.log("Password: " + password);

        // Here you can add logic to validate the username and password
        // For simplicity, let's just log a message indicating successful login
        console.log("Login successful!");
        
        // Redirect to another page or perform further actions after successful login
    }

    // Attach event listeners
    document.querySelector(".logo-button").addEventListener("click", redirectToIndexPage);
    document.querySelector(".back-button").addEventListener("click", goBack);
    document.querySelector("form").addEventListener("submit", handleLoginFormSubmission);
    document.getElementById("create-account-button").addEventListener("click", redirectToCreateAccountPage);
});
