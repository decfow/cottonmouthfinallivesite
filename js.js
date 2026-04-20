document.addEventListener("DOMContentLoaded", function () { // runs code after HTML is loaded to prevent errors

  // generic slideshow setup, finds all slideshows automatically
  const slideshows = [
    { id: "Slides1", className: "Slides1" },
    { id: "Slides2", className: "Slides2" },
    { id: "Slides3", className: "Slides3" },
    { id: "Slides4", className: "Slides4" },
    { id: "Slides5", className: "Slides5" },
    { id: "Slides6", className: "Slides6" },
  ];

  const indices = {}; // Object to store the current slide index for each slideshow

  slideshows.forEach(({ id, className }) => {
    indices[id] = 1; // Initialize each slideshow to start at slide 1
    showSlide(id, className, 1);

    // expose plusSlidesN globally e.g. plusSlides("Slides3", 1)
  });

  // Makes this function global so HTML buttons can call it
    // id = which slideshow, n = how many slides to move
  window.plusSlides = function(id, n) { 
    const ss = slideshows.find(s => s.id === id);
    if (!ss) return;
    indices[id] += n;
    showSlide(id, ss.className, indices[id]);
  };

  //  displays the correct slide for a given slideshow
  function showSlide(id, className, n) {
    const slides = document.getElementsByClassName(className);
    if (!slides.length) return;

    if (n > slides.length) indices[id] = 1;
    if (n < 1) indices[id] = slides.length;

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[indices[id] - 1].style.display = "block";
  }

  // lightbox
  // Will store all images in the currently active slideshow
  let currentImages = [];
  let currentIndex = 0;
  // Tracks which image is currently shown in the lightbox

  // Global function to open lightbox when an image is clicked
  window.openLightbox = function(img) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    const container = img.closest("#Slides1, #Slides2, #Slides3, #Slides4, #Slides5, #Slides6");     // Find the closest parent slideshow container of the clicked image
    currentImages = Array.from(container.querySelectorAll("img"));
    currentIndex = currentImages.indexOf(img);

    lightbox.style.display = "block";
    lightboxImg.src = img.src;     // Set the lightbox image source to the clicked image
  };

    // Global function to close the lightbox
  window.closeLightbox = function() {
    document.getElementById("lightbox").style.display = "none";
  };

    // If user clicks outside the image (on the background), close it
  document.getElementById("lightbox").addEventListener("click", function(e) {
    if (e.target === this) closeLightbox();
  });

  window.changeLightboxSlide = function(n) {
    currentIndex += n;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    document.getElementById("lightbox-img").src = currentImages[currentIndex].src;
  };

});
