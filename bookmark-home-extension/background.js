// Background script for Bookmark Home extension

// Listen for installation or update
chrome.runtime.onInstalled.addListener(() => {
  console.log('Bookmark Home extension installed or updated');
  
  // Initialize any storage settings if needed
  chrome.storage.sync.get(['settings'], (result) => {
    if (!result.settings) {
      // Set default settings
      chrome.storage.sync.set({
        settings: {
          displayMode: 'grid', // grid or list
          iconSize: 'medium', // small, medium, large
          showFavicons: true,
          animationsEnabled: true
        }
      });
    }
  });
});

// Function to get all bookmarks
function getAllBookmarks() {
  return new Promise((resolve) => {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      resolve(bookmarkTreeNodes);
    });
  });
}

// Listen for messages from the newtab page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getBookmarks') {
    getAllBookmarks().then(bookmarks => {
      sendResponse({ bookmarks: bookmarks });
    });
    return true; // Required for async sendResponse
  }
  
  if (request.action === 'getSettings') {
    chrome.storage.sync.get(['settings'], (result) => {
      sendResponse({ settings: result.settings });
    });
    return true; // Required for async sendResponse
  }
  
  if (request.action === 'updateSettings') {
    chrome.storage.sync.set({ settings: request.settings }, () => {
      sendResponse({ success: true });
    });
    return true; // Required for async sendResponse
  }
});
