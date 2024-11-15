const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

const playStatsElem = document.querySelector(".js-stats-player");
const computerStatsElem = document.querySelector(".js-stats-com");
const resultElem = document.querySelector(".js-result");
const resultStatElem = document.querySelector(".js-result-status");
const delBtn = document.querySelector(".js-del-btn");

function computerMove() {
  const ranNum = Math.random();
  let comMove = "";
  if (ranNum >= 0 && ranNum < 1 / 3) {
    comMove = "Rock";
  } else if (ranNum >= 1 / 3 && ranNum < 2 / 3) {
    comMove = "Paper";
  } else if (ranNum >= 2 / 3 && ranNum < 3 / 3) {
    comMove = "Scissors";
  }
  return comMove;
}

function result(playerPick) {
  const computerChoice = computerMove();
  let result = "";
  if (playerPick === "Rock") {
    if (computerChoice === "Rock") {
      result = "Tie.";
    } else if (computerChoice === "Paper") {
      result = "You Lose.";
    } else if (computerChoice === "Scissors") {
      result = "You Win.";
    }
  } else if (playerPick === "Paper") {
    if (computerChoice === "Rock") {
      result = "You Win.";
    } else if (computerChoice === "Paper") {
      result = "Tie.";
    } else if (computerChoice === "Scissors") {
      result = "You Lose.";
    }
  } else if (playerPick === "Scissors") {
    if (computerChoice === "Rock") {
      result = "You Lose.";
    } else if (computerChoice === "Paper") {
      result = "You Win.";
    } else if (computerChoice === "Scissors") {
      result = "Tie.";
    }
  }

  display(playerPick, computerChoice, result);
}

let playerStats = ` <img class="img-quality" src="./assets/img/p-Rock.png" alt="error">`;
let comStats = ` <img class="img-quality" src="./assets/img/c-Rock.png" alt="error">`;
showDefault();
function showDefault() {
  playStatsElem.innerHTML = playerStats;
  computerStatsElem.innerHTML = comStats;
}

function display(playerPick = "Rock", computerChoice = "Rock", result) {
  const playerStatus = document.querySelector(".js-stats-player");
  const computerStats = document.querySelector(".js-stats-com");
  const btnMainElem = document.querySelector(".main-btn-div");
  const twoBtn = document.querySelector(".two-buttons");
  const isAutoElem = document.querySelector(".js-auto-play");

  if (
    !playerStatus.classList.contains("shake") ||
    !computerStats.classList.contains("shake")
  ) {
    playerStats = ` <img class="img-quality" src="./assets/img/p-Rock.png" alt="error">`;
    comStats = ` <img class="img-quality" src="./assets/img/c-Rock.png" alt="error">`;
    showDefault();

    btnMainElem.classList.add("disable-btn-main");
    delBtn.classList.add("del-btn");

    document.querySelector(
      ".js-music-shaking"
    ).innerHTML = `<audio src="./assets/sounds/shaking.mp3" autoplay></audio>
    
`;

    playerStatus.classList.add("shake");
    computerStats.classList.add("shake");

    setTimeout(() => {
      playerStatus.classList.remove("shake");
      computerStats.classList.remove("shake");
      playerStats = ` <img class="img-quality" src="./assets/img/p-${playerPick}.png" alt="error">`;
      comStats = ` <img class="img-quality" src="./assets/img/c-${computerChoice}.png" alt="error">`;
      document.querySelector(".js-stats-player").innerHTML = playerStats;
      document.querySelector(".js-stats-com").innerHTML = comStats;

      if (result === "You Win.") {
        resultElem.innerHTML = `${playerPick} <span>beats</span> ${computerChoice}`;
        resultStatElem.innerHTML = "Player Wins.";
        score.wins++;
      } else if (result === "You Lose.") {
        resultElem.innerHTML = `${computerChoice} <span>losses</span> ${playerPick}`;
        resultStatElem.innerHTML = "Computer Wins.";
        score.losses++;
      } else if (result === "Tie.") {
        resultElem.innerHTML = `${playerPick} <span>ties</span> ${computerChoice}`;
        resultStatElem.innerHTML = "You Tied!";
        score.ties++;
      }
      if (!isAutoElem.classList.contains("isAutoPlay")) {
        if (score.wins > 0 || score.losses > 0 || score.ties > 0) {
          delBtn.classList.remove("del-btn");
          delScore();
        } else {
          delBtn.classList.add("del-btn");
        }
      }
      localStorage.setItem("score", JSON.stringify(score));

      document.querySelector(
        ".js-scoring"
      ).innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties} `;
      twoBtn.classList.remove("hide-two-buttons");
      btnMainElem.classList.remove("disable-btn-main");
      document.querySelector(
        ".js-music-ding"
      ).innerHTML = `<audio src="./assets/sounds/ding.mp3" autoplay></audio>`;
    }, 2000);
  }
}

document.querySelector(".js-rock-btn").addEventListener("click", () => {
  result("Rock");
});
document.querySelector(".js-paper-btn").addEventListener("click", () => {
  result("Paper");
});
document.querySelector(".js-scissors-btn").addEventListener("click", () => {
  result("Scissors");
});

function delScore() {
  document.querySelector(".js-del-btn").addEventListener("click", () => {
    const resultElem = document.querySelector(".js-result");

    localStorage.removeItem("score");
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    display();
    resultElem.innerHTML = `Resetting...`;
    setTimeout(() => {
      resultElem.innerHTML = `The score has been reset.`;
      delBtn.classList.add("del-btn");
    }, 2000);
    resultStatElem.innerHTML = "";
  });
}

document.querySelector(".js-auto-play").addEventListener("click", () => {
  autoPlay();
});

let intervalID;
function autoPlay() {
  const autoPlayElem = document.querySelector(".js-auto-play");
  if (!autoPlayElem.classList.contains("stop-btn")) {
    document.querySelector(".js-auto-play").classList.add("isAutoPlay");
    delBtn.classList.add("del-btn");
    document.querySelector(".js-auto-play").classList.add("stop-btn");
    intervalID = setInterval(() => {
      document.querySelector(".js-auto-play").innerHTML = "Stop Auto Play";
      let randomPlayerMove = "";
      const ranPlayerPick = Math.random();
      if (ranPlayerPick <= 1 / 3) {
        randomPlayerMove = "Rock";
      } else if (ranPlayerPick <= 2 / 3) {
        randomPlayerMove = "Paper";
      } else if (ranPlayerPick <= 3 / 3) {
        randomPlayerMove = "Scissors";
      }
      result(randomPlayerMove);
    }, 3000);
  } else {
    clearInterval(intervalID);
    autoPlayElem.innerHTML = "Auto Play";
    autoPlayElem.classList.remove("stop-btn");
    delBtn.classList.remove("del-btn");
    document.querySelector(".js-auto-play").classList.remove("isAutoPlay");
    return;
  }
}
