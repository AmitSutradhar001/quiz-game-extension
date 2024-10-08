import { startGame } from "./src/components/quiz.js";

document.addEventListener("DOMContentLoaded", () => {
  // Request the content data from the background script
  const startGameBtn = document.getElementById("startGame");
  chrome.runtime.sendMessage({ getContent: true }, (response) => {
    if (response && response.content) {
      const setdata = response.content;
      startGameBtn.addEventListener("click", () => {
        startGame(setdata);
      });
    }
  });
});
