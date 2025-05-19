function pauseMedia() {
  document.querySelectorAll("video, audio").forEach(media => {
    if (!media.paused) {
      media.pause();
      console.log("Paused media");
    }
  });
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "pauseMedia") {
    pauseMedia();
  }
});