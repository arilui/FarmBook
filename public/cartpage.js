/*
 * Name: Hannah King
 * Date: 06.10.2024
 * Groupmates: Paige Lui, Mariana Pereira, and Hawraa Al Hasnawi
 *
 * This is the JS to implement the UI for the our cart page which allows the
 * user to view the items in their cart.
 */
"use strict";
(function(){
    window.addEventListener("load",init);

    /**
     * Sets up the necessary buttons and displays the cart page when the webpage loads.
     */
    function init(){
        id(farmbook-logo).addEventListener("click", goToHomePage);
        id(login-button).addEventListener("click", goToLoginPage);
        id(cart-button).addEventListener("click", refreshPage);
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

    /** ------------------------------ Helper Functions  ------------------------------ */

    /**
     * Returns the element that has the ID attribute with the specified value.
     * @param {string} idName - element ID
     * @returns {object} DOM object associated with id.
     */
    function id(idName) {
        return document.getElementById(idName);
  }

})