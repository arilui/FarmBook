
//slide starting index
let slideIndex = {
'carousel-1':0,
'carousel-2':0
};
//initialize database
async function main(){
  const uri =   "mongodb+srv://dbUser:passw0rd@farmbook.rsj9viv.mongodb.net/retryWrites=true&w=majority&appName=FarmBook"
  const client = new MongoClient(uri);
  try{
    await client.connect();
    await listDatabases(client);
  }
  catch(e){
    console.error(e);
  }
  finally{
    await client.close();
  }
}

//get a list of all databases
async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:")
  databasesList.databases.forEach(db => console.log(`- ${db.name}`));
}
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
