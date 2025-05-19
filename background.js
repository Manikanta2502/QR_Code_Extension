// background.js

// Listen for tab activation or URL update, send updated URL to popup if open
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  sendUrlToPopup(tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    sendUrlToPopup(tab.url);
  }
});

function sendUrlToPopup(url) {
  chrome.runtime.sendMessage({ type: 'url-update', url });
}
