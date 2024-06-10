/*
 * Name: Hannah King
 * Date: 06.10.2024
 * Groupmates: Paige Lui, Mariana Pereira, and Hawraa Al Hasnawi
 *
 * This is the JS to implement the UI for the our error page which only allows the
 * user to view the standard error message and click back to the home page
 */
"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * Sets up the necessary buttons and displays the error page when the webpage loads.
   */
  function init() {
    id('home-button').addEventListener("click", goToHomePage);
  }

  /**
   * Takes user to the home page
   */
  function goToHomePage() {
    window.location.href = "index.html";
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

})();