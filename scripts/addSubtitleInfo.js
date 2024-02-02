chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith("https://www.youtube.com")) {
    await chrome.scripting
    .executeScript({
      target : {tabId : tab.id},
      files : [ "scripts/script.js" ],
    });
  }
});