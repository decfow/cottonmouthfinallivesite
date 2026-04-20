document.addEventListener("DOMContentLoaded", function () { // runs code after HTML is loaded to prevent errors

  // generic slideshow setup — finds all slideshows automatically
  const slideshows = [
    { id: "Slides1", className: "Slides1" },
    { id: "Slides2", className: "Slides2" },
    { id: "Slides3", className: "Slides3" },
    { id: "Slides4", className: "Slides4" },
    { id: "Slides5", className: "Slides5" },
    { id: "Slides6", className: "Slides6" },
  ];

  const indices = {};

  slideshows.forEach(({ id, className }) => {
    indices[id] = 1;
    showSlide(id, className, 1);

    // expose plusSlidesN globally e.g. plusSlides("Slides3", 1)
  });

  window.plusSlides = function(id, n) {
    const ss = slideshows.find(s => s.id === id);
    if (!ss) return;
    indices[id] += n;
    showSlide(id, ss.className, indices[id]);
  };

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
  let currentImages = [];
  let currentIndex = 0;

  window.openLightbox = function(img) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    const container = img.closest("#Slides1, #Slides2, #Slides3, #Slides4, #Slides5, #Slides6");
    currentImages = Array.from(container.querySelectorAll("img"));
    currentIndex = currentImages.indexOf(img);

    lightbox.style.display = "block";
    lightboxImg.src = img.src;
  };

  window.closeLightbox = function() {
    document.getElementById("lightbox").style.display = "none";
  };

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