"use strict";
//slide starting index
let slideIndex = {
  'carousel-1':0,
  'carousel-2':0,
  'carousel-3':0
  };

//function that deales with the carousel slid
function moveSlide(n, carouselId) {
  const carousel = document.getElementById(carouselId);
  const slideContainer = carousel.querySelector('.carousel-slide');
  const slides = carousel.getElementsByClassName('product-item');
  const visibleSlides = Math.floor(carousel.offsetWidth / slides[0].offsetWidth);

  slideIndex[carouselId] += n * visibleSlides;

  if (slideIndex[carouselId] >= slides.length) {
    slideIndex[carouselId] = 0;
  } else if (slideIndex[carouselId] < 0) {
    slideIndex[carouselId] = slides.length - visibleSlides;
  }

  slideContainer.style.transform = `translateX(${-slideIndex[carouselId] * slides[0].offsetWidth}px)`;
}

(function() {

  window.addEventListener("load", init);

  /**
   * Sets up the necessary buttons and displays the welcome page when the webpage loads.
   */
  function init() {
    go();
    // initializeCarousels();

    document.getElementById("home-page").addEventListener('click', goToHomePage);
    document.getElementById("log-in").addEventListener('click', goToLoginPage);
  }

  // //slide starting index
  // let slideIndex = {
  //   'carousel-1':0,
  //   'carousel-2':0,
  //   'carousel-3':0
  //   };

  async function go() {
    try {

      const response = await fetch('/products');
      const products = await response.json();

      //const carousel1Slide = document.getElementById('carousel-1-slide');
      //const carousel2Slide = document.getElementById('carousel-2-slide');
      const carousel3Slide = document.getElementById('carousel-3-slide');

      products.forEach(product => {
        const productItem = createProductItem(product);
        carousel3Slide.appendChild(productItem);

        //const productItemClone = productItem.cloneNode(true);
        //carousel2Slide.appendChild(productItemClone);
      });

      initializeCarousels();
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }

  function createProductItem(product) {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');

    let productId = product._id + "";
    console.log("productItem.id = " + productId); //delete

    const productLink = document.createElement('a');
    // productLink.id = product._id;
    // productLink.addEventListener("click", switchToProduct(productId));
    productLink.href = "productpage.html?id=" + productId;
    //productLink.href = "https://www.w3schools.com"; // Replace with actual product link if available

    const productImage = document.createElement('img');
    productImage.classList.add('product-image');
    productImage.src = product.image;
    productImage.alt = `Image of ${product.name}`;

    const productDetailsName = document.createElement('div');
    productDetailsName.classList.add('product-details');
    productDetailsName.textContent = `Name: ${product.name}`;

    const productDetailsPrice = document.createElement('div');
    productDetailsPrice.classList.add('product-details');
    productDetailsPrice.textContent = `Price: ${product.price} $`;

    const productDetailsDescription = document.createElement('div');
    productDetailsDescription.classList.add('product-details');
    productDetailsDescription.textContent = product.description;

    productLink.appendChild(productImage);
    productItem.appendChild(productLink);
    productItem.appendChild(productDetailsName);
    productItem.appendChild(productDetailsPrice);
    productItem.appendChild(productDetailsDescription);

    return productItem;
  }

  // //function that deales with the carousel slid
  // function moveSlide(n, carouselId) {
  //   const carousel = document.getElementById(carouselId);
  //   const slideContainer = carousel.querySelector('.carousel-slide');
  //   const slides = carousel.getElementsByClassName('product-item');
  //   const visibleSlides = Math.floor(carousel.offsetWidth / slides[0].offsetWidth);

  //   slideIndex[carouselId] += n * visibleSlides;

  //   if (slideIndex[carouselId] >= slides.length) {
  //     slideIndex[carouselId] = 0;
  //   } else if (slideIndex[carouselId] < 0) {
  //     slideIndex[carouselId] = slides.length - visibleSlides;
  //   }

  //   slideContainer.style.transform = `translateX(${-slideIndex[carouselId] * slides[0].offsetWidth}px)`;
  // }

  function initializeCarousels() {
    moveSlide(0, 'carousel-1');
    moveSlide(0, 'carousel-2');
    moveSlide(0, 'carousel-3');
  }

  function goToHomePage() {
    window.location.href="index.html";
  }

  function goToLoginPage() {
    window.location.href="login.html";
  }

//naviaget pages
// document.getElementById("home-page").addEventListener('click',function(){
//   window.location.href="index.html";
// });
//naviaget pages
// document.getElementById("log-in").addEventListener('click',function(){
//   window.location.href="login.html";
// });
//naviaget pages
// document.getElementById("product-image").addEventListener('click',function(){
//   window.location.href="index.html";
// });

})();