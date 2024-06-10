// Define the logout function globally
function logout() {
    console.log("Logging out...");
    // Redirect the user to the login page
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function() {

    // Function to redirect to index page when logo button is clicked
    function redirectToSellerPage() {
        console.log("Redirecting to seller page...");
        window.location.href = "sellerpage.html";
    }

    // Attach event listener to the logo button
    document.querySelector(".logo-button").addEventListener("click", redirectToSellerPage);

    // Attach event listener to the login button
    document.querySelector(".login-button").addEventListener("click", function(event) {
        event.stopPropagation(); // Prevents the click event from propagating to the window
        document.getElementById("logoutDropdown").classList.toggle("show");
    });

    // Function to handle click event on edit store name button
    document.getElementById("edit-store-name-button").addEventListener("click", function() {
        // Get the new store name from the input field
        var newStoreName = document.getElementById("new-store-name-input").value;
        var userEmail = "user@example.com"; // Replace with the logged-in user's email

        // Send an AJAX request to the server to update the store name
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/update-store-name", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Store name successfully updated
                    console.log("Store name updated successfully");
                    alert("Store name updated successfully");
                    // Optionally, update the UI to reflect the change
                    document.getElementById("store-name-display").innerText = newStoreName;
                } else {
                    // Error occurred while updating store name
                    console.error("Error updating store name:", xhr.responseText);
                    alert("Error updating store name. Please try again.");
                }
            }
        };
        
        // Send the user email and new store name in the request body
        xhr.send(JSON.stringify({ email: userEmail, newStoreName: newStoreName }));
    });
});
