//If you find this useful, please star the repo and follow me on github: https://github.com/jovdim/Micro-Projects-Collection

document.addEventListener("DOMContentLoaded", () => {
  const markdownInput = document.getElementById("markdown-input");
  const markdownPreview = document.getElementById("markdown-preview");
  const clearButton = document.getElementById("clear-button");
  const togglePreviewButton = document.getElementById("toggle-preview");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const q = document.getElementById("export-button");
  const charCountDisplay = document.getElementById("char-count");

  let isPreviewVisible = true;

  // Function to convert Markdown to HTML using marked.js
  const convertMarkdownToHTML = (markdownText) => {
    return marked.parse(markdownText);
  };

  // Update preview based on markdown input
  markdownInput.addEventListener("input", () => {
    const markdownText = markdownInput.value;
    const htmlPreview = convertMarkdownToHTML(markdownText);
    markdownPreview.innerHTML = htmlPreview;
    charCountDisplay.textContent = `${markdownText.length} characters`;
  });

  // Clear the editor
  clearButton.addEventListener("click", () => {
    markdownInput.value = "";
    markdownPreview.innerHTML = "";
    charCountDisplay.textContent = "0 characters";
  });

  // Toggle preview visibility
  togglePreviewButton.addEventListener("click", () => {
    isPreviewVisible = !isPreviewVisible;
    markdownPreview.style.display = isPreviewVisible ? "block" : "none";
    togglePreviewButton.textContent = isPreviewVisible
      ? "Hide Preview"
      : "Show Preview";
  });

  // Switch to Dark Mode
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode")
      ? "Switch to Light Mode"
      : "Switch to Dark Mode";
  });

  // Export markdown as a .md file
  q.addEventListener("click", () => {
    const markdownText = markdownInput.value;
    const blob = new Blob([markdownText], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "markdown.md";
    link.click();
  });
});
