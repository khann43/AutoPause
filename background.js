//Initialize toggle state in storage
chrome.runtime.onInstalled.addListener(()=> {
    chrome.storage.sync.set({autopauseEnabled:true});
});
//Listen for tab activation to pause media
chrome.tabs.onActivated.addListener(
    function(activeInfo){
        chrome.storage.sync.get("autopauseEnbled",function(data){
            if (data.autopauseEnabled){
                chrome.tabs.get(activeInfo.tabId,function(tab) {
                    //Check if the tab and URL exit
                    if (tab && tab.url
                        && (tab.url.includes("youtube.com")
                        || tab.url.includes("spotify.com")
                        ||
                        tab.url.includes("soundcloud.com")
                        || tab.url.includes("vimeo.com"))) {
                            chrome.scripting.executeScript({
                                target:{ tabId: activeInfo.tabId},
                                function:pauseMedia
                            });
                        }
                });
            }
        });
    });
    //Pause media function
    function pauseMedia(){
        const videos=
        document.querySelectorAll("video");
        const audios=
        document.querySelectorAll("audio");

        videos.forEach(video=>video.pause());
        audios.forEach(audio=>audio.pause());
    }
    //Toggle AutoPause On/Off
    chrome.runtime.onMessage.addListener
    ((message,sender,sendResponse)=>
    {
        if(message.toggleAutopause !== undefined){
            chrome.storage.sync.set({autopauseEnabled: message.toggleAutopause });
            sendResponse({success:true});
        }
    });