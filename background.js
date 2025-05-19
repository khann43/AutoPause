let autopauseEnabled = true;

chrome.storage.local.get("autopauseEnabled", ({ autopauseEnabled: saved }) => {
  if (saved !== undefined) autopauseEnabled = saved;
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.autopauseEnabled) {
    autopauseEnabled = changes.autopauseEnabled.newValue;
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "toggleAutoPause") {
    autopauseEnabled = message.enable;
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  if (autopauseEnabled) {
    chrome.tabs.query({}, tabs => {
      tabs.forEach(tab => {
        if (tab.id !== activeInfo.tabId) {
          chrome.tabs.sendMessage(tab.id, { type: "pauseMedia" });
        }
      });
    });
  }
});