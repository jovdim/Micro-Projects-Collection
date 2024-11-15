"use strict";

// Take elements from the DOM
let inputEl = document.querySelector(".input");
let resultEl = document.querySelector(".result");
let allCButtonEl = document.querySelector(".allC");
let copyButtonEl = document.querySelector(".copy");
let resetButtonEl = document.querySelector(".reset");
let allLButtonEl = document.querySelector(".allL");
let firstCButtonEl = document.querySelector(".firstC");
let startCButtonEl = document.querySelector(".startC");
let boldButtonEl = document.querySelector(".bold");
let italicButtonEl = document.querySelector(".italic");

// Space removal function
let spaceRemoveAll = function (word) {
  return word.trim().replace(/\s+/g, " ");
};

// Function to capitalize all letters
let allCapitalize = function () {
  let word = spaceRemoveAll(inputEl.value);
  resultEl.value = word.toUpperCase();
};

// Function to convert all letters to lowercase
let allLowercase = function () {
  let word = spaceRemoveAll(inputEl.value);
  resultEl.value = word.toLowerCase();
};

// Function to capitalize the first letter of each word
let firstLetterCapitalize = function () {
  let word = spaceRemoveAll(inputEl.value);
  word = word.toLowerCase().split(" ");
  let firstUpper = [];
  for (let wd of word) {
    firstUpper.push(wd.replace(wd[0], wd[0].toUpperCase()));
  }
  resultEl.value = firstUpper.join(" ");
};

// Function to capitalize the first letter of each sentence
let firstLetterOfSentenceCapital = function () {
  let word = spaceRemoveAll(inputEl.value);
  word = word.toLowerCase().split(".");
  console.log(word);
  let firstUpper = [];
  for (let wd of word) {
    wd = wd.trim();
    if (wd.length > 0) {
      if (wd === word[0]) {
        firstUpper.push(wd[0].toUpperCase() + wd.slice(1));
      } else {
        firstUpper.push(" " + wd[0].toUpperCase() + wd.slice(1));
      }
    }
  }
  resultEl.value = firstUpper.join(".");
};

// Function to copy the result to clipboard
let copyText = function () {
  resultEl.select();
  document.execCommand("copy");
};

// Function to reset all fields and styles
let resetAll = function () {
  inputEl.value = "";
  resultEl.value = "";
  resultEl.classList.remove("bold");
  resultEl.classList.remove("italic");
};

// Event handlers for button clicks
allCButtonEl.addEventListener("click", allCapitalize);
copyButtonEl.addEventListener("click", copyText);
resetButtonEl.addEventListener("click", resetAll);
allLButtonEl.addEventListener("click", allLowercase);
firstCButtonEl.addEventListener("click", firstLetterCapitalize);
startCButtonEl.addEventListener("click", firstLetterOfSentenceCapital);
