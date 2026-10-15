const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
function openBox(src) {
  lightboxImg.src = src;
  lightbox.style.display = "flex";
}
function closeBox() {
  lightbox.style.display = "none";
}
const closeBtn = document.getElementById("close-btn");
closeBtn.addEventListener("click", closeBox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeBox();
  }
});

const galleryItems = document.querySelectorAll(".gallery-item");
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    openBox(item.src.replace("-thumbnail", ""));
  });
});
