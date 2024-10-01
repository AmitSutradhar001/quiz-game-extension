console.log("Fetching all text content...");
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      console.log("DOM has been updated!");
      let updatedText = document.body.innerText; // Get updated text content
      console.log(updatedText); // Log the updated text content
    }
  });
});

// Start observing changes to the entire body
observer.observe(document.body, { childList: true, subtree: true });
