//slide starting index
let slideIndex = {
'carousel-1':0,
'carousel-2':0
};
const { connectToDatabase, client } = require('./dbConnection');

async function listDatabases() {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(`- ${db.name}`));
}

async function main() {
  await connectToDatabase();
  await listDatabases();
  // Perform other database operations here

  // Close the connection when done
  await client.close();
}

main().catch(console.error);

//naviaget pages
document.getElementById("home-page").addEventListener('click',function(){
  window.location.href="homepage.html";
});
//naviaget pages
document.getElementById("log-in").addEventListener('click',function(){
  window.location.href="index.html";
});
//naviaget pages
document.getElementById("product-image").addEventListener('click',function(){
  Window.location.href="index.html";
});

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

// Initialize the carousels
document.addEventListener('DOMContentLoaded', () => {
  moveSlide(0, 'carousel-1');
  moveSlide(0, 'carousel-2');
});

/*
function login(){
  //get username and password
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  //check if username and password match
  if(username == "admin" && password == "password"){
    //if they do, redirect to the seller home page
    window.location.href = "seller-home-page.html";
  }
  else{
    //if they don't, display an error message
    document.getElementById("login-error").innerHTML = "Invalid username or password";
  }

}

function createAccount(){
  //get username and password
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  //write to database

  //display success message or error message

  //redirect to login page

}**/

