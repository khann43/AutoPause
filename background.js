let autopauseEnabled = true;

// Load saved setting from storage
chrome.storage.local.get("autopauseEnabled", ({ autopauseEnabled: saved }) => {
  if (saved !== undefined) autopauseEnabled = saved;
});

// Listen for changes in the toggle setting
chrome.storage.onChanged.addListener((changes) => {
  if (changes.autopauseEnabled) {
    autopauseEnabled = changes.autopauseEnabled.newValue;
  }
});

// Listen for messages from popup or other parts
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "toggleAutoPause") {
    autopauseEnabled = message.enable;
  }
});

// Auto-pause media in other tabs when tab is switched
chrome.tabs.onActivated.addListener(activeInfo => {
  if (autopauseEnabled) {
    chrome.tabs.query({ url: ["http://*/*", "https://*/*"] }, tabs => {
      tabs.forEach(tab => {
        if (tab.id !== activeInfo.tabId) {
          chrome.tabs.sendMessage(tab.id, { type: "pauseMedia" }, () => {
            if (chrome.runtime.lastError) {
              console.warn(`Tab ${tab.id} error: ${chrome.runtime.lastError.message}`);
            }
          });
        }
      });
    });
  }
});
