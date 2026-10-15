const noteEl = document.querySelector("#note");
const statusEl = document.querySelector("#status");

let currentContent = "";
/*NOTE: In a real world application you would normally save your notes in a database. Or you could even save them in local storage. However, working with databases and local storage is beyond the scope of this workshop and those concepts will be taught later on. */

noteEl.addEventListener("focus", () => {
  statusEl.textContent = "";
});

noteEl.addEventListener("blur", () => {
  const newContent = noteEl.innerHTML; // innerHTML is used here to help preserve spacing and formatting for the note.
  if (currentContent === newContent) {
    return;
  }
  currentContent = newContent;
  console.log(currentContent);
  statusEl.textContent = "Note saved successfully!";
});

window.addEventListener("DOMContentLoaded", () => {
  currentContent = noteEl.textContent;
});
