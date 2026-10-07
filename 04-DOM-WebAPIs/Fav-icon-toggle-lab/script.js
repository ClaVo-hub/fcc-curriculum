const favIcons = document.querySelectorAll(".favorite-icon");
favIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    if (icon.classList.contains("filled")) {
      icon.classList.remove("filled");
      icon.innerHTML = "&#9825;";
    } else {
      icon.classList.add("filled");
      icon.innerHTML = "&#10084;";
    }
  });
});
