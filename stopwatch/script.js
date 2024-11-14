const timer = {
  millSec: 0,
  second: 0,
  minute: 0,
  hour: 0,
};

const timerFlag = {
  millSecFlag: 0,
  secondFlag: 0,
  minuteFlag: 0,
  hourFlag: 0,
};

const numbersElem = document.querySelector(".js-numbers");
const flagElem = document.querySelector(".js-flag-list");
const subNumElem = document.querySelector(".js-sub-numbers");
const resetBtn = document.querySelector(".js-reset-btn");
const flagBtn = document.querySelector(".js-flag-btn");
const startElem = document.querySelector(".js-start-btn");

let intervalID;
let intervalID1;
let saveFlag = ``;
let x = 1;
let numbering = 0;

startElem.addEventListener("click", () => {
  stopWatch();
});

// Load persistent data on page load
window.addEventListener("load", () => {
  loadPersistentData();
});

// Default display when reloading the page
let displayNumbers = `<p>${timer.hour
  .toString()
  .padStart(2, "0")} : ${timer.minute
  .toString()
  .padStart(2, "0")} : ${timer.second
  .toString()
  .padStart(2, "0")}.</p><p class="milliseconds">${timer.millSec
  .toString()
  .padStart(2, "0")}</p>`;
numbersElem.innerHTML = displayNumbers;

function stopWatch() {
  if (!startElem.classList.contains("start-time")) {
    flagBtn.classList.remove("flag-btn");
    startElem.classList.add("start-time");
    startElem.innerHTML = "Stop";
    resetBtn.classList.add("flag-btn");

    if (x === 2) {
      subTimer();
    }

    intervalID = setInterval(() => {
      timer.millSec++;
      if (timer.millSec >= 99) {
        timer.millSec = 0;
        timer.second++;
      }
      if (timer.second >= 60) {
        timer.second = 0;
        timer.minute++;
      }
      if (timer.minute >= 60) {
        timer.minute = 0;
        timer.hour++;
      }
      displayNumbers = `<p>${timer.hour
        .toString()
        .padStart(2, "0")} : ${timer.minute
        .toString()
        .padStart(2, "0")} : ${timer.second
        .toString()
        .padStart(2, "0")}.</p><p class="milliseconds">${timer.millSec
        .toString()
        .padStart(2, "0")}</p>`;
      numbersElem.innerHTML = displayNumbers;

      // Save to localStorage every tick
      saveToLocalStorage();
    }, 10);
  } else {
    startElem.classList.remove("start-time");
    clearInterval(intervalID1);
    clearInterval(intervalID);
    resetBtn.classList.remove("flag-btn");
    startElem.innerHTML = "Start";
    flagBtn.classList.add("flag-btn");

    // Save state to localStorage when stopped
    saveToLocalStorage();
  }
}

const resetElem = document.querySelector(".js-reset-btn");
resetElem.addEventListener("click", () => {
  resetTime();
});

function resetTime() {
  timer.hour = 0;
  timer.millSec = 0;
  timer.minute = 0;
  timer.second = 0;

  timerFlag.hourFlag = 0;
  timerFlag.millSecFlag = 0;
  timerFlag.minuteFlag = 0;
  timerFlag.secondFlag = 0;

  resetBtn.classList.add("flag-btn");

  x = 1;
  numbering = 0;

  flagElem.innerHTML = "";
  subNumElem.innerHTML = "";
  saveFlag = "";

  clearInterval(intervalID1);

  numbersElem.innerHTML = `<p>${timer.hour
    .toString()
    .padStart(2, "0")} : ${timer.minute
    .toString()
    .padStart(2, "0")} : ${timer.second
    .toString()
    .padStart(2, "0")}.</p><p class="milliseconds">${timer.millSec
    .toString()
    .padStart(2, "0")}</p>`;

  // Clear localStorage on reset
  localStorage.removeItem("stopwatchData");
}

