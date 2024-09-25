// Quiz data (array of questions, options, and correct answers)
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2, // Paris
  },
  {
    question: "Which is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: 2, // Jupiter
  },
  {
    question: "What is the square root of 16?",
    options: ["2", "4", "8", "16"],
    correct: 1, // 4
  },
];

let currentQuestion = 0; // Track the current question
let score = 0; // Track user score

// Get HTML elements
const startGameBtn = document.getElementById("startGame");
const quizContainer = document.getElementById("quizContainer");
const questionEl = document.getElementById("question");
const optionButtons = Array.from(document.getElementsByClassName("optionBtn"));

// Start the game
startGameBtn.addEventListener("click", startGame);

function startGame() {
  startGameBtn.style.display = "none"; // Hide the start button
  quizContainer.style.display = "block"; // Show the quiz container
  loadQuestion(); // Load the first question
}

function loadQuestion() {
  const currentQuiz = quizData[currentQuestion];

  // Display the question
  questionEl.innerText = currentQuiz.question;

  // Display the options
  optionButtons.forEach((button, index) => {
    button.innerText = currentQuiz.options[index];
    button.onclick = () => checkAnswer(index);
  });
}

function checkAnswer(selectedOption) {
  const correctOption = quizData[currentQuestion].correct;

  if (selectedOption === correctOption) {
    alert("Correct!");
    score++;
  } else {
    alert("Wrong answer!");
  }

  // Move to the next question or finish the quiz
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion(); // Load the next question
  } else {
    finishQuiz(); // End the quiz
  }
}

function finishQuiz() {
  alert(`Quiz over! Your score is ${score}/${quizData.length}.`);
  quizContainer.style.display = "none"; // Hide the quiz container
  startGameBtn.style.display = "block"; // Show the start button again for a new game
  currentQuestion = 0; // Reset for the next game
  score = 0; // Reset score
}
