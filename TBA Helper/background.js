// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Check if the content script is requesting the current URL
  if (request.action === "getCurrentUrl") {
    // Get the current URL using the chrome.tabs API
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      // Send the current URL back to the content script
      var currentUrl = tabs[0].url;
      sendResponse({ url: currentUrl });
    });
    // Return true to indicate that we will asynchronously send a response
    return true;
  }
});
