const toggleButton = document.getElementById("toggleButton");

function updateButtonText(enabled) {
  toggleButton.textContent = enabled ? "Disable Auto Pause" : "Enable Auto Pause";
}

chrome.storage.local.get("autopauseEnabled", ({ autopauseEnabled }) => {
  const enabled = autopauseEnabled !== undefined ? autopauseEnabled : true;
  updateButtonText(enabled);
});

toggleButton.addEventListener("click", () => {
  chrome.storage.local.get("autopauseEnabled", ({ autopauseEnabled }) => {
    const newStatus = !autopauseEnabled;
    chrome.storage.local.set({ autopauseEnabled: newStatus }, () => {
      updateButtonText(newStatus);
      chrome.runtime.sendMessage({ type: "toggleAutoPause", enable: newStatus });
    });
  });
});