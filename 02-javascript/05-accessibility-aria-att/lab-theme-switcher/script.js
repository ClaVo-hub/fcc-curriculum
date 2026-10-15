const themes = [
  { name: "light", message: "Welcome bugs - Nordic frost theme is activated!" },
  {
    name: "dark",
    message: "Bug attraction deactivated - Dark theme activated! ",
  },
  { name: "ocean", message: "Hear the ocean yet? Ocean theme activated!" },
  { name: "nord", message: "The frost has settled - Nord theme activated!" },
  {
    name: "pastel",
    message: "Girls just wanna have fun - Soft Pastel theme activated!",
  },
];

function closeMenu() {
  menu.setAttribute("hidden", "");
  toggleBtn.setAttribute("aria-expanded", "false");
}

function openMenu() {
  menu.removeAttribute("hidden");
  toggleBtn.setAttribute("aria-expanded", "true");
}

//automatice close when clicking outside of menu
document.addEventListener("click", (event) => {
  if (!toggleBtn.contains(event.target) && !menu.contains(event.target)) {
    closeMenu();
  }
});

const setTheme = (theme) => {
  document.body.className = "";
  document.body.classList.add(`theme-${theme.name}`);
};

const updateMessage = (theme) => {
  const status = document.getElementById("status");
  status.textContent = theme.message;
};

const toggleBtn = document.getElementById("theme-switcher-button");
const menu = document.getElementById("theme-dropdown");

toggleBtn.addEventListener("click", () => {
  const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
  if (!isExpanded) {
    openMenu();
  } else {
    closeMenu();
  }
});

themes.forEach((theme) => {
  const btn = document.getElementById(`theme-${theme.name}`);
  if (btn) {
    btn.addEventListener("click", () => {
      setTheme(theme);
      updateMessage(theme);
      closeMenu();
    });
  }
});
