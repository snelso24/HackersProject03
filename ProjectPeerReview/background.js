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
    // Check if tab id is valid
    if (tab && tab.id !== -1) {
        chrome.storage.session.set({ lastTextSummarized: data.selectionText });
        chrome.sidePanel.open({ tabId: tab.id });
    } else {
        // Look for valid tab if not found
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs[0]) {
                const activeTabId = tabs[0].id;
                chrome.storage.session.set({ lastTextSummarized: data.selectionText });
                chrome.sidePanel.open({ tabId: activeTabId });
            } else {
                console.error("No valid tab found!");
            }
        });
    }
});
