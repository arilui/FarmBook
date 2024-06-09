document.addEventListener("DOMContentLoaded", function() {
    // Function to redirect to index page when logo button is clicked
    function redirectToIndexPage() {
        console.log("Redirecting to index page...");
        window.location.href = "index.html";
    }

    // Attach event listener to the logo button
    document.querySelector(".logo-button").addEventListener("click", redirectToIndexPage);

    // Attach event listener to the login button
    document.querySelector(".login-button").addEventListener("click", function(event) {
        event.stopPropagation(); // Prevents the click event from propagating to the window
        document.getElementById("logoutDropdown").classList.toggle("show");
    });
    
    // Function to handle click event on edit store image button
    document.getElementById("edit-store-image-button").addEventListener("click", function() {
        // Trigger file input click event
        document.getElementById("store-image-upload").click();
    });

    // Function to handle file input change event
    document.getElementById("store-image-upload").addEventListener("change", function(event) {
        var file = event.target.files[0]; // Get the selected file

        if (file) {
            // Read the file as a URL
            var reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById("store-img").src = event.target.result; // Set the image source
            };
            reader.readAsDataURL(file);
        }
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.login-button')) {
            var dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(function(dropdown) {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            });
        }
    });
});
