chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // for content.js
  if (message.content) {
    contentData = message.content;
    sendResponse({ status: "success" });
  }
  // for popup.js
  else if (message.getContent) {
    console.log("Content received in background script:", contentData);
    sendResponse({ content: contentData });
  }
  return true; // Keep the messaging channel open for sendResponse
});
