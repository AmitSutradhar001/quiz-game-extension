import { getMcq, newMcq } from "../utils/mcqManager.js";
import { correctOption } from "../utils/loadMcqs.js";

export let finalScore = 0; // Track score

const startGameBtn = document.getElementById("startGame");
const quizContainer = document.getElementById("quizContainer");
const resultMessage = document.getElementById("resultMessage");
const optionButtons = document.getElementsByClassName("optionBtn");

export function startGame(ytUrl) {
  startGameBtn.style.display = "none"; // Hide start button
  getMcq(ytUrl); // Fetch questions
}

// Check Answer
function checkAnswer(selectedOption) {
  if (selectedOption === correctOption) {
    highlightOption(selectedOption, "correctOptionBtn");
    disableOption();
    finalScore++;
  } else {
    highlightOption(selectedOption, "incorrectOptionBtn");
    highlightOption(correctOption, "correctOptionBtn");
    disableOption();
  }
  setTimeout(newMcq, 1500);
}

function disableOption() {
  Array.from(optionButtons).forEach((button, index) => {
    optionButtons[index].classList.add("disableOptionBtn");
    setTimeout(() => {
      optionButtons[index].classList.remove("disableOptionBtn");
    }, 1500);
  });
}

function highlightOption(option, className) {
  optionButtons[option].classList.add(className);
  setTimeout(() => {
    optionButtons[option].classList.remove(className);
  }, 1500);
}

// Add event listeners on all options
Array.from(optionButtons).forEach((button) => {
  button.addEventListener("click", () => {
    const userOption = parseInt(button.value, 10); // Button value and base number
    checkAnswer(userOption);
  });
});

export function finishQuiz() {
  resultMessage.innerText = `🌟 Awesome! You scored ${finalScore} correct answers.\nYour knowledge shines bright! \nKeep it up! 🎉`;
  setTimeout(resetGame, 3500);
}

export function resetGame() {
  // quizContainer.style.display = "none";
  startGameBtn.style.display = "block";
  resultMessage.innerText = ``;
  finalScore = 0;
}
