"use strict";
(function(){
    window.addEventListener('load', init);

    /**
     * Sets up the necessary buttons and displays the cart page when the webpage loads.
     */
    function init(){
        id('farmbook-logo').addEventListener('click', goToHomePage);
        id('login-icon').addEventListener('click', function(event) {
            event.stopPropagation(); 
            id("logoutDropdown").classList.toggle("show");
        });
        id('shopping-cart').addEventListener('click', refreshPage);
        displayCartItems();
    }

    /**
     * Takes user to the home page
     */
    function goToHomePage() {
        window.location.href = "index.html";
    }

    /**
     * Takes user to the login page
     */
    function goToLoginPage() {
        window.location.href = "login.html";
    }

    /**
     * Refreshes the cart page
     */
    function refreshPage(){
        window.location.href = "cartpage.html";
    }

    /**
     * Displays the cart items in the table.
     */
    function displayCartItems() {
        let cartItems = [
            {name: "Tomatos", quantity: 1, price: 3}
        ]; 

        let tbody = id('cart-items').querySelector('tbody');
        cartItems.forEach(item => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price}</td>
                <td>$${item.quantity * item.price}</td>
            `;
            tbody.appendChild(row);
        });
    }

    /** ------------------------------ Helper Functions  ------------------------------ */

    /**
     * Returns the element that has the ID attribute with the specified value.
     * @param {string} idName - element ID
     * @returns {object} DOM object associated with id.
     */
    function id(idName) {
        return document.getElementById(idName);
    }

    window.logout = function() {
        console.log("Logging out...");
        window.location.href = "login.html";
    }
})();
