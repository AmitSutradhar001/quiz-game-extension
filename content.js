// console.log("goooooooooooooooooo!");

// let h1 = document.getElementsByTagName("h1");
// for (h of h1) {
//   h.style["background-color"] = "#FF00FF";
//   console.log(h.innerHTML);
// }
//---------------------------------------------------------------------------------
// console.log("Fetching all text content...");

// let allText = document.body.innerText; // Get all text content from the page
// console.log(allText);
//---------------------------------------------------------------------------------
// Set up a MutationObserver to detect changes in the DOM

// Working Very Good******

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
//-----------------------------------------------------------------------------------

// Not Working******

// console.log("Fetching all text content...");
// let shadowHost = document.querySelector("custom-element"); // Replace with the actual shadow host element
// let shadowRoot = shadowHost.shadowRoot; // Access the shadow DOM
// let shadowText = shadowRoot.innerText; // Get text from the shadow DOM
// console.log(shadowText);
