"use strict";

//Cart Page JS: should talk with app.js and display User's cart based on Product id and User id
(function(){
    window.addEventListener("load",init);

    function init(){
        id(farmbook-logo).addEventListener("click", goToHomePage);
        id(login-button).addEventListener("click", goToLoginPage);
        id(cart-button).addEventListener("click", refreshPage);
    }

    function goToHomePage(){
        window.location.href = "C:\Users\plui0\Documents\GitHub\FarmBook\public\index.html";
    }

    function goToLoginPage(){
        window.location.href = "C:\Users\plui0\Documents\GitHub\FarmBook\public\login.html";
    }

    function refreshPage(){
        window.location.href = "public\cartpage.js";
    }

    function id(idName) {
        return document.getElementById(idName);
      }
    
})