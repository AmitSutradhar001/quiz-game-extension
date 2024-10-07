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

async function getData(sendData) {
  try {
    fetch("http://localhost:3000/siteData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sendData }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("sideData", JSON.stringify(data));
      });
  } catch (error) {
    console.error("Error during API call:", error);
  }
}

let setdata;

// Load the data from the background.js
document.addEventListener("DOMContentLoaded", () => {
  // Request the content data from the background script

  chrome.runtime.sendMessage({ getContent: true }, (response) => {
    if (response && response.content) {
      // Use the content data in your popup
      console.log(response.content);
      setdata = response.content;
      const newData = getData(setdata);
      console.log(newData);
    }
  });
});

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
