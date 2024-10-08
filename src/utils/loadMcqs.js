export let correctOption = null;

export async function loadMCQs(questions, index) {
  const questionVal = document.getElementById("question");
  const option1 = document.getElementById("option1");
  const option2 = document.getElementById("option2");
  const option3 = document.getElementById("option3");
  const option4 = document.getElementById("option4");

  const currentQuestion = questions[index];
  questionVal.innerText = currentQuestion.question;

  option1.innerText = currentQuestion.options[0];
  option2.innerText = currentQuestion.options[1];
  option3.innerText = currentQuestion.options[2];
  option4.innerText = currentQuestion.options[3];

  const normalizedAnswer = currentQuestion?.answer.trim().toLowerCase();

  // Store the correct answer for checking
  correctOption = currentQuestion.options.findIndex(
    (option) => option.trim().toLowerCase() === normalizedAnswer
  );

  if (correctOption === -1) {
    console.error("Correct option not found in the options array.");
  }
}
