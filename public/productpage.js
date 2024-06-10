/*
 * Name: Hannah King
 * Date: 06.10.2024
 * Groupmates: Paige Lui, Mariana Pereira, and Hawraa Al Hasnawi
 *
 * This is the JS to implement the UI for the our product page which allows the
 * user to view a specific product and that product's information.
 */
"use strict";
(function() {

  window.addEventListener("load", init);

  /**
   * Sets up the necessary buttons and displays the product page when the webpage loads.
   */
  function init() {
    id('cart-button').addEventListener("click", goToCartPage);
    id('login-button').addEventListener("click", goToLoginPage);
    id('home-button').addEventListener("click", goToHomePage);
    displayProduct();
  }

  /**
   * Takes user to the cart page
   */
  function goToCartPage() {
    window.location.href = "cartpage.html";
  }

  /**
   * Takes user to the login page
   */
  function goToLoginPage() {
    window.location.href = "login.html";
  }

  /**
   * Takes user to the home page
   */
  function goToHomePage() {
    window.location.href = "index.html";
  }

  /**
   * Returns the query parameter from the current URL
   */
  function getQueryParam() {
    let url = new URL(window.location.href);
    let productId = url.searchParams.get("id");
    return productId;
  }

  /**
  * Displays a product's image, name, description, and price from the API to the webpage.
  */
  function displayProduct() {
    let productId = getQueryParam();
    id("item-quantity").value = 1;
    fetch("/productpage.html/product?id=" + productId)
      .then(statusCheck)
      .then(res => res.json())
      .then(populateProduct)
      .catch(handleError);
  }

  /**
 * Populates a specific product page with info about the product
 * @param {JSON} info - response from the API
 */
  function populateProduct(info) {
    let img = document.getElementById("product-img");
    let name = document.getElementById("product-name");
    let desc = document.getElementById("product-description");
    let price = document.getElementById("product-price");

    img.src = info.productInfo.image;
    img.alt = info.productInfo.shortname;
    name.textContent = info.productInfo.name;
    desc.textContent = info.productInfo.description;
    price.textContent = "Price: $" + info.productInfo.price;
  }

  /**
   * Switches the current webpage view to the error page if an error occurs.
   */
  function handleError() {
    window.location.href = "errorpage.html";
  }

  /**
   * Checks to make sure that the response from the API is OK
   * @param {Promise<object>} res - response from the API
   * @returns {Promise<object>} - OK response from the API
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
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