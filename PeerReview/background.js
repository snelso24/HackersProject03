
function contextMenu(){
    chrome.contextMenus.create({
        id: 'summarize-text',
        title: 'Summarize',
        contexts: ['selection']
    });
}

chrome.runtime.onInstalled.addListener(() => {
    contextMenu();
});

chrome.contextMenus.onClicked.addListener((data, tab) => {
    chrome.storage.session.set({ lastTextSummarized: data.selectionText });
    chrome.sidePanel.open({ tabId:tab.id });
});
