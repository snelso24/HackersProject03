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
    // Check if the tab id is valid
    if (tab && tab.id !== -1) {
        chrome.storage.session.set({ lastTextSummarized: data.selectionText });
        chrome.sidePanel.open({ tabId: tab.id });
    } else {
        // Fallback: Query for the active tab if tab.id is invalid
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
