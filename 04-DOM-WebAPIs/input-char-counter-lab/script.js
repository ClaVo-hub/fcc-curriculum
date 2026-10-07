let textInput = document.getElementById("text-input");

textInput.addEventListener("input", () => {
  let charCount = textInput.value.length;
  if (charCount > 50) {
    textInput.value = textInput.value.substring(0, 50);
    charCount = 50;
  }
  let charCountShow = document.getElementById("char-count");
  charCountShow.innerHTML = `Character Count: ${charCount}/50`;
  if (charCount === 50) {
    charCountShow.style.color = "red";
  }
});
