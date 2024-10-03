// content.js

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList") {
      let updatedText = document.body.innerText; // Get updated text content

      // Send the updated text to the background script
      chrome.runtime.sendMessage({ content: updatedText }, (response) => {
        console.log("Data sent to background script:", response);
      });
    }
  });
});

// Start observing changes to the entire body
observer.observe(document.body, { childList: true, subtree: true });
