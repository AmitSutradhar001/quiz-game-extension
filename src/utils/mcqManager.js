import { fetchSiteData } from "../services/fetchSiteData.js";
import { fetchMcq } from "../services/fetchMcq.js";
import { loadMCQs } from "./loadMcqs.js";
import { finishQuiz, resetGame } from "../components/quiz.js";

const loadMoreBtn = document.getElementById("loadMcq");
const loader = document.getElementById("loader");
const loader2 = document.getElementById("loader2");

const quizState = {
  currentMcqIndex: 0,
  currentChunkIndex: 0,
  mcqs: [],
  chunks: [],
};

export async function getMcq(url) {
  try {
    await fetchSiteData(url);
    quizState.chunks = getStoredChunks();
    if (quizState.chunks) {
      loading(true);
      quizState.mcqs = await fetchMcq(
        quizState.chunks[quizState.currentChunkIndex].query
      );
      loading(false);
      newMcq();
    }
  } catch (error) {
    console.error("Error fetching MCQs:", error);
    loading(false);
    quizContainer.style.display = "none";
    resultMessage.style.color = "#ef474d";
    resultMessage.innerText = `🤔 Oops! Please try again.`;
    setTimeout(resetGame, 2000);
  }
}

export function loading(isLoading) {
  quizContainer.style.display = isLoading ? "none" : "block";
  loader.style.display = loader2.style.display = isLoading ? "block" : "none";
}

function getStoredChunks() {
  const transcript = localStorage.getItem("siteData");
  return transcript ? JSON.parse(transcript).chunks : null;
}

export function newMcq() {
  if (quizState.currentMcqIndex < quizState.mcqs.length) {
    loadMCQs(quizState.mcqs, quizState.currentMcqIndex++);
  } else {
    handleLoadMore();
  }
}

function handleLoadMore() {
  if (quizState.currentChunkIndex < quizState.chunks.length - 1) {
    quizContainer.style.display = "none";
    loadMoreBtn.style.display = "block";
    loadMoreBtn.addEventListener("click", loadMoreMcqs);
  } else {
    quizContainer.style.display = "none";
    loadMoreBtn.style.display = "none";
    quizState.chunks = [];
    quizState.mcqs = [];
    quizState.currentChunkIndex = 0;
    setTimeout(finishQuiz, 500);
  }
}

async function loadMoreMcqs() {
  loadMoreBtn.style.display = "none";
  loadMoreBtn.removeEventListener("click", loadMoreMcqs);
  quizState.currentMcqIndex = 0;
  quizState.currentChunkIndex++;
  loading(true);
  quizState.mcqs = await fetchMcq(
    quizState.chunks[quizState.currentChunkIndex].query
  );
  loading(false);
  newMcq();
}
