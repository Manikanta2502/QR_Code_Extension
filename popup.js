// popup.js

const qr = new QRious({
  element: document.getElementById('qr'),
  size: 180,
  value: ''
});

const urlText = document.getElementById('url');

function updateQr(url) {
  qr.value = url;
  urlText.textContent = url;
}

// Request the current tab URL on popup open
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0]?.url) {
    updateQr(tabs[0].url);
  }
});

// Listen for URL updates from background
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'url-update') {
    updateQr(message.url);
  }
});
document.getElementById('copyBtn').addEventListener('click', () => {
  navigator.clipboard.writeText(qr.value)
    .then(() => alert('URL copied to clipboard!'))
    .catch(() => alert('Failed to copy!'));
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const canvas = document.getElementById('qr');
  const link = document.createElement('a');
  link.download = 'qrcode.png';
  link.href = canvas.toDataURL();
  link.click();
});
