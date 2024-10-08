export async function fetchMcq(chunk) {
  console.log("Chunk loaded: ", chunk);
  try {
    const response = await fetch("http://localhost:3000/getMcq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: chunk }),
    });
    const { questions } = await response.json();
    console.log("Questions generated: ", questions);

    return questions;
  } catch (error) {
    console.error("Error fetching MCQs from server:", error);
  }
}
