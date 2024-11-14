
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuote");
const speakQuoteBtn = document.getElementById("speakQuote");
const copyQuoteBtn = document.getElementById("copyQuote");
const tweetQuoteBtn = document.getElementById("tweetQuote");
const favoriteQuoteBtn = document.getElementById("favoriteQuote");
const favoritesList = document.getElementById("favorites");
const themeToggle = document.getElementById("themeToggle");

async function getQuote() {
  const res = await fetch("https://quoteslate.vercel.app/api/quotes/random");
  const data = await res.json();
  
 
  const quoteBox = document.getElementById("quoteBox");
  quoteBox.classList.remove("fade-animation");
  void quoteBox.offsetWidth; // Trigger reflow to reset animation
  quoteBox.classList.add("fade-animation");

  quoteText.innerText = `"${data.quote}"`;
  quoteAuthor.innerText = `- ${data.author}`;
}
getQuote(); 

newQuoteBtn.addEventListener("click", getQuote);


speakQuoteBtn.addEventListener("click", () => {
  const utterance = new SpeechSynthesisUtterance(quoteText.innerText);
  utterance.voice = speechSynthesis
    .getVoices()
    .find(voice => voice.lang === 'en-GB' || voice.lang === 'en-US');
  utterance.pitch = 1;
  utterance.rate = 0.85;
  speechSynthesis.speak(utterance);
});


copyQuoteBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(`${quoteText.innerText} ${quoteAuthor.innerText}`);
  copyQuoteBtn.innerText = "Copied!";
  setTimeout(() => (copyQuoteBtn.innerText = "📋 Copy"), 2000);
});

// Tweet Quote
tweetQuoteBtn.addEventListener("click", () => {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} ${quoteAuthor.innerText}`;
  window.open(tweetUrl, "_blank");
});

// Add Quote to Favorites
favoriteQuoteBtn.addEventListener("click", () => {
  const favoriteQuote = `${quoteText.innerText} ${quoteAuthor.innerText}`;
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(favoriteQuote)) {
    favorites.push(favoriteQuote);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
});

// Render Favorites with Delete Option
function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favoritesList.innerHTML = favorites
    .map((quote, index) => `<li>${quote} <button onclick="deleteFavorite(${index})">❌</button></li>`)
    .join("");
}

// Delete Favorite Quote
function deleteFavorite(index) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

renderFavorites();

// Toggle Dark Mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.innerText = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});
