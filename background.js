// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.content) {
    contentData = message.content;
    // console.log("Content received in background script:", contentData);
    sendResponse({ status: "success" });
  } else if (message.getContent) {
    sendResponse({ content: contentData });
  }
});
