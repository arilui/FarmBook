document.addEventListener("DOMContentLoaded", function() {
    // Function to redirect to index page when logo button is clicked
    function redirectToIndexPage() {
        console.log("Redirecting to index page...");
        window.location.href = "index.html";
    }
    
    
    
     // Attach event listeners
     document.querySelector(".logo-button").addEventListener("click", redirectToIndexPage);
    
    });