//If you find this useful, please star the repo and follow me on github: https://github.com/jovdim/Micro-Projects-Collection 


//you add more category if u want.
const quizData = {
    general: [
        { question: "What is the capital of France?", options: ["Paris", "Rome", "Berlin", "Madrid"], answer: 0 },
        { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Tolstoy", "Homer", "Dante"], answer: 0 },
        { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2 },
        { question: "Which planet is known as the Red Planet?", options: ["Venus", "Earth", "Mars", "Jupiter"], answer: 2 },
    ],
    math: [
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
        { question: "What is 3 * 7?", options: ["21", "23", "19", "20"], answer: 0 },
        { question: "What is 5 * 6?", options: ["30", "35", "25", "20"], answer: 0 },
        { question: "What is 10 / 2?", options: ["5", "4", "6", "3"], answer: 0 },
    ],
    science: [
        { question: "What is H2O?", options: ["Water", "Oxygen", "Hydrogen", "Helium"], answer: 0 },
        { question: "What planet is known as the Red Planet?", options: ["Mars", "Earth", "Venus", "Jupiter"], answer: 0 },
        { question: "What gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: 1 },
        { question: "What is the chemical symbol for gold?", options: ["Ag", "Au", "Pb", "Hg"], answer: 1 },
    ],
};

let currentCategory = null;
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 10;

const app = document.getElementById("app");
const quizIntro = document.getElementById("quiz-intro");
const quizArea = document.getElementById("quiz-area");
const quizEnd = document.getElementById("quiz-end");
const progressBar = document.getElementById("progress-bar");
const timerEl = document.getElementById("quiz-timer");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const restartBtn = document.getElementById("restart-btn");
const themeToggle = document.getElementById("theme-toggle");

document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentCategory = btn.dataset.category;
        startQuiz();
    });
});

function startQuiz() {
    quizIntro.classList.add("hidden");
    quizArea.classList.remove("hidden");
    score = 0;
    currentQuestionIndex = 0;
    loadQuestion();
}

function loadQuestion() {
    const categoryData = quizData[currentCategory];
    const questionData = categoryData[currentQuestionIndex];

    questionEl.textContent = questionData.question;
    answersEl.innerHTML = "";

    questionData.options.forEach((option, idx) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("answer-btn");
        btn.addEventListener("click", () => handleAnswer(idx));
        answersEl.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    timeLeft = 10;
    timerEl.textContent = timeLeft;
    progressBar.style.width = "0%";

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        progressBar.style.width = `${(10 - timeLeft) * 10}%`;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            handleAnswer(-1); // Time's up, mark as incorrect
        }
    }, 1000);
}

function handleAnswer(selectedIdx) {
    clearInterval(timerInterval);

    const categoryData = quizData[currentCategory];
    const questionData = categoryData[currentQuestionIndex];

    const answerBtns = document.querySelectorAll(".answer-btn");
    answerBtns.forEach((btn, idx) => {
        if (idx === questionData.answer) {
            btn.classList.add("correct");
        } else if (idx === selectedIdx) {
            btn.classList.add("wrong");
        }
        btn.disabled = true;
    });

    if (selectedIdx === questionData.answer) {
        score++;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < categoryData.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    quizArea.classList.add("hidden");
    quizEnd.classList.remove("hidden");

    const percentScore = Math.round((score / quizData[currentCategory].length) * 100);
    document.getElementById("score").textContent = `You scored: ${percentScore}%`;
}

restartBtn.addEventListener("click", () => {
    quizEnd.classList.add("hidden");
    quizIntro.classList.remove("hidden");
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
