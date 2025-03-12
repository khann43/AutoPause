const toggleButton=document.getElementById("toggleButton");
//Load toggle state and update button text
chrome.storage.sync.get("autopauseEnabled",function(data){
    toggleButton.textContent=data.autopauseEnabled ? "Turn OFF AutoPause":"Turn ON AutoPause";
});
//Toggle the AutoPause setting
toggleButton.addEventListener("click",()=> {
    chrome.storage.sync.get("autopauseEnabled",function(data){
        const newState = ! data.autopauseEnabled;
        chrome.runtime.sendMessage({toggleAutopause: newState }, (response)=>
        {
            if (response && response. success){
                toggleButton.textContent= newState ? "Turn OFF AutoPause":"Turn ON AutoPause";
                chrome.storage.sync.set({autopauseEnabled:newState});
            }
        });
     });
});