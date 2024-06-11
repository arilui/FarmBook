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
        var newStoreName = document.getElementById("edit-store-name").value;
        
        // Update the store name with the new store name
        document.getElementById("store-name").innerText = newStoreName;
        document.getElementById("edit-store-name").value = "";
    });

    // Fetch store name of the logged-in seller and update the DOM
    fetch(`/login`) // Assuming the server responds with the store name upon successful login
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data); // Log the response data to check if it contains the store name
        const storeName = data.storeName;
        
        // Update the DOM with the fetched store name
        var storeNameElement = document.getElementById("store-name");
        if (storeNameElement) { // Check if the element exists before updating
            storeNameElement.innerText = storeName;
        } else {
            console.error("Store name element not found");
        }
    })
    .catch(error => console.error('Error fetching store name:', error));
    
            function getUrlParameter(name) {
            name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        };
    
        function displayStoreName() {
            var storeName = getUrlParameter('storeName');
            document.getElementById("store-name").innerText = storeName;
        }
    
        displayStoreName();

           // Function to handle the submission of new product data
           async function handleProductRegistration(event) {
            event.preventDefault(); // Prevent the form from submitting normally
        
            // Retrieve product data from the form fields
            var productName = document.getElementById("product-name").value;
            var productPrice = document.getElementById("product-price").value;
            var productDescription = document.getElementById("product-description").value;
        
            // Send the new product data to the server
            try {
              const response = await fetch('/createproduct', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: productName, price: productPrice, description: productDescription })
              });
        
              if (response.ok) {
                const data = await response.json();
                console.log("Server response:", data);
                alert('Product registered successfully.');
                // Clear the form fields after successful submission
                document.getElementById("product-name").value = "";
                document.getElementById("product-price").value = "";
                document.getElementById("product-description").value = "";
              } else {
                console.error('Product registration failed:', response.statusText);
                alert('Product registration failed. Please try again.');
              }
            } catch (error) {
              console.error('Error during product registration:', error);
              alert('An error occurred during product registration. Please try again later.');
            }
          }
        
          // Attach event listener to the form for product registration
          document.getElementById("product-registration-form").addEventListener("submit", handleProductRegistration);
        });