document.querySelector(".js-flag-btn").addEventListener("click", () => {
  numbering++;
  if (1 === x) {
    saveFlag += `<div class="sub-flag"><p>${numbering
      .toString()
      .padStart(2, "0")}</p><div><p>${timer.hour
      .toString()
      .padStart(2, "0")} : ${timer.minute
      .toString()
      .padStart(2, "0")} : ${timer.second
      .toString()
      .padStart(2, "0")}.</p><p class="milliseconds">${timer.millSec
      .toString()
      .padStart(2, "0")}</p></div>
      
      <div><p>+${timer.hour.toString().padStart(2, "0")} : ${timer.minute
      .toString()
      .padStart(2, "0")} : ${timer.second
      .toString()
      .padStart(2, "0")}.</p><p class="milliseconds">${timer.millSec
      .toString()
      .padStart(2, "0")}</p></div>
      </div>`;
  }

  subTimer();
  if (x === 2) {
    saveFlag += `<div class="sub-flag"><p>${numbering
      .toString()
      .padStart(2, "0")}</p><div><p>${timer.hour
      .toString()
      .padStart(2, "0")} : ${timer.minute
      .toString()
      .padStart(2, "0")} : ${timer.second
      .toString()
      .padStart(2, "0")}.</p><p class="milliseconds">${timer.millSec
      .toString()
      .padStart(2, "0")}</p></div>
      
      <div><p>+${timerFlag.hourFlag
        .toString()
        .padStart(2, "0")} : ${timerFlag.minuteFlag
      .toString()
      .padStart(2, "0")} : ${timerFlag.secondFlag
      .toString()
      .padStart(2, "0")}.</p><p class="milliseconds">${timerFlag.millSecFlag
      .toString()
      .padStart(2, "0")}</p></div>
      </div>`;
  }
  timerFlag.hourFlag = 0;
  timerFlag.millSecFlag = 0;
  timerFlag.minuteFlag = 0;
  timerFlag.secondFlag = 0;
  subNumElem.classList.remove("start-subTime");

  const subFlagContainers = saveFlag.split('<div class="sub-flag">').slice(1);
  const reversedFlags =
    '<div class="sub-flag">' +
    subFlagContainers.reverse().join('<div class="sub-flag">');

  flagElem.innerHTML = reversedFlags;
  x = 2;

  // Save flags to localStorage
  saveToLocalStorage();
});

function subTimer() {
  let subDisplay = "";
  clearInterval(intervalID1);
  intervalID1 = setInterval(() => {
    timerFlag.millSecFlag++;
    if (timerFlag.millSecFlag >= 99) {
      timerFlag.millSecFlag = 0;
      timerFlag.secondFlag++;
    }
    if (timerFlag.secondFlag >= 60) {
      timerFlag.secondFlag = 0;
      timerFlag.minuteFlag++;
    }
    if (timerFlag.minuteFlag >= 60) {
      timerFlag.minuteFlag = 0;
      timerFlag.hourFlag++;
    }
    subDisplay = `<p>${timerFlag.hourFlag
      .toString()
      .padStart(2, "0")} : ${timerFlag.minuteFlag
      .toString()
      .padStart(2, "0")} : ${timerFlag.secondFlag
      .toString()
      .padStart(2, "0")}.</p><p class="milliseconds">${timerFlag.millSecFlag
      .toString()
      .padStart(2, "0")}</p>`;
    subNumElem.innerHTML = subDisplay;
  }, 10);
}

// Save current stopwatch state to localStorage
function saveToLocalStorage() {
  const data = {
    timer,
    timerFlag,
    saveFlag,
    numbering,
    x,
    isRunning: startElem.classList.contains("start-time"),
  };
  localStorage.setItem("stopwatchData", JSON.stringify(data));
}

// Load stopwatch state from localStorage
function loadPersistentData() {
  const savedData = JSON.parse(localStorage.getItem("stopwatchData"));
  if (!savedData) return;

  timer.hour = savedData.timer.hour;
  timer.minute = savedData.timer.minute;
  timer.second = savedData.timer.second;
  timer.millSec = savedData.timer.millSec;

  timerFlag.hourFlag = savedData.timerFlag.hourFlag;
  timerFlag.minuteFlag = savedData.timerFlag.minuteFlag;
  timerFlag.secondFlag = savedData.timerFlag.secondFlag;
  timerFlag.millSecFlag = savedData.timerFlag.millSecFlag;

  saveFlag = savedData.saveFlag;
  numbering = savedData.numbering;
  x = savedData.x;
  flagElem.innerHTML = saveFlag;

  if (savedData.isRunning) {
    stopWatch();
  }
}
