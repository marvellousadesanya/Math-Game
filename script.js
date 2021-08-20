"use strict";

const quizzes = [
  "1203 - 349",
  "238 + 43",
  "23 * 19",
  "345 * 11",
  "22 * 8",
  "420 / 7",
  "24 / 2",
  "336 / 3",
  "21 * 74",
  "34 + 459",
  "45 / 3",
  "66 * 2",
  "13 + 56",
  "104 + 45",
  "34 * 7",
];

// const answers = [eval(quizzes[0]), eval(quizzes[1]), eval(quizzes[2])];

// Setting states
let playing = true; // This allows all buttons to be clickable when the game is still playing
const question = document.querySelector("#question");
const readyBtn = document.querySelector(".ready");
const submitBtn = document.querySelector(".submit");
// const score = document.querySelector(".score");
const answer = document.querySelector("#answer");
const feedback = document.querySelector(".feedback");
const nextBtn = document.querySelector(".next");
const timer = document.querySelector(".timer");
const body = document.querySelector("body");

let score = 0;

// Button that begins the game.
const showQuiz = () => {
  playing = true;
  document.querySelector("main").classList.remove("hidden");
  timer.classList.remove("hidden");
  readyBtn.classList.add("hidden");
  handle = setInterval(initiateCountdown, 1000);
  initiateCountdown();
  setTimeout(() => {
    // Total countdown timer
    playing = false;
    question.textContent = "";
    nextBtn.classList.add("hidden");
    feedback.textContent = "Time up!";
    feedback.classList.remove("hidden");
    clearInterval(handle);
    if (score >= 10) {
      console.log("Good at math");
      document.querySelector(".positive").classList.remove("hidden");
    } else if (score > 7 && score < 10) {
      console.log("Moderate Math speed");
      document.querySelector(".positive").textContent = "Moderate at Math! 👍";
    } else {
      console.log("Bad at math");
      document.querySelector(".negative").classList.remove("hidden");
      // document.querySelector("body").style.backgroundColor = "rgb(211, 54, 54)";
    }
  }, 110000);
};

readyBtn.addEventListener("click", showQuiz); // Button that begins the game

let seconds = 15;
function initiateCountdown() {
  seconds = seconds < 10 ? "0" + seconds : seconds;

  if (seconds == 0) {
    feedback.classList.remove("hidden");
    body.style = "rgb(211, 54, 54)";
    // feedback.textContent = `Time up! Click next!`;
    submitBtn.classList.add("hidden");
    newQuestion();
  }
  timer.textContent = `${seconds}`;
  seconds--;
}

/** This variable pauses the countdown timer.
 * It was initiatlly set as empty and reassigned in the showQuiz function. If it isn't done this way the countdown timer will start before the game begins */
let handle = "";

function generateQuestion() {
  if (playing) {
    question.textContent = quizzes[Math.trunc(Math.random() * quizzes.length)];
    document.querySelector("body").style = "#222";
    const questionNumber = question.textContent;
    return questionNumber;
  }
}

let correctAnswer = eval(generateQuestion());

function checkAnswer() {
  if (playing) {
    console.log(correctAnswer);
    if (correctAnswer === Number(answer.value)) {
      console.log("Correct");
      console.log(answer.value);
      document.querySelector("body").style.backgroundColor = "#60b347";
      feedback.textContent = "Correct!";
      feedback.classList.remove("hidden");
      score++;
      document.querySelector(".score").textContent = score;
      answer.value = "";
      // clearInterval(handle);
    } else {
      console.log("Wrong");
      console.log(correctAnswer);
      body.style.backgroundColor = "rgb(211, 54, 54)";
      feedback.textContent = "Wrong!";
      feedback.classList.remove("hidden");
    }
  }
}

function newQuestion() {
  seconds = 15;
  playing = true;
  generateQuestion();
  feedback.textContent = "";
  answer.value = "";
  submitBtn.classList.remove("hidden");
  correctAnswer = eval(generateQuestion());
  initiateCountdown();
}

submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", newQuestion);
