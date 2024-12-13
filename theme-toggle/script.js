// If you find this project and comments useful, please give it a star and follow us on GitHub : https://github.com/jovdim/Micro-Projects-Collection

const themeToggle = document.getElementById("theme-toggle");

// Available themes
const themes = ["light", "dark"];
let currentThemeIndex = 0;

// Add event listener for the toggle button
themeToggle.addEventListener("click", () => {
  // Increment theme index cyclically
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;

  // Remove all theme classes and add the current theme class
  document.body.className = "";
  if (themes[currentThemeIndex] === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "Switch to Light Mode";
  } else {
    themeToggle.textContent = "Switch to Dark Mode";
  }
});
