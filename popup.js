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
const resultMessage = document.getElementById("resultMessage"); // Added for displaying score

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

  resultMessage.innerText = ""; // Clear the result message when loading a new question
}

function checkAnswer(selectedOption) {
  const correctOption = quizData[currentQuestion].correct;

  if (selectedOption === correctOption) {
    resultMessage.style.color = "green";
    resultMessage.innerText = "Correct!"; // Show correct message
    score++;
  } else {
    resultMessage.style.color = "red";
    resultMessage.innerText = "Wrong answer!"; // Show wrong message
  }

  // Move to the next question or finish the quiz
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    setTimeout(loadQuestion, 1000); // Load the next question after 1 second
  } else {
    setTimeout(finishQuiz, 1000); // End the quiz after 1 second
  }
}

function finishQuiz() {
  resultMessage.style.color = "blue";
  resultMessage.innerText = `Quiz over! Your score is ${score}/${quizData.length}.`;

  setTimeout(() => {
    quizContainer.style.display = "none"; // Hide the quiz container after 3 seconds
    startGameBtn.style.display = "block"; // Show the start button again for a new game
    currentQuestion = 0; // Reset for the next game
    score = 0; // Reset score
  }, 3000); // 3-second delay before hiding the quiz container
}
