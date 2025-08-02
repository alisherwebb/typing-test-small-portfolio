const easyWords = [
  "apple",
  "kitob",
  "hello",
  "salom",
  "dog",
  "it",
  "olma",
  "cat",
  "pen",
  "qalam",
];
const normalWords = [
  "muxlisa",
  "omina",
  "rayhona",
  "mubina",
  "ingliz tili ustoz",
  "komila",
  "ruxshona",
  "xadiycha",
  "fotima",
  "bonu",
  "bibi",
  "go'zal",
  "shirin",
  "anora"
];
const hardWords = [
  "elektromexanizatsiya",
  "dasturlash",
  "development",
  "rivojlanish",
  "professional",
  "mutaxassis",
];

let currentWords = [];
let currentWord = "";
let score = 0;
let timeLeft = 60;
let timer;
let highScore = localStorage.getItem("highScore") || 0;

const wordDisplay = document.getElementById("wordDisplay");
const wordInput = document.getElementById("wordInput");
const timeLeftDisplay = document.getElementById("timeLeft");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");

highScoreDisplay.textContent = highScore;

document
  .getElementById("easyBtn")
  .addEventListener("click", () => startGame(easyWords));
document
  .getElementById("normalBtn")
  .addEventListener("click", () => startGame(normalWords));
document
  .getElementById("hardBtn")
  .addEventListener("click", () => startGame(hardWords));

function startGame(words) {
  currentWords = words;
  score = 0;
  timeLeft = 60;
  updateStats();
  wordInput.disabled = false;
  wordInput.focus();
  nextWord();

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateStats();
    if (timeLeft === 0) {
      clearInterval(timer);
      finishGame();
    }
  }, 1000);
}

function nextWord() {
  currentWord = currentWords[Math.floor(Math.random() * currentWords.length)];
  wordDisplay.textContent = currentWord;
  wordInput.value = "";
  wordInput.classList.remove("correct", "incorrect");
}

function updateStats() {
  timeLeftDisplay.textContent = timeLeft;
  scoreDisplay.textContent = score;
}

function finishGame() {
  wordInput.disabled = true;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreDisplay.textContent = highScore;
    alert(`Amaki rekord!  Words: ${score}`);
  } else {
    alert(`GAME OVER AMAKI! Words: ${score}`);
  }
}

wordInput.addEventListener("input", () => {
  if (wordInput.value === currentWord) {
    score++;
    updateStats();
    nextWord();
  } else if (currentWord.startsWith(wordInput.value)) {
    wordInput.classList.add("correct");
    wordInput.classList.remove("incorrect");
  } else {
    wordInput.classList.add("incorrect");
    wordInput.classList.remove("correct");
  }
});
