//If you find this useful, please star the repo and follow me on github: https://github.com/jovdim/Micro-Projects-Collection 

// Game logic variables
const minRange = 1;
const maxRange = 100;
let secretNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
let attempts = 0;
let score = 100;

// DOM elements
const userInput = document.getElementById('user-input');
const guessButton = document.getElementById('guess-button');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset-button');

// Function to handle guess
const handleGuess = () => {
  const guess = parseInt(userInput.value);

  if (isNaN(guess) || guess < minRange || guess > maxRange) {
    feedback.textContent = `Please enter a number between ${minRange} and ${maxRange}.`;
    feedback.style.color = "red";
    return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;
  score -= 10;
  scoreDisplay.textContent = score;

  if (guess === secretNumber) {
    feedback.textContent = "🎉 Correct! You guessed the number!";
    feedback.style.color = "green";
    guessButton.disabled = true;
    userInput.disabled = true;
  } else if (guess < secretNumber) {
    feedback.textContent = "📉 Too low! Try again.";
    feedback.style.color = "orange";
  } else {
    feedback.textContent = "📈 Too high! Try again.";
    feedback.style.color = "orange";
  }
};

// Function to reset the game
const resetGame = () => {
  secretNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
  attempts = 0;
  score = 100;
  attemptsDisplay.textContent = attempts;
  scoreDisplay.textContent = score;
  feedback.textContent = "Make your first guess!";
  feedback.style.color = "black";
  userInput.value = "";
  userInput.disabled = false;
  guessButton.disabled = false;
};

// Event listeners
guessButton.addEventListener('click', handleGuess);
resetButton.addEventListener('click', resetGame);
