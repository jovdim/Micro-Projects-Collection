//If you find this useful, please star the repo and follow me on github: https://github.com/jovdim/Micro-Projects-Collection
let timerInterval;
let workDuration = 25 * 60;
let breakDuration = 5 * 60;
let longBreakDuration = 15 * 60;
let remainingTime = workDuration; // Default to work duration
let pomodoroCount = 0;
let pomodoroBeforeLongBreak = 4;

const minutesDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");
const progress = document.querySelector("#progress");
const themeToggle = document.querySelector("#theme-toggle");

function updateTimeDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function updateProgress() {
  const totalTime = pomodoroCount % pomodoroBeforeLongBreak === 0 && pomodoroCount !== 0 ? 
    longBreakDuration : workDuration;
  const progressOffset = (1 - remainingTime / totalTime) * 565;
  progress.style.strokeDashoffset = progressOffset;
}

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateTimeDisplay();
      updateProgress();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Time's up!");
      pomodoroCount++;
      remainingTime = pomodoroCount % pomodoroBeforeLongBreak === 0 && pomodoroCount !== 0 ? 
        longBreakDuration : breakDuration;
      updateTimeDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  remainingTime = workDuration;
  progress.style.strokeDashoffset = 565;
  updateTimeDisplay();
}

function applySettings() {
  workDuration = document.querySelector("#work-duration").value * 60;
  breakDuration = document.querySelector("#break-duration").value * 60;
  longBreakDuration = document.querySelector("#long-break-duration").value * 60;
  pomodoroBeforeLongBreak = document.querySelector("#pomodoro-count").value;
  resetTimer();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

document.querySelector("#start").addEventListener("click", startTimer);
document.querySelector("#pause").addEventListener("click", pauseTimer);
document.querySelector("#reset").addEventListener("click", resetTimer);
document.querySelector("#apply-settings").addEventListener("click", applySettings);
themeToggle.addEventListener("click", toggleTheme);

updateTimeDisplay();
